import { useState } from 'react';
import '../styles/Panels.css';
import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import * as api from '../api';

export default function IngredientPanel({
  ingredients,
  recipes,
  onRefresh
}) {
  const [showForm, setShowForm] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleShowForm = () => {
    setEditingIngredient(null);
    setShowForm(true);
  };

  const handleEdit = (ingredient) => {
    setEditingIngredient(ingredient);
    setShowForm(true);
  };

  const handleFormSubmit = async (data) => {
    setLoading(true);
    setError(null);

    try {
      if (editingIngredient) {
        await api.updateIngredient(editingIngredient.id, data);
      } else {
        await api.createIngredient(data);
      }
      setShowForm(false);
      setEditingIngredient(null);
      onRefresh();
    } catch (err) {
      setError(err.message || 'Chyba při ukládání ingredience');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    setError(null);

    try {
      await api.deleteIngredient(id);
      onRefresh();
    } catch (err) {
      setError(err.message || 'Chyba při mazání ingredience');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="panel-ingredients" className="panel" role="tabpanel">
      <div className="panel__header">
        <h2>Ingredience :</h2>
        <button
          type="button"
          className="btn btn--primary"
          id="btn-new-ingredient"
          onClick={handleShowForm}
        >
          + Nová ingredience
        </button>
      </div>

      {error && <div className="error-banner">{error}</div>}

      {showForm ? (
        <div id="ingredient-form-wrap" className="form-card form-card--visible">
          <IngredientForm
            ingredient={editingIngredient}
            onSubmit={handleFormSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingIngredient(null);
            }}
          />
        </div>
      ) : null}

      {!showForm && (
        <IngredientList
          ingredients={ingredients}
          recipes={recipes}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </section>
  );
}
