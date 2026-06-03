import { useState, useEffect } from 'react';
import '../styles/Forms.css';
import { validateIngredient } from '../utils/validation';

export default function IngredientForm({
  ingredient,
  onSubmit,
  onCancel
}) {
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (ingredient) {
      setName(ingredient.name);
      setUnit(ingredient.unit);
    } else {
      setName('');
      setUnit('');
    }
  }, [ingredient]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    const validation = validateIngredient(name, unit);

    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    onSubmit({ name, unit });
  };

  return (
    <div className="form-card">
      <h3 id="ingredient-form-title">
        {ingredient ? 'Úprava ingredience' : 'Nová ingredience'}
      </h3>

      {errors.length > 0 && (
        <div className="error-messages">
          {errors.map((err, i) => (
            <p key={i} className="error-text">⚠️ {err}</p>
          ))}
        </div>
      )}

      <form id="ingredient-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="ingredient-name">Název ingredience *</label>
          <input
            id="ingredient-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="např. Sýr"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="ingredient-unit">Jednotka *</label>
          <input
            id="ingredient-unit"
            type="text"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            placeholder="např. g, ml, ks"
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn--primary">
            {ingredient ? 'Uložit změny' : 'Vytvořit ingredienci'}
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
