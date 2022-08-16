# Scrowl Slide Template Builder

This is a command line tool to help developers build slide templates for [Scrowl](https://github.com/scrowl-io/scrowl).

## Getting Started

Before getting started, you should know that this tool expectations on you build your templates. Your templates need to be built with Typescript, React, and Css Modules in order for the tool to function correctly.

---

> The expectation of your source files is that they are built with Typescript, React, and Css Modules.

---

Install this tool via npm

```
npm install scrowl-builder -g
```

Then from your terminal in a new repository:

```
scrowl-builder create <SLIDE-TEMPLATE-NAME>
```

For active development of your slide template (this will start a local dev sever with hot reloading):

```
npm run start
```

For distribution:

```
npm run build
```

## Tool Development

For local development of this tool, follow these steps:

```
npm install
```

```
npm run local
```

Then create a new project folder and follow the `Getting Started` steps.

If you want a fresh start: `npm run refresh`. This command will uninstall the tool, remove the build and node_modules, and then install the dependencies.
