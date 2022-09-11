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

### Run in debug mode

```bash
npm run debug
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

### Run test and debug

```bash
npm run test:debug
```

### Run tests and watch

```bash
npm run test:watch
```

### Add migration or apply it on development environment

```bash
npm run migrate
```

### Find Spelling Errors

To find spelling errors just run

```bash
npm run spell
```

If you wanted to add a new word so that it won't count as spelling error, just
add it to the `configs/cspell/dictionary.txt` and separate with a new line

## General Notes

- if you are using [vscode][vscode] you can use [Prisma
  extension][prisma-extension] for autocomplete on `schema.prisma` file

[git]: https://git-scm.com/
[volta]: https://volta.sh/
[vscode]: https://code.visualstudio.com/
[prisma-extension]:
  https://marketplace.visualstudio.com/items?itemName=Prisma.prisma
