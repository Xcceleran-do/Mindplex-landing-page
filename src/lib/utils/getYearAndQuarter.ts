export const getCurrentQuarterAndYear = () => {
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    const quarter = Math.floor(month / 3) + 1;
    return { quarter, year };
};