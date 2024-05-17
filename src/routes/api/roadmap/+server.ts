import type { RequestHandler } from './$types';
import { roadmapData } from '../../../lib/content/roadmapData'

export const GET: RequestHandler = async (c) => {
    return new Response(JSON.stringify(roadmapData), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};