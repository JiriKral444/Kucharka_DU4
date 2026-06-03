import '../styles/Cards.css';
import IngredientCard from './IngredientCard';
import { sortByName } from '../utils/formatting';

export default function IngredientList({ ingredients, recipes, onEdit, onDelete }) {
  const sortedIngredients = sortByName(ingredients);

  if (sortedIngredients.length === 0) {
    return (
      <div className="empty-state" id="ingredients-empty">
        <p>Zatím nemáte žádné ingredience</p>
      </div>
    );
  }

  return (
    <ul className="list" id="ingredients-list">
      {sortedIngredients.map(ingredient => (
        <IngredientCard
          key={ingredient.id}
          ingredient={ingredient}
          recipes={recipes}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
