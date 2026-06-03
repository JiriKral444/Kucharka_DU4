# 🍳 Kuchařka (Cookbook App)

Aplikace pro správu receptů a ingrediencí postavená na **Node.js + Express.js** backendu s **React + Vite.js** frontendem.

## 📁 Struktura projektu

```
Kucharka/
├── backend/
│   ├── server.js          # Express.js backend
│   └── data.json          # Úložiště dat (automaticky vytvořeno)
├── frontend/
│   ├── src/
│   │   ├── components/    # React komponenty
│   │   │   ├── IngredientCard.jsx
│   │   │   ├── IngredientForm.jsx
│   │   │   ├── IngredientList.jsx
│   │   │   ├── IngredientPanel.jsx
│   │   │   ├── RecipeCard.jsx
│   │   │   ├── RecipeForm.jsx
│   │   │   ├── RecipeList.jsx
│   │   │   ├── RecipePanel.jsx
│   │   │   └── Tabs.jsx
│   │   ├── styles/        # CSS moduly
│   │   │   ├── Cards.css
│   │   │   ├── Forms.css
│   │   │   ├── Global.css
│   │   │   ├── Panels.css
│   │   │   └── Tabs.css
│   │   ├── utils/         # Pomocné funkce
│   │   │   ├── formatting.js
│   │   │   └── validation.js
│   │   ├── api.js         # API komunikace
│   │   ├── config.js      # Konfigurace
│   │   ├── App.jsx        # Hlavní komponenta
│   │   ├── main.jsx       # Vstupní bod
│   │   └── index.css      # Globální styly
│   ├── index.html         # HTML šablona
│   ├── vite.config.js     # Vite konfigurace
│   ├── eslint.config.js   # ESLint pravidla
│   └── package.json       # Frontend závislosti
├── package.json           # Root konfigurace
├── CRUD.md                # CRUD operace dokumentace
└── README.md              # Tento soubor
```

## 🚀 Rychlé spuštění

### 1. Instalace závislostí backendu

```bash
npm install
```

### 2. Instalace závislostí frontendu

```bash
cd frontend
npm install
cd ..
```

### 3. Spuštění backendu

```bash
npm start
```

Backend se spustí na adrese `http://localhost:3000`

### 4. Spuštění frontendu (v novém terminálu)

```bash
cd frontend
npm run dev
```

Frontend se spustí na adrese `http://localhost:5173` (nebo jiné, viz výstup v terminálu)

## 📡 API Endpoints

### Ingredience

| Metoda | Endpoint | Popis |
|--------|----------|-------|
| GET | `/api/ingredients` | Získat seznam všech ingrediencí |
| GET | `/api/ingredients/:id` | Získat detail ingredience |
| POST | `/api/ingredients` | Vytvořit novou ingredienci |
| PUT | `/api/ingredients/:id` | Aktualizovat ingredienci |
| DELETE | `/api/ingredients/:id` | Smazat ingredienci |

### Recepty

| Metoda | Endpoint | Popis |
|--------|----------|-------|
| GET | `/api/recipes` | Získat seznam všech receptů |
| GET | `/api/recipes/:id` | Získat detail receptu |
| POST | `/api/recipes` | Vytvořit nový recept |
| PUT | `/api/recipes/:id` | Aktualizovat recept |
| DELETE | `/api/recipes/:id` | Smazat recept |

## 📝 Datové struktury

### Ingredience
```json
{
  "id": "uuid",
  "name": "Hladká mouka",
  "unit": "g"
}
```

### Recept
```json
{
  "id": "uuid",
  "name": "Palačinky",
  "steps": "Postup přípravy...",
  "items": [
    {
      "ingredientId": "uuid-ingredientu",
      "amount": "200"
    }
  ]
}
```

## 💾 Ukládání dat

Data jsou automaticky ukládána do souboru `backend/data.json`. Tento soubor se vytvoří při prvním spuštění serveru.

## 🛠️ Technologie

- **Backend**: Node.js, Express.js, CORS
- **Frontend**: React 18+, Vite.js, CSS Modules
- **Stavitelný systém**: Vite (bundle)
- **Validace**: ESLint
- **Data**: JSON soubor

## 🎨 Architektura frontendu

### Komponenty
- **IngredientPanel** / **RecipePanel** - Panely s formulářem a seznamem
- **IngredientList** / **RecipeList** - Seznamy s kartami
- **IngredientCard** / **RecipeCard** - Jednotlivé karty
- **IngredientForm** / **RecipeForm** - Formuláře pro vytváření/úpravu
- **Tabs** - Přepínač mezi ingrediencemi a recepty

### Styly
Projekty používají CSS Modules rozdělené do logických skupin:
- `Global.css` - Globální styly
- `Cards.css` - Styly karet
- `Forms.css` - Styly formulářů
- `Panels.css` - Styly panelů
- `Tabs.css` - Styly záložek

### Utilily
- `validation.js` - Validace vstupů
- `formatting.js` - Formátování dat
- `api.js` - Komunikace s backend API
- `config.js` - Konfigurační konstanty

## 🎯 Funkce

- ✅ Přehledné API v jednom souboru
- ✅ CRUD operace pro ingredience i recepty
- ✅ Propojení receptů s ingrediencemi
- ✅ Automatické čištění odkazů při mazání
- ✅ Perzistence dat do JSON souboru
- ✅ CORS povolení pro komunikaci s frontendem
- ✅ Validace vstupů
- ✅ České rozhraní

## 🔧 Vývoj

### Spuštění backendu
```bash
npm start
```

### Spuštění frontendu v dev módu
```bash
cd frontend
npm run dev
```

### Build frontendu pro produkci
```bash
cd frontend
npm run build
```

### Linting frontendu
```bash
cd frontend
npm run lint
```

## 📄 Licence

ISC