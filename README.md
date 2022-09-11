# The Charity Backend

## Prerequisites

- [git][git] >= 2
- [volta][volta] >= 1

## Setup

After you've made sure to have the correct things (and versions) installed just
run:

```bash
npm install
```

Also, you should fill in the environment variables, you can copy the variables
from example.env using the below command:

```bash
cp example.env .development.env
```

then you need to migrate your database and keep it synced with schema using the
below command:

```bash
npm run migrate
```

and the final step is to run the seed script to fill your local database, for
example creating an admin record:

```bash
npm run seed
```

## Scripts

### Run

to run the app in the development environment just run:

```bash
npm run dev
```

### Build

To build the app just run:

```bash
npm run build
```

### Lint

To run the linter to auto-fix all the problems run:

```bash
npm run lint
```

### Test

To run the unit tests run:

```bash
npm run test
```

### Add migration

```bash
npm run migrate
```

### Run tests and watch

```bash
npm run test:watch
```

### Find Spelling Errors

To find spelling errors just run

```bash
npm run spell
```

## General Notes

- if you are using [vscode][vscode] you can use [Prisma
  extension][prisma-extension] for autocomplete on `schema.prisma` file

[git]: https://git-scm.com/
[volta]: https://volta.sh/
[vscode]: https://code.visualstudio.com/
[prisma-extension]:
  https://marketplace.visualstudio.com/items?itemName=Prisma.prisma
