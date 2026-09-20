import { useState, useEffect } from 'react';
import './App.css';
import Tabs from './components/Tabs';
import RecipePanel from './components/RecipePanel';
import IngredientPanel from './components/IngredientPanel';
import * as api from './api';

function App() {
  const [currentTab, setCurrentTab] = useState('recipes');
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [appError, setAppError] = useState(null);

  // Načtení dat z API
  const loadData = async () => {
    setLoading(true);
    setAppError(null);

    try {
      const [recipesData, ingredientsData] = await Promise.all([
        api.getRecipes(),
        api.getIngredients()
      ]);

      setRecipes(recipesData);
      setIngredients(ingredientsData);
    } catch (error) {
      setAppError('Chyba při načítání dat. Ujisti se, že je backend spuštěný na http://localhost:3000');
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Inicializace - načtení dat po mountu
  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="app-container">
        <header className="header">
          <div className="header__inner">
            <h1 className="header__title">Kniha_receptů</h1>
            <p className="header__subtitle">Správa receptů a ingrediencí</p>
          </div>
        </header>
        <main className="main">
          <div className="loading">Načítám data...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="header">
        <div className="header__inner">
          <h1 className="header__title">Kniha_receptů</h1>
          <p className="header__subtitle">Správa receptů a ingrediencí</p>
        </div>
      </header>

      {appError && (
        <div className="error-banner error-banner--global">
          {appError}
        </div>
      )}

      <main className="main">
        <Tabs currentTab={currentTab} onTabChange={setCurrentTab} />

        {currentTab === 'recipes' && (
          <RecipePanel
            recipes={recipes}
            ingredients={ingredients}
            onRefresh={loadData}
          />
        )}

        {currentTab === 'ingredients' && (
          <IngredientPanel
            ingredients={ingredients}
            recipes={recipes}
            onRefresh={loadData}
          />
        )}
      </main>

      <footer className="footer">
        <p>&copy; 2026 Kniha receptů - React aplikace</p>
      </footer>
    </div>
  );
}

export default App;
