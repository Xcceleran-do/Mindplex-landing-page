---
export const getQuarterData = async (
  quarter: "Q4_2023" | "Q2_2024" | "Q4_2025"
) => {
  try {
    const data = await fetch(`http://localhost:3000/roadmap/${quarter}`);
    const roadmaps = await data.json();
    return roadmaps;
  } catch (error) {
    console.error("Error loading markdown files:", error);
    return [];
  }
  const data = await fetch(`http://localhost:3000/roadmap/${quarter}`);
  const roadmaps = await data.json();
  return roadmaps;
  const globs = {
    Q4_2023: Astro.glob("../content/roadmap/Q4_2023/*.md"),
    Q2_2024: Astro.glob("../content/roadmap/Q2_2024/*.md"),
    Q4_2025: Astro.glob("../content/roadmap/Q4_2025/*.md"),
  };

  try {
    const files = await globs[quarter];
    return files.map((file) => ({
      ...file.frontmatter,
    }));
  } catch (error) {
    console.error("Error loading markdown files:", error);
    return [];
  }
};
---
