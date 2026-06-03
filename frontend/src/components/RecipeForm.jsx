import { useState, useEffect } from 'react';
import '../styles/Forms.css';
import { validateRecipe, validateAmount } from '../utils/validation';

export default function RecipeForm({
  recipe,
  ingredients,
  onSubmit,
  onCancel
}) {
  const [name, setName] = useState('');
  const [steps, setSteps] = useState('');
  const [items, setItems] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (recipe) {
      setName(recipe.name);
      setSteps(recipe.steps || '');
      setItems(recipe.items || []);
    } else {
      setName('');
      setSteps('');
      setItems([]);
    }
  }, [recipe]);

  const handleAddIngredient = () => {
    setItems([...items, { ingredientId: '', amount: '' }]);
  };

  const handleRemoveIngredient = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    // Prepare items for validation
    const itemsToValidate = items.map(item => ({
      ingredientId: item.ingredientId,
      amount: item.amount
    }));

    const validation = validateRecipe(name, steps, itemsToValidate);

    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    // Validate amounts
    const invalidAmounts = items.filter(item => !validateAmount(item.amount));
    if (invalidAmounts.length > 0) {
      setErrors(['Všechna množství musí být kladná čísla']);
      return;
    }

    onSubmit({
      name,
      steps,
      items: itemsToValidate
    });
  };

  return (
    <div className="form-card">
      <h3 id="recipe-form-title">
        {recipe ? 'Úprava receptu' : 'Nový recept'}
      </h3>

      {errors.length > 0 && (
        <div className="error-messages">
          {errors.map((err, i) => (
            <p key={i} className="error-text">⚠️ {err}</p>
          ))}
        </div>
      )}

      <form id="recipe-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="recipe-name">Název receptu *</label>
          <input
            id="recipe-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="např. Špagety Carbonara"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="recipe-steps">Postup</label>
          <textarea
            id="recipe-steps"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            placeholder="Popis přípravy..."
            rows="4"
          />
        </div>

        <div className="form-group">
          <label>Ingredience *</label>
          <div id="recipe-ingredients-list" className="ingredients-list">
            {items.map((item, index) => (
              <div key={index} className="ingredient-row">
                <select
                  value={item.ingredientId}
                  onChange={(e) => handleItemChange(index, 'ingredientId', e.target.value)}
                  required
                >
                  <option value="">-- Vyber ingredienci --</option>
                  {ingredients.map(ing => (
                    <option key={ing.id} value={ing.id}>
                      {ing.name} ({ing.unit})
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  step="0.01"
                  value={item.amount}
                  onChange={(e) => handleItemChange(index, 'amount', e.target.value)}
                  placeholder="Množství"
                  required
                />
                <button
                  type="button"
                  className="btn btn--danger btn--sm"
                  onClick={() => handleRemoveIngredient(index)}
                >
                  Odstranit
                </button>
              </div>
            ))}
          </div>
          <button
            id="btn-add-recipe-ingredient"
            type="button"
            className="btn btn--secondary"
            onClick={handleAddIngredient}
          >
            + Přidat ingredienci
          </button>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn--primary">
            {recipe ? 'Uložit změny' : 'Vytvořit recept'}
          </button>
          <button
            type="button"
            className="btn btn--secondary"
            onClick={onCancel}
          >
            Zrušit
          </button>
        </div>
      </form>
    </div>
  );
}
