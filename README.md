# Joshua Wong — Portfolio

Personal portfolio built with **Vite + React + TypeScript + Tailwind CSS**. This is the same stack Lovable uses.

## Run locally

```sh
npm install
npm run dev        # http://localhost:8080
npm run build      # production build in dist/
```

## Editing content

All text is in **`src/data/content.ts`**: profile links, about, experience, projects, education, skills and the footer tagline.

Company logos are in `src/assets/logos/` and software icons are in `src/assets/software/`. Both show in greyscale and switch to full colour on hover. To change the software row, edit the `software` list in `content.ts`.

## Adding images or a 3D model to a project

1. Put the files in `public/projects/<project-slug>/`, for example `public/projects/revit-automation-tool/`.
2. List them on that project in `src/data/content.ts`:

```ts
images: [
  "/projects/revit-automation-tool/sheet-set.jpg",
  "/projects/revit-automation-tool/dynamo-graph.png",
],
thumbnail: "/projects/revit-automation-tool/sheet-set.jpg", // optional, shown in the project list
model: "/projects/revit-automation-tool/building.glb",      // optional 3D model
```

On the home page, hovering a project shows a floating preview of its `thumbnail`, or of its first image if there's no thumbnail. The first image is also shown large at the top of the gallery. Clicking any image opens a full-screen viewer, which supports the arrow keys and Esc.

Supported 3D formats: **`.glb` / `.gltf`** (recommended, keeps materials), **`.stl`** and **`.obj`**. When a project has both images and a model, an *Images / 3D model* toggle appears.

Exporting from Revit: a common route is Revit → FBX → Blender → **glTF Binary (.glb)**. Keep files under about 20 MB so they load quickly.

## Deployment (GitHub Pages)

Live site: **https://joshua-c-wong.github.io/Website_Portfolio/**

Every push to `main` rebuilds and redeploys the site automatically via `.github/workflows/deploy.yml`. Progress shows in the repo's **Actions** tab, and it takes about 1–2 minutes.

```sh
git add . && git commit -m "Update portfolio" && git push
```

The Pages build runs with `GITHUB_PAGES=true`, which serves the site from `/Website_Portfolio/`. Locally and in Lovable the site still runs from `/`, so nothing needs to change there. When linking to files in `public/` from code, use the `publicUrl()` helper in `src/lib/utils.ts`. Paths written in `content.ts` are handled automatically.

## Lovable

The project uses Lovable's standard stack. To edit it in Lovable, connect your GitHub account there and choose this repo.
