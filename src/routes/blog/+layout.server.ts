import type { LayoutServerLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public'
import type { Blog } from '$lib/types/blog';

export const load = (async ({ fetch }) => {
    const API_URL = PUBLIC_API_URL + '/blogs';
    const blogs = await fetch(API_URL)
    const blogsData = await blogs.json() as Blog
    console.log(blogsData)
    return blogsData;
}) satisfies LayoutServerLoad;