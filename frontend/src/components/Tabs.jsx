import '../styles/Tabs.css';

export default function Tabs({ currentTab, onTabChange }) {
  return (
    <nav className="tabs" role="tablist">
      <button
        className={`tabs__btn ${currentTab === 'recipes' ? 'tabs__btn--active' : ''}`}
        data-tab="recipes"
        role="tab"
        aria-selected={currentTab === 'recipes'}
        onClick={() => onTabChange('recipes')}
      >
        Recepty
      </button>
      <button
        className={`tabs__btn ${currentTab === 'ingredients' ? 'tabs__btn--active' : ''}`}
        data-tab="ingredients"
        role="tab"
        aria-selected={currentTab === 'ingredients'}
        onClick={() => onTabChange('ingredients')}
      >
        Ingredience
      </button>
    </nav>
  );
}
