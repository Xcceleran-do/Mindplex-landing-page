import { getContext } from 'svelte';
import { PUBLIC_ROADMAP_URL } from '$env/static/public'
import type { LayoutServerLoad } from '../$types';

export const load = (async ({ fetch, params }) => {

    // const API_URL = ;
    const roadmap = await fetch(PUBLIC_ROADMAP_URL)
    const roadmapData = await roadmap.json()
  
    const { quarter }:any = params
   
     const roadmaps= roadmapData.roadmaps
    
     const roadmapsWithId = roadmaps.map((item:any, index:any) => ({
        ...item,
        id: index + 1 // Assigning a unique id starting from 1
      }));
      const contentData = roadmapsWithId.filter((item: { slug: string | undefined }) => item.slug && item.slug.includes(quarter));

        
    const filteredId = contentData[0].id;

   
    let navigationData = roadmapsWithId.filter((item: any) => {
        const id = item.id;
    
        let start = (filteredId - 1 + roadmapsWithId.length) % roadmapsWithId.length;
        let end = (filteredId + 2) % roadmapsWithId.length;

     

        if (end < start) {
            return id >= start - end;
        } else if (start < 1) {

            return id >= start + 1 && id <= end + 1;
        } else {
            return id >= start && id <= end;
        }
        


    });
  
  navigationData=  navigationData.map((item: any) => {
    if(item.slug.includes('2023')){
        return {
            ...item,
            background_color: '#83E9FF', 
            color: '#83E9FF'
          };
        } else if(item.slug.includes('2024')){
            return {
                ...item,
                background_color: '#EE83FF', 
                color: '#EE83FF' 
              };
        }else if(item.slug.includes('2025')){
            return {
                ...item,
                background_color: '#5BFFB0', 
                color: '#5BFFB0' 
              };
        }else{
            return {
                ...item,
                background_color: '#5BFFB0', 
                color: '#5BFFB0' 
              };
        }
});
   
    
    const active = contentData[0].slug
     
    return { navigationData, contentData, active };
}) satisfies LayoutServerLoad;