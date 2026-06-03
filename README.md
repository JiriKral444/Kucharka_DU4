# 🍳 Kniha receptů (Cookbook App)

Aplikace pro správu receptů a ingrediencí postavená na **Node.js + Express.js** backendu s klasickým HTML/CSS/JavaScript frontendem.

## 📁 Struktura projektu

```
Kucharka/
├── backend/
│   ├── server.js          # Express.js backend (jeden přehledný soubor)
│   └── data.json          # Úložiště dat (automaticky vytvořeno)
├── app.js                 # Frontendová logika
├── index.html             # HTML struktura
├── styles.css             # Styly
├── package.json           # NPM konfigurace
└── README.md              # Tento soubor
```

## 🚀 Spuštění projektu

### 1. Instalace závislostí backendu

```bash
npm install
cd frontend
npm install
```

### 2. Spuštění backendu

```bash
npm start
```

Server se spustí na adrese `http://localhost:3000`

### 3. Otevření frontendu

Otevřete soubor `index.html` v prohlížeči. Můžete použít:
- Přímo otevřít soubor v prohlížeči
- Použít rozšíření "Live Server" ve VS Code
- Spustit jednoduchý HTTP server: `npx serve .`

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

- **Backend**: Node.js, Express.js, CORS
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Data**: JSON soubor

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

Pro vývoj můžete spustit server v režimu:

```bash
npm run dev
```

## 📄 Licence

`ISC`
