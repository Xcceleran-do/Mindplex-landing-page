import type { LayoutServerLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public'
export const load = (async ({ fetch, params }) => {

    const { blogid }: any = params;

    const API_URL = PUBLIC_API_URL + `/blogs/${blogid}`;
    const blogs = await fetch(API_URL)
    const blogsData = await blogs.json()
    return { blogs: blogsData };
}) satisfies LayoutServerLoad;