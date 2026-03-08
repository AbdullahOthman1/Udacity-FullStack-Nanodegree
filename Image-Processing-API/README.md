# Image Processing API

A Node.js REST API built with Express and Sharp that resizes and processes images on the server. Processed images are cached so they are only generated once.

---

## Getting Started

### Prerequisites
- Node.js v18 or higher
- npm

### Installation

If you cloned a parent repository (Udacity-FullStack-Nanodegree), navigate into the project folder first:
```bash
cd Udacity-FullStack-Nanodegree/Image-Processing-API
```

Then install dependencies:
```bash
npm install
```

---

## Scripts

| Script | Command | Description |
|---|---|---|
| Start | `npm start` | Starts the server (requires build first) |
| Build | `npm run build` | Compiles TypeScript to JavaScript |
| Test | `npm test` | Runs all tests with Jasmine |
| Lint | `npm run lint` | Runs ESLint on all source files |
| Format | `npm run format` | Runs Prettier on all source files |

### Recommended order to run the project

```bash
npm run build
npm start
```

---

## API Endpoints

### Process an Image
```
GET /api/images?filename={name}&width={w}&height={h}&format={fmt}
```

| Parameter | Required | Description | Example |
|---|---|---|---|
| filename | Yes | Image name without extension | `Zoro` |
| width | Yes | Width in pixels (positive number) | `200` |
| height | Yes | Height in pixels (positive number) | `200` |
| format | No | Output format, defaults to `jpg` | `jpg`, `png`, `webp` |

**Example request:**
```
http://localhost:3000/api/images?filename=Zoro&width=200&height=200&format=jpg
```

**Error responses:**
- `400` — Missing or invalid parameters (filename, width, height, format)
- `404` — Image file not found in the full images folder

---

### Upload an Image
```
POST /api/upload
```
Accepts a multipart form upload with field name `image`. Saves the file to `images/full/`.

Allowed formats: `jpg`, `png`, `webp`

---

### List Thumbnails
```
GET /api/thumbnails
```
Returns a JSON list of all cached thumbnail filenames.

**Example response:**
```json
{ "thumbnails": ["Zoro_200x200.jpg", "Zoro_300x300.jpg"] }
```

---

## Frontend Pages

| Page | URL | Description |
|---|---|---|
| Image Processor | `http://localhost:3000` | Select filename, dimensions, and format to process an image |
| Upload | `http://localhost:3000/upload.html` | Upload a new image to the full images folder |
| Gallery | `http://localhost:3000/gallery.html` | View all cached thumbnails |

---

## Caching Behavior

When an image is processed for the first time, the resized version is saved to `images/thumb/` with the size included in the filename (e.g. `Zoro_200x200.jpg`).

On subsequent requests with the same parameters, the cached file is served directly without reprocessing.

**To test caching:**
1. Delete all files inside `images/thumb/`
2. Access `http://localhost:3000/api/images?filename=Zoro&width=200&height=200`
3. Check the terminal — you will see `Processed and cached: Zoro_200x200.jpg`
4. Access the same URL again
5. Check the terminal — you will now see `Cache hit: serving existing thumbnail Zoro_200x200.jpg`

---

## Project Structure

```
src/
  routes/         → Express route handlers
  utilities/      → Image processor and logger modules
  frontend/       → HTML frontend pages
tests/            → Jasmine test files
images/
  full/           → Original full-size images (place your images here)
  thumb/          → Auto-generated cached thumbnails
logs/             → Log files generated at runtime
dist/             → Compiled JavaScript output
```

---

## Extra Features

- **Multiple formats** — supports `jpg`, `png`, and `webp` output
- **Size-aware caching** — thumbnail filenames include dimensions, so multiple sizes of the same image can be cached simultaneously
- **Logging** — all image processing and cache hits are logged to both the terminal and `logs/app.log`
- **Upload UI** — upload new images directly from the browser
- **Gallery UI** — browse all cached thumbnails in a grid
- **Processing UI** — select an image, set dimensions and format, and preview the result in the browser