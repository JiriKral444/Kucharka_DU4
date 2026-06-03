import '../styles/Cards.css';
import { escapeHtml, formatRecipeItems } from '../utils/formatting';

export default function RecipeCard({ recipe, ingredients, onEdit, onDelete }) {
  const formattedItems = formatRecipeItems(recipe.items, ingredients);

  return (
    <li className="card card--recipe">
      <div className="card__header">
        <h3 className="card__title">{escapeHtml(recipe.name)}</h3>
        <div className="card__actions">
          <button
            className="btn btn--secondary btn--sm"
            onClick={() => onEdit(recipe)}
          >
            Upravit
          </button>
          <button
            className="btn btn--danger btn--sm"
            onClick={() => {
              if (confirm(`Chceš smazat recept "${recipe.name}"?`)) {
                onDelete(recipe.id);
              }
            }}
          >
            Smazat
          </button>
        </div>
      </div>

      {formattedItems.length > 0 && (
        <div className="card__section">
          <strong>Ingredience ({formattedItems.length}):</strong>
          <ul className="card__list">
            {formattedItems.map(item => (
              <li key={item.ingredientId}>
                {escapeHtml(item.ingredientName)} - {escapeHtml(item.amount)} {escapeHtml(item.ingredientUnit)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {recipe.steps && (
        <div className="card__section">
          <strong>Postup:</strong>
          <p>{escapeHtml(recipe.steps)}</p>
        </div>
      )}
    </li>
  );
}
