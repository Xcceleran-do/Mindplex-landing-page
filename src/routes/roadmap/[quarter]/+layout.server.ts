import { getContext } from 'svelte';
import type { LayoutServerLoad } from './$types';
const url = "http://localhost:8787"
export const load = (async ({ fetch, params }) => {
    // api/roadmap/q9_2024
    const API_URL = url + '/roadmaps';
    const roadmap = await fetch(API_URL)
    const roadmapData = await roadmap.json()
    const { quarter } = params
    // const { roadmapData, currentYear } = await parent()
    // const API_URL = url + '/roadmap/2024';
    // filter q1, q3, q4, q1 
    const filteredData = roadmapData.filter(item => item.quarter.includes(quarter));
    const contentData = roadmapData.filter(item => item.quarter.includes(`Q1_${quarter}`));
    console.log(filteredData)
    return { filteredData, contentData };
}) satisfies LayoutServerLoad;