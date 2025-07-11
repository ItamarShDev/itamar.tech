/**
 * Filters an array of strings based on a search text and exclusion list.
 * @param items - The array of strings to filter
 * @param excludedItems - Array of strings to exclude from results
 * @param searchText - Text to search for in the items
 * @returns Filtered array of strings that match the search text and are not in the excluded items
 */
/**
 * Filters an array of strings based on a search text and exclusion list.
 * @param items - The array of strings to filter
 * @param excludedItems - Array of strings to exclude from results
 * @param searchText - Text to search for in the items
 * @returns Filtered array of strings that match the search text and are not in the excluded items
 */
export function filterItems(
  items: string[],
  excludedItems: string[],
  searchText: string
): string[] {
  // If no search text, return all items not in excludedItems
  if (!searchText.trim()) {
    const excludedSet = new Set(excludedItems.map(item => item.toLowerCase()));
    return items.filter(item => !excludedSet.has(item.toLowerCase()));
  }

  const searchTerm = searchText.toLowerCase();
  const excludedSet = new Set(excludedItems.map(item => item.toLowerCase()));
  
  return items.filter(item => {
    const lowerItem = item.toLowerCase();
    const matchesSearch = lowerItem.includes(searchTerm);
    const isExcluded = excludedSet.has(lowerItem);
    
    return matchesSearch && !isExcluded;
  });
}
