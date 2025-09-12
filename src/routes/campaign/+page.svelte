<script lang="ts">
	import type { PageData } from './$types';
	import { marked } from 'marked';
	import content from './content.md?raw';
</script>

<div class="mx-auto prose mb-10 prose-invert lg:prose-xl prose-a:text-cyan-700">
	{@html marked(content)}
</div>
