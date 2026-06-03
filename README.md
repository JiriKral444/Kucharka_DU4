# 🍳 Cookbook App

Aplikace pro správu receptů a ingrediencí s React + Vite frontendem a Express.js backendem.

## 📌 Co aplikace umí

- Správa ingrediencí: vytvoření, zobrazení, úprava, smazání
- Správa receptů: vytvoření, zobrazení, úprava, smazání
- Recepty jsou provázané s ingrediencemi pomocí jejich `id`
- Data jsou ukládána do souboru `backend/data.json`
- Frontend může běžet samostatně v režimu vývoje nebo být servírován backendem po buildu

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
├── node_modules/          # nainstalované balíčky
├── package.json           # root skripty pro backend a frontend
├── package-lock.json      # uzamčené verze závislostí
└── README.md              # hlavní dokumentace projektu
```

## ⚙️ Technologie

- Backend: `Node.js`, `Express`, `cors`
- Frontend: `React`, `Vite`, `ESLint`
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

Tím spustíte backend server na `http://localhost:3000`.

### 2) Vývoj frontend

```bash
npm run dev:frontend
```

Frontend běží přes Vite, typicky na `http://localhost:5173`.

### 3) Spuštění celé aplikace s buildem frontendu

```bash
npm start
```

Tento příkaz vytvoří produkční build frontendu a spustí Express server. Pokud je build dostupný, backend jej servíruje ze složky `frontend/dist`.

## 🧪 Root skripty

- `npm install` – nainstaluje backend závislosti
- `npm run dev` – spustí backend server
- `npm run dev:frontend` – spustí frontend pro vývoj
- `npm run build:frontend` – vytvoří produkční build frontend aplikace
- `npm run preview:frontend` – spustí preview pro produkční frontend
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
- že každá ingredience v receptu je uvedena jen jednou

## 💾 Ukládání dat

Data jsou perzistentně uložena v souboru `backend/data.json`. Pokud soubor neexistuje, vytvoří se automaticky při prvním spuštění serveru.

## 📦 Frontend

Frontend je postaven jako React + Vite aplikace ve složce `frontend/`. K dispozici jsou React komponenty a samostatné CSS styly pro zobrazení receptů, ingrediencí a formulářů.

## 🛠️ Vývoj a nasazení

- Pro lokální vývoj spusťte backend a frontend odděleně.
- Pro jednoduché nasazení použijte `npm start`, který build frontendu připraví a spustí backend.

## 📄 Licence

`ISC`

