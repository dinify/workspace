# Dinify frontend

## How to get started

```bash
git clone git@gitlab.com:tabb/frontend-web/dinify.git
yarn global lerna
lerna bootstrap
```

`lerna bootstrap` will install and link dependencies of all packages

## How to push changes

```bash
git add ...
git commit ...
lerna version
```

To run user app locally:
```bash
yarn app:dev
```

To run dashboard locally:
```bash
yarn dash:dev
```