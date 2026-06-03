import { useState } from 'react';
import '../styles/Panels.css';
import RecipeForm from './RecipeForm';
import RecipeList from './RecipeList';
import * as api from '../api';

export default function RecipePanel({
  recipes,
  ingredients,
  onRefresh
}) {
  const [showForm, setShowForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleShowForm = () => {
    setEditingRecipe(null);
    setShowForm(true);
  };

  const handleEdit = (recipe) => {
    setEditingRecipe(recipe);
    setShowForm(true);
  };

  const handleFormSubmit = async (data) => {
    setLoading(true);
    setError(null);

    try {
      if (editingRecipe) {
        await api.updateRecipe(editingRecipe.id, data);
      } else {
        await api.createRecipe(data);
      }
      setShowForm(false);
      setEditingRecipe(null);
      onRefresh();
    } catch (err) {
      setError(err.message || 'Chyba při ukládání receptu');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    setError(null);

    try {
      await api.deleteRecipe(id);
      onRefresh();
    } catch (err) {
      setError(err.message || 'Chyba při mazání receptu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="panel-recipes" className="panel panel--active" role="tabpanel">
      <div className="panel__header">
        <h2>Recepty :</h2>
        <button
          type="button"
          className="btn btn--primary"
          id="btn-new-recipe"
          onClick={handleShowForm}
        >
          + Nový recept
        </button>
      </div>

      {error && <div className="error-banner">{error}</div>}

      {showForm ? (
        <div id="recipe-form-wrap" className="form-card form-card--visible">
          <RecipeForm
            recipe={editingRecipe}
            ingredients={ingredients}
            onSubmit={handleFormSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingRecipe(null);
            }}
          />
        </div>
      ) : null}

      {!showForm && (
        <RecipeList
          recipes={recipes}
          ingredients={ingredients}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </section>
  );
}
