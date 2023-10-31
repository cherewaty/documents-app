# @cherewaty/documents-app

Sample application to demonstrate application development capabilities.

Bootstrapped with `codesandbox-template-vite-react`.

[![Edit in CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/github/cherewaty/documents-app/main)

## Running locally

This project is primarily intended for use with CodeSandbox, but you can also run it locally with Node.js 18 installed:

```bash
git clone
cd documents-app
yarn install
yarn dev
```

A `devcontainer` setup is also included for use with VS Code and Docker.

## Key technologies

### Builds

[Vite](https://vitejs.dev/) is used for the build toolchain. It's a modern, fast, and flexible alternative to Webpack.

### Mock data

This project uses [Mock Service Worker](https://mswjs.io/) to mock API requests. The mock data, created with [`@mswjs/data`](https://github.com/mswjs/data) factories, is configured in `src/mocks/handlers.ts`. This tooling means we have fairly realistic network requests and asnychrony already built into this application, even without a real backend.

### Form state

[Formik](https://formik.org/) is used for form state management. Forms tend to have the same state shape over and over, so Formik handles that abstraction, with computed states like `isSubmitting`, `isValid`, etc.

### Network requests

In much the same way Formik provides a standard set of abstractions for form state, [`@tanstack/react-query`](https://tanstack.com/query/latest/docs/react/overview) simplifies network requests. It includes a standard set of computed states for async requests, as well as built-in refreshing behavior when the browser refocuses.

### Component library

[Joy UI](https://mui.com/joy-ui/getting-started/) is used for the design system and component library. It's the latest from the team that built the ubiquitous Material UI library, but decoupled from Google's design language with new strategies for theming. Joy UI uses [Emotion](https://emotion.sh) for CSS tooling.

### Routing

[React Router](https://reactrouter.com/) continues to be the gold standard for routing in React applications. Accessible single-page apps should still have URLs and maintain browser history, and React Router makes that easy.

## Shortcuts

### Authentication

This application features a simple dropdown menu for switching between user roles. In a more realistic scenario, this would be replaced with a proper authentication flow. Any given person would only log in with their credentials and role.

### Business logic

One of the requirements for this project is that a CEO only has a document on their "desk" to review for 60 seconds. In a production scenario, this would be handled by a backend service, but for the purposes of this demo, it's handled in the frontend, in `src/api.ts`.

### API design

`@mswjs/data` provides a `toHandlers()` for quickly standing up fake RESTful endpoints. That's in use here with a set of `documents` endpoints, but means those endpoints' behaviors are not modifiable. A new `documents-by-role` endpoint is not the most elegant API design, but it's a quick way to demonstrate the concept without authentication infrastructure.

### Information architecture

A single form provides creation abilities for both expense reports and requisitions. That may suffice for users, but it's very possible we'd receive feedback that the two types of documents are different enough to warrant separate forms.
