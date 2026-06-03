/**
 * Formatting and helper utilities
 */

export function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

export function formatRecipeItems(items, ingredients) {
  if (!items || items.length === 0) return [];

  return items.map(item => {
    const ingredient = ingredients.find(ing => ing.id === item.ingredientId);
    return {
      ...item,
      ingredientName: ingredient?.name || 'Neznámá ingredience',
      ingredientUnit: ingredient?.unit || ''
    };
  });
}

export function getRecipesUsingIngredient(ingredientId, recipes) {
  return recipes.filter(recipe =>
    recipe.items?.some(item => item.ingredientId === ingredientId)
  );
}

export function sortByName(arr, keyFn = item => item.name) {
  return [...arr].sort((a, b) => keyFn(a).localeCompare(keyFn(b), 'cs'));
}
