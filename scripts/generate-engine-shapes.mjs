/**
 * Dev-time generator for static/engine-shapes.bin — the particle point clouds
 * EngineCanvas.svelte morphs between (eye, brain, shield, person). Sampled
 * from real meshes so the shapes read; only the ~96KB point file ships.
 *
 * Model source (downloaded at generation time, never committed or shipped):
 * - Head: Lee Perry-Smith head scan (three.js examples), CC BY 3.0,
 *   https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/LeePerrySmith/LeePerrySmith.glb
 *
 * Usage: node scripts/generate-engine-shapes.mjs <head.glb>
 * Output layout: 4 shapes x P points x [x, y, z, brightness] float32.
 */
import fs from 'node:fs';
import path from 'node:path';

const P = 2200;
const [headPath] = process.argv.slice(2);
if (!headPath) {
	console.error('usage: node scripts/generate-engine-shapes.mjs <head.glb>');
	process.exit(1);
}

const rand = (lo, hi) => lo + Math.random() * (hi - lo);
const gauss = () => Math.random() + Math.random() + Math.random() + Math.random() - 2;

/* ---------- minimal GLB triangle extraction (no deps) ---------- */

function matMul(a, b) {
	// column-major 4x4
	const o = new Array(16);
	for (let c = 0; c < 4; c++)
		for (let r = 0; r < 4; r++) {
			let s = 0;
			for (let k = 0; k < 4; k++) s += a[k * 4 + r] * b[c * 4 + k];
			o[c * 4 + r] = s;
		}
	return o;
}

function nodeMatrix(node) {
	if (node.matrix) return node.matrix;
	const [tx, ty, tz] = node.translation ?? [0, 0, 0];
	const [qx, qy, qz, qw] = node.rotation ?? [0, 0, 0, 1];
	const [sx, sy, sz] = node.scale ?? [1, 1, 1];
	const x2 = qx + qx,
		y2 = qy + qy,
		z2 = qz + qz;
	const xx = qx * x2,
		xy = qx * y2,
		xz = qx * z2,
		yy = qy * y2,
		yz = qy * z2,
		zz = qz * z2,
		wx = qw * x2,
		wy = qw * y2,
		wz = qw * z2;
	return [
		(1 - (yy + zz)) * sx,
		(xy + wz) * sx,
		(xz - wy) * sx,
		0,
		(xy - wz) * sy,
		(1 - (xx + zz)) * sy,
		(yz + wx) * sy,
		0,
		(xz + wy) * sz,
		(yz - wx) * sz,
		(1 - (xx + yy)) * sz,
		0,
		tx,
		ty,
		tz,
		1
	];
}

const IDENT = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

function glbTriangles(file) {
	const buf = fs.readFileSync(file);
	if (buf.readUInt32LE(0) !== 0x46546c67) throw new Error(`${file}: not a GLB`);
	const jsonLen = buf.readUInt32LE(12);
	const json = JSON.parse(buf.subarray(20, 20 + jsonLen).toString('utf8'));
	const binStart = 20 + jsonLen + 8;
	const bin = buf.subarray(binStart);

	const readAccessor = (idx) => {
		const acc = json.accessors[idx];
		const bv = json.bufferViews[acc.bufferView];
		const base = (bv.byteOffset ?? 0) + (acc.byteOffset ?? 0);
		const compSize = { 5121: 1, 5123: 2, 5125: 4, 5126: 4 }[acc.componentType];
		const compCount = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4 }[acc.type];
		const stride = bv.byteStride ?? compSize * compCount;
		const out =
			acc.componentType === 5126
				? new Float32Array(acc.count * compCount)
				: new Uint32Array(acc.count * compCount);
		for (let i = 0; i < acc.count; i++) {
			for (let c = 0; c < compCount; c++) {
				const abs = base + i * stride + c * compSize;
				out[i * compCount + c] =
					acc.componentType === 5126
						? bin.readFloatLE(abs)
						: acc.componentType === 5123
							? bin.readUInt16LE(abs)
							: acc.componentType === 5125
								? bin.readUInt32LE(abs)
								: bin.readUInt8(abs);
			}
		}
		return out;
	};

	const tris = [];
	const walk = (nodeIdx, parent) => {
		const node = json.nodes[nodeIdx];
		const m = matMul(parent, nodeMatrix(node));
		if (node.mesh !== undefined) {
			for (const prim of json.meshes[node.mesh].primitives) {
				if ((prim.mode ?? 4) !== 4) continue;
				if (prim.extensions?.KHR_draco_mesh_compression)
					throw new Error(`${file}: Draco-compressed, unsupported`);
				const posRaw = readAccessor(prim.attributes.POSITION);
				const pos = new Float32Array(posRaw.length);
				for (let i = 0; i < posRaw.length; i += 3) {
					const x = posRaw[i],
						y = posRaw[i + 1],
						z = posRaw[i + 2];
					pos[i] = m[0] * x + m[4] * y + m[8] * z + m[12];
					pos[i + 1] = m[1] * x + m[5] * y + m[9] * z + m[13];
					pos[i + 2] = m[2] * x + m[6] * y + m[10] * z + m[14];
				}
				const idx = prim.indices !== undefined ? readAccessor(prim.indices) : null;
				const triCount = (idx ? idx.length : pos.length / 3) / 3;
				for (let t = 0; t < triCount; t++) {
					const tri = new Float32Array(9);
					for (let v = 0; v < 3; v++) {
						const vi = idx ? idx[t * 3 + v] : t * 3 + v;
						tri[v * 3] = pos[vi * 3];
						tri[v * 3 + 1] = pos[vi * 3 + 1];
						tri[v * 3 + 2] = pos[vi * 3 + 2];
					}
					tris.push(tri);
				}
			}
		}
		for (const c of node.children ?? []) walk(c, m);
	};
	for (const n of json.scenes[json.scene ?? 0].nodes) walk(n, IDENT);
	return tris;
}

