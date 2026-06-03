/**
 * Validation utilities
 */

export function validateIngredient(name, unit) {
  const errors = [];

  if (!name || name.trim() === '') {
    errors.push('Název ingredience je povinný');
  }

  if (!unit || unit.trim() === '') {
    errors.push('Jednotka je povinná');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export function validateRecipe(name, steps, items) {
  const errors = [];

  if (!name || name.trim() === '') {
    errors.push('Název receptu je povinný');
  }

  if (!items || items.length === 0) {
    errors.push('Recept musí obsahovat alespoň jednu ingredienci');
  }

  // Check for duplicate ingredients
  if (items && items.length > 0) {
    const ingredientIds = items.map(item => item.ingredientId);
    const uniqueIds = new Set(ingredientIds);

    if (ingredientIds.length !== uniqueIds.size) {
      errors.push('Stejná ingredience nemůže být v receptu dvakrát');
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export function validateAmount(amount) {
  const num = parseFloat(amount);
  return !isNaN(num) && num > 0;
}
