/**
 * Utility functions for managing tags in a tag input component
 */

/**
 * Handles keyboard navigation and selection in a tag input
 * @param e - The keyboard event
 * @param currentIndex - The current selected index
 * @param filteredItems - The filtered list of available items
 * @param onEnter - Callback when Enter is pressed with the selected item
 * @param onEscape - Callback when Escape is pressed
 * @param onBackspace - Callback when Backspace is pressed on empty input
 * @returns The new selected index
 */
export function handleTagInputKeyDown(
  e: React.KeyboardEvent<HTMLInputElement>,
  currentIndex: number,
  filteredItems: string[],
  onEnter: (item: string) => void,
  onEscape: () => void,
  onBackspace: () => void
): number {
  let newIndex = currentIndex;
  
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault();
      newIndex = (currentIndex + 1) % filteredItems.length;
      break;
      
    case 'ArrowUp':
      e.preventDefault();
      newIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
      break;
      
    case 'Enter':
      e.preventDefault();
      const current = filteredItems[currentIndex];
      if (current) {
        onEnter(current);
      }
      break;
      
    case 'Escape':
      e.preventDefault();
      onEscape();
      break;
      
    case 'Backspace':
      if (!(e.target as HTMLInputElement).value) {
        onBackspace();
      }
      break;
  }
  
  return newIndex;
}

/**
 * Removes a specific tag from the tags array
 * @param tags - The current array of tags
 * @param tagToRemove - The tag to remove
 * @returns A new array with the tag removed
 */
export function removeTag(tags: string[], tagToRemove: string): string[] {
  return tags.filter(tag => tag !== tagToRemove);
}

/**
 * Removes the last tag from the tags array
 * @param tags - The current array of tags
 * @returns A new array with the last tag removed
 */
export function removeLastTag(tags: string[]): string[] {
  return tags.slice(0, -1);
}

/**
 * Adds a new tag to the tags array if it doesn't already exist
 * @param tags - The current array of tags
 * @param newTag - The tag to add
 * @returns A new array with the tag added if it didn't exist
 */
export function addTag(tags: string[], newTag: string): string[] {
  const normalizedTags = tags.map(tag => tag.toLowerCase());
  if (normalizedTags.includes(newTag.toLowerCase())) {
    return [...tags];
  }
  return [...tags, newTag];
}
