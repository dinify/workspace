# Dinify frontend

## How to get started

```bash
git clone git@gitlab.com:tabb/frontend-web/dinify.git
yarn global lerna
lerna bootstrap
```

`lerna bootstrap` will install and link dependencies of all packages

## Available scripts
Replace `package` with one of the following: `admin, app, waiter, dash, landing, functions`  
```bash
# Start development server
yarn package:dev

# Build and deploy package to production
yarn package:deploy

# Build a package
yarn package:build

# Run tests on a package
yarn package:test

# Deploy all deployable packages
yarn deploy

# Build all packages
yarn build

# Run tests on all packages
yarn test
```

## How to push changes

```bash
git add ...
git commit ...
lerna version
```
