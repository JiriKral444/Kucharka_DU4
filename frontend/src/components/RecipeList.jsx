import '../styles/Cards.css';
import RecipeCard from './RecipeCard';
import { sortByName } from '../utils/formatting';

export default function RecipeList({ recipes, ingredients, onEdit, onDelete }) {
  const sortedRecipes = sortByName(recipes);

  if (sortedRecipes.length === 0) {
    return (
      <div className="empty-state" id="recipes-empty">
        <p>Zatím nemáte žádné recepty</p>
      </div>
    );
  }

  return (
    <ul className="list" id="recipes-list">
      {sortedRecipes.map(recipe => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          ingredients={ingredients}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
