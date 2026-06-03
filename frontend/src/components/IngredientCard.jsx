import '../styles/Cards.css';
import { escapeHtml, getRecipesUsingIngredient } from '../utils/formatting';

export default function IngredientCard({ ingredient, recipes, onEdit, onDelete }) {
  const usingRecipes = getRecipesUsingIngredient(ingredient.id, recipes);

  return (
    <li className="card card--ingredient">
      <div className="card__header">
        <h3 className="card__title">{escapeHtml(ingredient.name)}</h3>
        <div className="card__actions">
          <button
            className="btn btn--secondary btn--sm"
            onClick={() => onEdit(ingredient)}
          >
            Upravit
          </button>
          <button
            className="btn btn--danger btn--sm"
            onClick={() => {
              if (confirm(`Chceš smazat ingredienci "${ingredient.name}"?`)) {
                onDelete(ingredient.id);
              }
            }}
          >
            Smazat
          </button>
        </div>
      </div>

      <div className="card__section">
        <strong>Jednotka:</strong> {escapeHtml(ingredient.unit)}
      </div>

      {usingRecipes.length > 0 && (
        <div className="card__section">
          <strong>Použita v receptech:</strong>
          <ul className="card__list">
            {usingRecipes.map(recipe => (
              <li key={recipe.id}>{escapeHtml(recipe.name)}</li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}