/* ---------- area-weighted surface sampling ---------- */

function samplePoints(tris, n) {
	const cum = new Float64Array(tris.length);
	let total = 0;
	for (let i = 0; i < tris.length; i++) {
		const t = tris[i];
		const ux = t[3] - t[0],
			uy = t[4] - t[1],
			uz = t[5] - t[2];
		const vx = t[6] - t[0],
			vy = t[7] - t[1],
			vz = t[8] - t[2];
		const cx = uy * vz - uz * vy,
			cy = uz * vx - ux * vz,
			cz = ux * vy - uy * vx;
		total += Math.hypot(cx, cy, cz) / 2;
		cum[i] = total;
	}
	const pos = new Float32Array(n * 3);
	const nrm = new Float32Array(n * 3);
	for (let i = 0; i < n; i++) {
		const r = Math.random() * total;
		let lo = 0,
			hi = tris.length - 1;
		while (lo < hi) {
			const mid = (lo + hi) >> 1;
			if (cum[mid] < r) lo = mid + 1;
			else hi = mid;
		}
		const t = tris[lo];
		let a = Math.random(),
			b = Math.random();
		if (a + b > 1) {
			a = 1 - a;
			b = 1 - b;
		}
		for (let c = 0; c < 3; c++)
			pos[i * 3 + c] = t[c] + a * (t[3 + c] - t[c]) + b * (t[6 + c] - t[c]);
		const ux = t[3] - t[0],
			uy = t[4] - t[1],
			uz = t[5] - t[2];
		const vx = t[6] - t[0],
			vy = t[7] - t[1],
			vz = t[8] - t[2];
		let cx = uy * vz - uz * vy,
			cy = uz * vx - ux * vz,
			cz = ux * vy - uy * vx;
		const l = Math.hypot(cx, cy, cz) || 1;
		nrm[i * 3] = cx / l;
		nrm[i * 3 + 1] = cy / l;
		nrm[i * 3 + 2] = cz / l;
	}
	return { pos, nrm };
}

/* rotate about Y then X (radians), in place */
function rotate(pos, nrm, ry, rx) {
	const cy = Math.cos(ry),
		sy = Math.sin(ry),
		cx = Math.cos(rx),
		sx = Math.sin(rx);
	const apply = (arr) => {
		for (let i = 0; i < arr.length; i += 3) {
			let x = arr[i],
				y = arr[i + 1],
				z = arr[i + 2];
			let x2 = cy * x + sy * z,
				z2 = -sy * x + cy * z;
			let y2 = cx * y - sx * z2,
				z3 = sx * y + cx * z2;
			arr[i] = x2;
			arr[i + 1] = y2;
			arr[i + 2] = z3;
		}
	};
	apply(pos);
	if (nrm) apply(nrm);
}

/* center on bbox midpoint, scale so Y extent = targetH */
function normalize(pos, targetH) {
	const min = [Infinity, Infinity, Infinity],
		max = [-Infinity, -Infinity, -Infinity];
	for (let i = 0; i < pos.length; i += 3)
		for (let c = 0; c < 3; c++) {
			min[c] = Math.min(min[c], pos[i + c]);
			max[c] = Math.max(max[c], pos[i + c]);
		}
	const s = targetH / (max[1] - min[1] || 1);
	for (let i = 0; i < pos.length; i += 3)
		for (let c = 0; c < 3; c++) pos[i + c] = (pos[i + c] - (min[c] + max[c]) / 2) * s;
	return {
		extent: [max[0] - min[0], max[1] - min[1], max[2] - min[2]].map((v) => +v.toFixed(1))
	};
}

