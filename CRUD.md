# CRUD API Dokumentace - Cookbook API

## Přehled

API pro správu **Receptů** a **Ingrediencí** s úplnou CRUD funkcionalitou.

Báze URL: `http://localhost:3000`

---

## 1. INGREDIENCE (Ingredients)

Datový model:
```json
{
  "id": "uuid",
  "name": "string (povinné)",
  "unit": "string (kg, g, ml, ks, ...)"
}
```

### CREATE - POST `/api/ingredients`
Vytvoření nové ingredience

**Request:**
```json
{
  "name": "Sýr",
  "unit": "g"
}
```

**Response (201):**
```json
{
  "id": "88c1e66e-fbeb-4013-bea6-0cbacf01502c",
  "name": "Sýr",
  "unit": "g"
}
```

**Chyby:**
- `400` - Název ingredience je povinný

---

### READ - GET `/api/ingredients`
Získání seznamu všech ingrediencí (seřazeno abecedně podle češtiny)

**Response (200):**
```json
[
  {
    "id": "88c1e66e-fbeb-4013-bea6-0cbacf01502c",
    "name": "Pepř",
    "unit": "g"
  },
  {
    "id": "9e91b095-2b41-491c-b6e0-0c90c4209eb6",
    "name": "Sůl",
    "unit": "g"
  },
  {
    "id": "124ab425-5f36-48e0-843d-931c38827ede",
    "name": "Sýr",
    "unit": "g"
  }
]
```

---

### READ (Detail) - GET `/api/ingredients/:id`
Získání detailu konkrétní ingredience

**Response (200):**
```json
{
  "id": "88c1e66e-fbeb-4013-bea6-0cbacf01502c",
  "name": "Sýr",
  "unit": "g"
}
```

**Chyby:**
- `404` - Ingredience nenalezena

---

### UPDATE - PUT `/api/ingredients/:id`
Aktualizace existující ingredience

**Request:**
```json
{
  "name": "Sýr parmazán",
  "unit": "g"
}
```

**Response (200):**
```json
{
  "id": "88c1e66e-fbeb-4013-bea6-0cbacf01502c",
  "name": "Sýr parmazán",
  "unit": "g"
}
```

**Chyby:**
- `404` - Ingredience nenalezena
- `400` - Název ingredience je povinný

---

### DELETE - DELETE `/api/ingredients/:id`
Smazání ingredience

**Response (200):**
```json
{
  "message": "Ingredience smazána"
}
```

**Poznámka:** Při smazání ingredience se automaticky odstraní ze všech receptů

**Chyby:**
- `404` - Ingredience nenalezena

---

## 2. RECEPTY (Recipes)

Datový model:
```json
{
  "id": "uuid",
  "name": "string (povinné)",
  "steps": "string (postup přípravy)",
  "items": [
    {
      "ingredientId": "uuid (povinné)",
      "amount": "string (např. 200, 1 lžíce, ...)"
    }
  ]
}
```

### CREATE - POST `/api/recipes`
Vytvoření nového receptu

**Request:**
```json
{
  "name": "Špagety s rajčatovou omáčkou",
  "steps": "1. Uvařit špagety v osolené vodě\n2. Přidat omáčku\n3. Servírovat se sýrem",
  "items": [
    {
      "ingredientId": "9e91b095-2b41-491c-b6e0-0c90c4209eb6",
      "amount": "400"
    },
    {
      "ingredientId": "86ab72e7-f993-46c6-bece-30237c802ff2",
      "amount": "300"
    },
    {
      "ingredientId": "88c1e66e-fbeb-4013-bea6-0cbacf01502c",
      "amount": "100"
    }
  ]
}
```

**Response (201):**
```json
{
  "id": "a1b2c3d4-e5f6-47g8-h9i0-j1k2l3m4n5o6",
  "name": "Špagety s rajčatovou omáčkou",
  "steps": "1. Uvařit špagety v osolené vodě\n2. Přidat omáčku\n3. Servírovat se sýrem",
  "items": [
    {
      "ingredientId": "9e91b095-2b41-491c-b6e0-0c90c4209eb6",
      "amount": "400"
    },
    {
      "ingredientId": "86ab72e7-f993-46c6-bece-30237c802ff2",
      "amount": "300"
    },
    {
      "ingredientId": "88c1e66e-fbeb-4013-bea6-0cbacf01502c",
      "amount": "100"
    }
  ]
}
```

