import type { LayoutServerLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public'
import { error } from '@sveltejs/kit';

export const load = (async ({ fetch, params }) => {

    const { blogId } = params;

    if (!blogId) return { status: 404 };
    const API_URL = `${PUBLIC_API_URL}/blogs/${blogId}`;
    try {
        const blogs = await fetch(API_URL)
        const blogsData = await blogs.json()
        if (!blogsData.success) {
            error(404, {
                message: blogsData?.message || "Something went wrong"
            });
        }
        return { blogs: blogsData };
    } catch (error) {
        // @ts-ignore
        error(404, {
            message: 'Not found'
        });
    }

}) satisfies LayoutServerLoad;