/* crowding-based occlusion: valley points (sulci, fissure) get dimmed */
function occlusion(pos, r) {
	const n = pos.length / 3;
	const r2 = r * r;
	const cnt = new Float32Array(n);
	for (let i = 0; i < n; i++) {
		for (let j = i + 1; j < n; j++) {
			const dx = pos[i * 3] - pos[j * 3];
			const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
			const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
			if (dx * dx + dy * dy + dz * dz < r2) {
				cnt[i]++;
				cnt[j]++;
			}
		}
	}
	const sorted = [...cnt].sort((a, b) => a - b);
	const med = sorted[n >> 1] || 1;
	const out = new Float32Array(n);
	for (let i = 0; i < n; i++) out[i] = Math.min(1, Math.max(0, (cnt[i] - med) / (med * 1.5)));
	return out;
}

/* headlight shading baked per point */
function shade(nrm, i, contrast = 1) {
	const L = [0.26, 0.36, 0.9];
	const d = nrm[i * 3] * L[0] + nrm[i * 3 + 1] * L[1] + nrm[i * 3 + 2] * L[2];
	return 0.24 + 0.76 * Math.max(0.05, d) ** contrast + rand(-0.05, 0.05);
}

/* ---------- the four shapes ---------- */

const out = new Float32Array(4 * P * 4);
const put = (s, i, x, y, z, b) => {
	const o = (s * P + i) * 4;
	out[o] = x;
	out[o + 1] = y;
	out[o + 2] = z;
	out[o + 3] = Math.min(1, Math.max(0.05, b));
};

/* 0 — Observe: iconic eye. Almond outline, dim sclera, iris ring, hot pupil. */
{
	const lidY = (t) => 0.85 * Math.sin(t) * (1 - 0.45 * Math.cos(t) ** 2);
	for (let i = 0; i < P; i++) {
		const f = i / P;
		const t = rand(0, Math.PI * 2);
		if (f < 0.3) {
			put(
				0,
				i,
				1.55 * Math.cos(t) + rand(-0.03, 0.03),
				lidY(t) + rand(-0.03, 0.03),
				rand(-0.05, 0.05),
				0.75
			);
		} else if (f < 0.45) {
			const sc = rand(0.68, 0.96);
			put(0, i, 1.5 * sc * Math.cos(t), lidY(t) * sc, rand(-0.04, 0.04), 0.28);
		} else if (f < 0.85) {
			const r = rand(0.4, 0.62);
			put(
				0,
				i,
				r * Math.cos(t),
				r * Math.sin(t),
				0.14 * (1 - (r / 0.65) ** 2) + rand(-0.02, 0.02),
				0.65
			);
		} else {
			const r = 0.22 * Math.sqrt(Math.random());
			put(0, i, r * Math.cos(t), r * Math.sin(t), 0.16 + rand(-0.02, 0.02), 1);
		}
	}
}

