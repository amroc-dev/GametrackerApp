
export const popularityFilterCategories = [10, 50, 100, 250, 500, 1000, 2000, 5000, 10000, -1];

export function MakeLabel(popularityFilterIndex) {
    const value = popularityFilterCategories[popularityFilterIndex]
    return value === -1 ? "All" : value < 1000 ? value : value / 1000 + "k";
}
