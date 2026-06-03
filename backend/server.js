// ============================================================================
// COOKBOOK API - Express.js Backend
// Jednoduchý backend pro správu receptů a ingrediencí
// ============================================================================

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');
const DIST_DIR = path.join(__dirname, '../frontend/dist');

// ============================================================================
// Middleware
// ============================================================================

// Povolení CORS pro komunikaci s frontendem
app.use(cors());

// Parser JSON requestů
app.use(express.json());

// ============================================================================
// Pomocné funkce
// ============================================================================

// Generování UUID
function generateId() {
  return randomUUID();
}

// Načtení dat z JSON souboru
function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Chyba při načítání dat:', error.message);
  }
  return null;
}

// Uložení dat do JSON souboru
function saveData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Chyba při ukládání dat:', error.message);
  }
}

// Inicializace dat - vytvoří prázdnou strukturu nebo načte existující
let db = loadData();
if (!db) {
  db = {
    ingredients: [],
    recipes: []
  };
  saveData(db);
  console.log('Vytvořena nová databáze');
} else {
  console.log('Načtena existující databáze');
}

// ============================================================================
// API Endpoints - Ingredience
// ============================================================================

// GET /api/ingredients - Získat seznam všech ingrediencí
app.get('/api/ingredients', (req, res) => {
  const sorted = [...db.ingredients].sort((a, b) =>
    a.name.localeCompare(b.name, 'cs')
  );
  res.json(sorted);
});

// GET /api/ingredients/:id - Získat detail ingredience
app.get('/api/ingredients/:id', (req, res) => {
  const ingredient = db.ingredients.find(i => i.id === req.params.id);
  if (!ingredient) {
    return res.status(404).json({ error: 'Ingredience nenalezena' });
  }
  res.json(ingredient);
});

// POST /api/ingredients - Vytvořit novou ingredienci
app.post('/api/ingredients', (req, res) => {
  const { name, unit } = req.body;

  // Validace
  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Název ingredience je povinný' });
  }

  const newIngredient = {
    id: generateId(),
    name: name.trim(),
    unit: unit ? unit.trim() : ''
  };

  db.ingredients.push(newIngredient);
  saveData(db);

  console.log(`Vytvořena ingredience: ${newIngredient.name}`);
  res.status(201).json(newIngredient);
});

// PUT /api/ingredients/:id - Aktualizovat ingredienci
app.put('/api/ingredients/:id', (req, res) => {
  const { name, unit } = req.body;
  const index = db.ingredients.findIndex(i => i.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Ingredience nenalezena' });
  }

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Název ingredience je povinný' });
  }

  db.ingredients[index] = {
    id: req.params.id,
    name: name.trim(),
    unit: unit ? unit.trim() : ''
  };

  saveData(db);
  console.log(`Aktualizována ingredience: ${name}`);
  res.json(db.ingredients[index]);
});

// DELETE /api/ingredients/:id - Smazat ingredienci
app.delete('/api/ingredients/:id', (req, res) => {
  const id = req.params.id;
  const index = db.ingredients.findIndex(i => i.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Ingredience nenalezena' });
  }

  const ingredient = db.ingredients[index];

  // Odstranit ingredienci ze všech receptů
  db.recipes.forEach(recipe => {
    recipe.items = recipe.items.filter(item => item.ingredientId !== id);
  });

  // Smazat ingredienci
  db.ingredients.splice(index, 1);
  saveData(db);

  console.log(`Smazána ingredience: ${ingredient.name}`);
  res.json({ message: 'Ingredience smazána' });
});

// ============================================================================
// API Endpoints - Recepty
// ============================================================================

// GET /api/recipes - Získat seznam všech receptů (s možností filtrování)
app.get('/api/recipes', (req, res) => {
  let recipes = [...db.recipes];

  // Filtrování podle názvu (case-insensitive)
  if (req.query.name) {
    const search = req.query.name.toLowerCase();
    recipes = recipes.filter(r =>
      r.name.toLowerCase().includes(search)
    );
  }

  // Seřazení podle názvu
  recipes.sort((a, b) => a.name.localeCompare(b.name, 'cs'));

  res.json(recipes);
});

