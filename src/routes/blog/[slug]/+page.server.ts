import { PUBLIC_MINDPLEX_API_URL } from '$env/static/public'
import { error } from '@sveltejs/kit';

export const load = async ({ fetch, params }) => {

    const { slug } = params;

    if (!slug) return { status: 404 };

    const API_URL = `${PUBLIC_MINDPLEX_API_URL}/mp_landing/v1/blogs/${slug}`;

    try {
        const blogs = await fetch(API_URL)
        const blogsData = await blogs.json()
        console.log({ blogsData, }, `${PUBLIC_MINDPLEX_API_URL}/mp_landing/v1/blog/${slug}`);
        if (!blogsData.success) {
            error(404, {
                message: blogsData?.message || "Something went wrong"
            });
        }
        return { blogs: blogsData };
    } catch (err) {

        if (err && typeof err === 'object' && 'status' in err) {
            throw err;
        }

        throw error(500, 'Failed to load blog. Please try again later.');
    }

}