/* 1 — Remember: brain as icon line-art — scalloped side profile with
   fold curls and a cerebellum tuck. Tested an anatomical mesh (Allen brain);
   at particle resolution it reads as a blob, the drawn glyph reads. */
{
	const qbez = (p0, pc, p1, u) => {
		const a = (1 - u) * (1 - u),
			b = 2 * u * (1 - u),
			c = u * u;
		return [a * p0[0] + b * pc[0] + c * p1[0], a * p0[1] + b * pc[1] + c * p1[1]];
	};
	const folds = [
		[
			[-1.0, 0.05],
			[-0.85, 0.8],
			[-0.15, 0.7]
		],
		[
			[-0.35, -0.45],
			[0.05, -0.05],
			[0.45, 0.5]
		],
		[
			[0.15, 0.8],
			[0.95, 0.7],
			[0.85, 0.05]
		],
		[
			[-0.6, -0.7],
			[0.0, -0.85],
			[0.45, -0.5]
		]
	];
	const R = (t) => {
		// egg profile, scalloped; slightly fuller at the front (t = pi side)
		const base = 1.32 * (1 + 0.1 * Math.cos(t)) * (1 - 0.18 * Math.max(0, -Math.sin(t)));
		return base * (1 + 0.05 * Math.sin(6.5 * t + 1.2));
	};
	for (let i = 0; i < P; i++) {
		const f = i / P;
		if (f < 0.4) {
			// outline, leaving the lower-back open for the cerebellum
			const t = rand(-0.35 * Math.PI, 1.12 * Math.PI);
			const r = R(t);
			put(
				1,
				i,
				r * Math.cos(t) * 1.15 + rand(-0.03, 0.03),
				r * Math.sin(t) * 0.82 + 0.18 + rand(-0.03, 0.03),
				rand(-0.06, 0.06),
				0.8
			);
		} else if (f < 0.68) {
			const fold = folds[Math.floor(rand(0, folds.length))];
			const [x, y] = qbez(fold[0], fold[1], fold[2], Math.random());
			put(
				1,
				i,
				x * 1.15 + rand(-0.035, 0.035),
				y * 0.9 + 0.18 + rand(-0.035, 0.035),
				0.1 + rand(-0.04, 0.04),
				0.7
			);
		} else if (f < 0.86) {
			// dim interior fill with a shallow dome
			const t = rand(0, Math.PI * 2);
			const rr = Math.sqrt(Math.random()) * 0.92;
			const r = R(t) * rr;
			const x = r * Math.cos(t) * 1.15;
			const y = r * Math.sin(t) * 0.82 + 0.18;
			put(1, i, x, y, 0.18 * (1 - rr * rr) + rand(-0.03, 0.03), 0.24);
		} else {
			// cerebellum: striped half-disc tucked at the lower back
			const t = rand(-0.45 * Math.PI, 0.55 * Math.PI);
			const rr = 0.42 * (0.55 + 0.45 * Math.random());
			put(
				1,
				i,
				1.02 + rr * Math.cos(t) + rand(-0.02, 0.02),
				-0.78 + rr * Math.sin(t) * 0.75 + rand(-0.02, 0.02),
				rand(-0.04, 0.04),
				0.65
			);
		}
	}
}

/* 2 — Verify: shield outline + fill, check mark floating in front. */
{
	const width = (v) => 1.08 * (1 - v ** 1.8);
	const segA = [-0.5, 0.0, -0.12, -0.42];
	const segB = [-0.12, -0.42, 0.6, 0.38];
	for (let i = 0; i < P; i++) {
		const f = i / P;
		if (f < 0.12) {
			put(2, i, rand(-1.05, 1.05), 1.05 + rand(-0.03, 0.03), rand(-0.04, 0.04), 0.8);
		} else if (f < 0.42) {
			const v = Math.random();
			const side = Math.random() < 0.5 ? -1 : 1;
			put(
				2,
				i,
				side * width(v) + rand(-0.03, 0.03),
				1.05 - 2.35 * v + rand(-0.03, 0.03),
				rand(-0.04, 0.04),
				0.8
			);
		} else if (f < 0.75) {
			const v = Math.random();
			const w = width(v) * 0.9;
			const x = rand(-w, w);
			put(2, i, x, 1.05 - 2.35 * v, 0.1 * (1 - v) + rand(-0.03, 0.03), 0.26);
		} else {
			const seg = f < 0.83 ? segA : segB;
			const u = Math.random();
			put(
				2,
				i,
				seg[0] + (seg[2] - seg[0]) * u + rand(-0.045, 0.045),
				seg[1] + (seg[3] - seg[1]) * u + rand(-0.045, 0.045),
				0.2 + rand(-0.02, 0.02),
				1
			);
		}
	}
}

/* 3 — Hand off: the Perry-Smith head over particle shoulders. */
{
	const tris = glbTriangles(headPath);
	const HEAD = Math.floor(P * 0.62);
	const { pos, nrm } = samplePoints(tris, HEAD);
	rotate(pos, nrm, -0.18, 0.02);
	const { extent } = normalize(pos, 1.7);
	console.log('head tris', tris.length, 'extent', extent);
	for (let i = 0; i < HEAD; i++)
		put(3, i, pos[i * 3], pos[i * 3 + 1] + 0.62, pos[i * 3 + 2], shade(nrm, i));
	for (let i = HEAD; i < P; i++) {
		// shoulders: upper shell of a wide ellipsoid below the head
		let dx = gauss(),
			dy = gauss(),
			dz = gauss();
		const l = Math.hypot(dx, dy, dz) || 1;
		const nz = dz / l;
		put(
			3,
			i,
			(dx / l) * 1.3,
			Math.abs(dy / l) * 0.75 - 1.0,
			nz * 0.55,
			0.3 + 0.5 * Math.max(0, nz) + rand(-0.05, 0.05)
		);
	}
}

const outPath = path.join(import.meta.dirname, '..', 'static', 'engine-shapes.bin');
fs.writeFileSync(outPath, Buffer.from(out.buffer));
console.log('wrote', outPath, out.byteLength, 'bytes');
