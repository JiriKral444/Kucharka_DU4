# Seznam route aplikace

## Backend API route
- `GET /api/ingredients` — seznam všech ingrediencí
  - definováno v `backend/server.js` ve funkci `app.get('/api/ingredients', ...)`

- `GET /api/ingredients/:id` — detail konkrétní ingredience
  - definováno v `backend/server.js` ve funkci `app.get('/api/ingredients/:id', ...)`

- `POST /api/ingredients` — vytvoření nové ingredience
  - definováno v `backend/server.js` ve funkci `app.post('/api/ingredients', ...)`

- `PUT /api/ingredients/:id` — aktualizace ingredience
  - definováno v `backend/server.js` ve funkci `app.put('/api/ingredients/:id', ...)`

- `DELETE /api/ingredients/:id` — smazání ingredience
  - definováno v `backend/server.js` ve funkci `app.delete('/api/ingredients/:id', ...)`


- `GET /api/recipes` — seznam všech receptů (s možností filtrování `?name=...`)
  - definováno v `backend/server.js` ve funkci `app.get('/api/recipes', ...)`

- `GET /api/recipes/:id` — detail konkrétního receptu
  - definováno v `backend/server.js` ve funkci `app.get('/api/recipes/:id', ...)`

- `POST /api/recipes` — vytvoření nového receptu
  - definováno v `backend/server.js` ve funkci `app.post('/api/recipes', ...)`

- `PUT /api/recipes/:id` — aktualizace receptu
  - definováno v `backend/server.js` ve funkci `app.put('/api/recipes/:id', ...)`

- `DELETE /api/recipes/:id` — smazání receptu
  - definováno v `backend/server.js` ve funkci `app.delete('/api/recipes/:id', ...)`


## Frontend SPA route
- `GET /` — hlavní vstupní stránka React SPA (`frontend/src/App.jsx`)
  - `frontend/src/App.jsx` nastavuje `currentTab` a vykresluje komponenty `Tabs`, `RecipePanel` a `IngredientPanel`
  - přepínání views je interně řízeno stavem `currentTab`, nikoli React Routerem

> Poznámka: Aplikace je single-page a přepínání mezi views probíhá interně pomocí komponenty `Tabs`, nikoli pomocí samostatného React Router URL pro každou záložku.

## Výsledek
Tento soubor obsahuje kompletní identifikaci route aplikace, včetně backendových REST API endpointů definovaných v `backend/server.js` a hlavní frontendové SPA cesty definované v `frontend/src/App.jsx`. Route jsou popsány tak, aby bylo možné rychle ověřit, kde v kódu jsou jednotlivé endpointy nebo view logika implementovány.
