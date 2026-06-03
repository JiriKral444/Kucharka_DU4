# 🍳 Cookbook App

React + Vite frontend se **Express.js** backendem pro správu receptů a ingrediencí.

## 📁 Struktura projektu

```
Kucharka/
├── backend/
│   ├── server.js          # Express backend a API
│   └── data.json          # Ukládání dat (JSON)
├── frontend/              # React + Vite aplikace
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
├── package.json           # Root skripty pro build a start
└── README.md              # Tento soubor
```

## 🚀 Spuštění projektu

### 1. Instalace závislostí

```bash
npm install
cd frontend
npm install
```

### 2. Spuštění v režimu vývoje

- Backend:
  ```bash
  npm run dev
  ```
- Frontend:
  ```bash
  npm run dev:frontend
  ```

Frontend běží na Vite portu (obvykle `http://localhost:5173`) a backend na `http://localhost:3000`.

### 3. Spuštění celé aplikace

```bash
npm start
```

Tento příkaz nejprve vytvoří React build a poté spustí Express server. Pokud je `frontend/dist` k dispozici, backend frontend také servíruje.

## 🧰 Dostupné skripty

- `npm install` – nainstaluje root závislosti
- `npm run dev` – spustí backend server
- `npm run dev:frontend` – spustí frontend pro vývoj
- `npm run build:frontend` – vytvoří produkční build React aplikace
- `npm run preview:frontend` – preview produkčního buildu frontend
- `npm start` – postaví frontend a spustí backend

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

## 📝 Data a validace

Backend ukládá data do `backend/data.json`.

Ingredience obsahují:

```json
{
  "id": "uuid",
  "name": "Hladká mouka",
  "unit": "g"
}
```

Recept obsahuje:

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

Backend provádí základní validaci:
- název ingredience je povinný
- název receptu je povinný
- recept musí obsahovat seznam ingrediencí
- každá ingredience v receptu může být uvedena pouze jednou

## 💾 Servování frontendu

Pokud je vytvořen React build v `frontend/dist`, backend jej servíruje jako statické soubory. Jinak je možné frontend spustit samostatně přes Vite.

## 🛠️ Technologie

- Backend: `Node.js`, `Express`, `cors`
- Frontend: `React`, `Vite`
- Data: `JSON` soubor (`backend/data.json`)

## 📄 Licence

`ISC`
