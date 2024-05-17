import { getContext } from 'svelte';

import type { LayoutServerLoad } from '../$types';
const url = "/api"
export const load = (async ({ fetch, params }) => {

    const API_URL = url + '/roadmap';
    const roadmap = await fetch(API_URL)
    const roadmapData = await roadmap.json()
    const { quarter } = params

    const filteredData = roadmapData.filter((item: { quarter: string | string[]; }) => item.quarter.includes(quarter));

    const filteredId = filteredData[0].id;


    const navigationData = roadmapData.filter((item: { id: any; }) => {
        const id = item.id;

        let start = (filteredId - 1 + roadmapData.length) % roadmapData.length;
        let end = (filteredId + 2) % roadmapData.length;

        if (end < start) {
            return id >= start - end;
        } else if (start < 1) {

            return id >= start + 1 && id <= end + 1;
        } else {
            return id >= start && id <= end;
        }


    });


    const contentData = roadmapData.filter((item: { quarter: string | string[]; }) => item.quarter.includes(`${quarter}`));
    const active = filteredData[0].quarter
    return { navigationData, contentData, active };
}) satisfies LayoutServerLoad;