**Chyby:**
- `400` - Název receptu je povinný
- `400` - Recept musí obsahovat ingredience
- `400` - Každou ingredienci lze uvést jen jednou

---

### READ - GET `/api/recipes`
Získání seznamu všech receptů (seřazeno abecedně)

**Query parametry:**
- `name` (volitelné) - filtrování podle názvu (case-insensitive)

**Příklady:**
- `GET /api/recipes` - všechny recepty
- `GET /api/recipes?name=spaghetti` - recepty obsahující "spaghetti"

**Response (200):**
```json
[
  {
    "id": "a1b2c3d4-e5f6-47g8-h9i0-j1k2l3m4n5o6",
    "name": "Špagety s rajčatovou omáčkou",
    "steps": "...",
    "items": [...]
  }
]
```

---

### READ (Detail) - GET `/api/recipes/:id`
Získání detailu konkrétního receptu

**Response (200):**
```json
{
  "id": "a1b2c3d4-e5f6-47g8-h9i0-j1k2l3m4n5o6",
  "name": "Špagety s rajčatovou omáčkou",
  "steps": "...",
  "items": [...]
}
```

**Chyby:**
- `404` - Recept nenalezen

---

### UPDATE - PUT `/api/recipes/:id`
Aktualizace existujícího receptu

**Request:**
```json
{
  "name": "Spaghetti Carbonara",
  "steps": "1. Uvařit špagety\n2. Připravit omáčku\n3. Smíchat",
  "items": [
    {
      "ingredientId": "9e91b095-2b41-491c-b6e0-0c90c4209eb6",
      "amount": "500"
    }
  ]
}
```

**Response (200):** - vrací aktualizovaný recept

**Chyby:**
- `404` - Recept nenalezen
- `400` - Název receptu je povinný
- `400` - Recept musí obsahovat ingredience
- `400` - Každou ingredienci lze uvést jen jednou

---

### DELETE - DELETE `/api/recipes/:id`
Smazání receptu

**Response (200):**
```json
{
  "message": "Recept smazán"
}
```

**Chyby:**
- `404` - Recept nenalezen

---

## Stavové kódy HTTP

| Kód | Popis |
|-----|-------|
| 200 | OK - úspěšně zpracováno |
| 201 | Created - nový zdroj vytvořen |
| 400 | Bad Request - chyba ve vstupu |
| 404 | Not Found - zdroj nenalezen |

---

## Příklady použití (cURL)

### Vytvořit ingredienci
```bash
curl -X POST http://localhost:3000/api/ingredients \
  -H "Content-Type: application/json" \
  -d '{"name": "Sýr", "unit": "g"}'
```

### Získat všechny recepty
```bash
curl http://localhost:3000/api/recipes
```

### Hledat recepty
```bash
curl "http://localhost:3000/api/recipes?name=spaghetti"
```

### Aktualizovat ingredienci
```bash
curl -X PUT http://localhost:3000/api/ingredients/88c1e66e-fbeb-4013-bea6-0cbacf01502c \
  -H "Content-Type: application/json" \
  -d '{"name": "Sýr Eidám", "unit": "g"}'
```

### Smazat recept
```bash
curl -X DELETE http://localhost:3000/api/recipes/a1b2c3d4-e5f6-47g8-h9i0-j1k2l3m4n5o6
```

---

## Souhrn

- **5 CRUD operací pro Ingredience**: Create, Read (seznam), Read (detail), Update, Delete
- **5 CRUD operací pro Recepty**: Create, Read (seznam s filtrováním), Read (detail), Update, Delete
- **2 datové entity**: Ingredience a Recepty
- **Databáze**: JSON soubor (`backend/data.json`)
- **Servírování frontendu**: React build je servírován jako static files z `frontend/dist`
