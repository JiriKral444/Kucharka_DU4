# 🍳 Cookbook App

Aplikace pro správu receptů a ingrediencí s React + Vite frontendem a Express.js backendem.

## 📌 Co aplikace umí

- Správa ingrediencí: vytvoření, zobrazení, úprava, smazání
- Správa receptů: vytvoření, zobrazení, úprava, smazání
- Recepty jsou propojené s ingrediencemi pomocí jejich `id`
- Data jsou perzistentně uložena v `backend/data.json`
- Frontend je single-page aplikace (SPA): jedna URL `/`, interní přepínání mezi views pomocí komponenty `Tabs`
- Backend může servírovat frontend build z `frontend/dist`

## 📁 Struktura projektu

```
Kucharka/
├── backend/
│   ├── server.js          # Express backend a API
│   └── data.json          # Perzistentní data ve formátu JSON
├── frontend/              # React + Vite aplikace
│   ├── public/            # statické soubory
│   ├── src/               # React komponenty a logika
│   ├── package.json       # frontend závislosti a skripty
│   └── README.md          # frontend dokumentace
├── seznam_route.md        # přehled route aplikace
├── package.json           # root skripty pro backend a frontend
└── package-lock.json      # uzamčené verze závislostí
```

## ⚙️ Technologie

- Backend: `Node.js`, `Express`, `cors`
- Frontend: `React`, `Vite`
- Data: JSON soubor uložený v `backend/data.json`

## 🚀 Instalace

1. Nainstalujte závislosti root projektu:

```bash
npm install
```

2. Nainstalujte závislosti frontend projektu:

```bash
cd frontend
npm install
cd ..
```

## 🚀 Spuštění

### 1) Vývoj backendu

```bash
npm run dev
```

Backend poběží na `http://localhost:3000`.

### 2) Vývoj frontend

```bash
npm run dev:frontend
```

Frontend poběží na adrese `http://localhost:5173`.

### 3) Spuštění celé aplikace s buildem frontendu

```bash
npm start
```

Příkaz postaví frontend a spustí backend. Pokud je build dostupný, backend jej servíruje ze složky `frontend/dist`.

## 🧪 Root skripty

- `npm install` – nainstaluje root závislosti (backend)
- `npm run dev` – spustí backend server
- `npm run dev:frontend` – spustí frontend Vite server
- `npm run build:frontend` – vytvoří produkční build frontend aplikace
- `npm run preview:frontend` – spustí preview produkčního frontendu
- `npm start` – postaví frontend a spustí backend

## 🧾 Backend API

### Ingredience

| Metoda | Endpoint | Popis |
|--------|----------|-------|
| GET | `/api/ingredients` | Vrátí seznam všech ingrediencí |
| GET | `/api/ingredients/:id` | Vrátí detail ingredience |
| POST | `/api/ingredients` | Vytvoří novou ingredienci |
| PUT | `/api/ingredients/:id` | Aktualizuje ingredienci |
| DELETE | `/api/ingredients/:id` | Smaže ingredienci |

### Recepty

| Metoda | Endpoint | Popis |
|--------|----------|-------|
| GET | `/api/recipes` | Vrátí seznam všech receptů |
| GET | `/api/recipes/:id` | Vrátí detail receptu |
| POST | `/api/recipes` | Vytvoří nový recept |
| PUT | `/api/recipes/:id` | Aktualizuje recept |
| DELETE | `/api/recipes/:id` | Smaže recept |

## 🧩 Datové modely

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

## ✅ Validace backendu

Backend kontroluje:

- že `name` u ingredience není prázdné
- že `name` u receptu není prázdné
- že recept obsahuje pole `items`
- že každý recept obsahuje pouze unikátní ingredience

## 💾 Ukládání dat

Data jsou perzistentně uložena v souboru `backend/data.json`. Pokud soubor neexistuje, vytvoří se automaticky při prvním spuštění serveru.

## 📦 Frontend

Frontend je postaven jako React + Vite aplikace ve složce `frontend/`. Hlavní komponenta je `frontend/src/App.jsx`, která načítá data a řídí interní přepínání mezi `RecipePanel` a `IngredientPanel`.

## 🛠️ Vývoj a nasazení

- Pro lokální vývoj spusťte backend a frontend odděleně.
- Pro jednoduché lokální přípravu nasazení spusťte `npm start`, který vytvoří frontend build a spustí backend.

## 📄 Další dokumentace

- `seznam_route.md` — přehled všech route aplikace a jejich umístění v kódu.

## 📄 Licence

`ISC`

