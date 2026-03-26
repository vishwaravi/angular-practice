# Angular Practice — Documentation

This project is an Angular 21 practice workspace covering core framework concepts through hands-on examples. Each topic lives in its own feature folder under `src/app/`.

## Topics

| Topic | Folder | Doc |
|---|---|---|
| Angular Signals | `counter/` | [signals.md](./signals.md) |
| Data Bindings | `data-bindings/` | [data-bindings.md](./data-bindings.md) |
| Directives | `directives/`, root `highlight.ts` | [directives.md](./directives.md) |
| Lifecycle Hooks | `lifecyclehooks/` | [lifecycle-hooks.md](./lifecycle-hooks.md) |
| HTTP Client | `http-client/` | [http-client.md](./http-client.md) |
| Reactive Forms | `reactive-forms/` | [reactive-forms.md](./reactive-forms.md) |
| Sharing Data Between Components | `sharing-data-between-comps/` | [sharing-data.md](./sharing-data.md) |

## Project Setup

```bash
# Install dependencies
npm install

# Start development server (http://localhost:4200)
npm start

# Run unit tests (Vitest)
npm test

# Production build
npm run build
```

## Tech Stack

- **Angular** 21 (standalone components)
- **TypeScript** ~5.9
- **RxJS** ~7.8
- **Vitest** for unit testing
- **Angular CLI** 21.0.5