// GET /api/recipes/:id - Získat detail receptu
app.get('/api/recipes/:id', (req, res) => {
  const recipe = db.recipes.find(r => r.id === req.params.id);

  if (!recipe) {
    return res.status(404).json({ error: 'Recept nenalezen' });
  }

  res.json(recipe);
});

// POST /api/recipes - Vytvořit nový recept
app.post('/api/recipes', (req, res) => {
  const { name, steps, items } = req.body;

  // Validace
  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Název receptu je povinný' });
  }

  if (!items || !Array.isArray(items)) {
    return res.status(400).json({ error: 'Recept musí obsahovat ingredience' });
  }

  // Kontrola duplicitních ingrediencí
  const seenIngredients = new Set();
  for (const item of items) {
    if (seenIngredients.has(item.ingredientId)) {
      return res.status(400).json({ error: 'Každou ingredienci lze uvést jen jednou' });
    }
    seenIngredients.add(item.ingredientId);
  }

  const newRecipe = {
    id: generateId(),
    name: name.trim(),
    steps: steps ? steps.trim() : '',
    items: items.map(item => ({
      ingredientId: item.ingredientId,
      amount: item.amount ? String(item.amount).trim() : ''
    }))
  };

  db.recipes.push(newRecipe);
  saveData(db);

  console.log(`Vytvořen recept: ${newRecipe.name}`);
  res.status(201).json(newRecipe);
});

// PUT /api/recipes/:id - Aktualizovat recept
app.put('/api/recipes/:id', (req, res) => {
  const { name, steps, items } = req.body;
  const index = db.recipes.findIndex(r => r.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Recept nenalezen' });
  }

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Název receptu je povinný' });
  }

  if (!items || !Array.isArray(items)) {
    return res.status(400).json({ error: 'Recept musí obsahovat ingredience' });
  }

  // Kontrola duplicitních ingrediencí
  const seenIngredients = new Set();
  for (const item of items) {
    if (seenIngredients.has(item.ingredientId)) {
      return res.status(400).json({ error: 'Každou ingredienci lze uvést jen jednou' });
    }
    seenIngredients.add(item.ingredientId);
  }

  db.recipes[index] = {
    id: req.params.id,
    name: name.trim(),
    steps: steps ? steps.trim() : '',
    items: items.map(item => ({
      ingredientId: item.ingredientId,
      amount: item.amount ? String(item.amount).trim() : ''
    }))
  };

  saveData(db);
  console.log(`Aktualizován recept: ${name}`);
  res.json(db.recipes[index]);
});

// DELETE /api/recipes/:id - Smazat recept
app.delete('/api/recipes/:id', (req, res) => {
  const id = req.params.id;
  const index = db.recipes.findIndex(r => r.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Recept nenalezen' });
  }

  const recipe = db.recipes[index];
  db.recipes.splice(index, 1);
  saveData(db);

  console.log(`Smazán recept: ${recipe.name}`);
  res.json({ message: 'Recept smazán' });
});

// ============================================================================
// Servování React buildu (Frontend)
// ============================================================================

// Pokud existuje React build, servuj jej jako static files
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
  
  // Fallback pro React Router - všechny ostatní cesty vrátí index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  });
  
  console.log('React frontend je servován z:', DIST_DIR);
} else {
  console.warn('⚠️  React build nenalezen. Spusť: npm run build:frontend');
}

// ============================================================================
// Spuštění serveru
// ============================================================================

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🍳  Cookbook API Server                                ║
║                                                           ║
║   Server běží na: http://localhost:${PORT}                 ║
║                                                           ║
║   Endpointy:                                              ║
║   • GET    /api/ingredients       - seznam ingrediencí   ║
║   • GET    /api/ingredients/:id   - detail ingredience   ║
║   • POST   /api/ingredients       - vytvořit ingredienci ║
║   • PUT    /api/ingredients/:id   - aktualizovat         ║
║   • DELETE /api/ingredients/:id   - smazat               ║
║                                                           ║
║   • GET    /api/recipes            - seznam receptů      ║
║   • GET    /api/recipes/:id        - detail receptu      ║
║   • POST   /api/recipes            - vytvořit recept     ║
║   • PUT    /api/recipes/:id        - aktualizovat        ║
║   • DELETE /api/recipes/:id        - smazat               ║
║                                                           ║
║   Data uložena v: ${DATA_FILE}                            ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});