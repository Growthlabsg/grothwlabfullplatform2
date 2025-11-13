#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

console.log('🔧 Updating TypeScript and Dependencies');
console.log('======================================\n');

// Read current package.json
const packageJsonPath = 'package.json';
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

console.log('📦 Current TypeScript version:', packageJson.devDependencies.typescript);
console.log('📦 Current React version:', packageJson.dependencies.react);
console.log('📦 Current Next.js version:', packageJson.dependencies.next);

// Update TypeScript and related dependencies
console.log('\n🔧 Updating TypeScript and related packages...');

try {
  // Update TypeScript to latest version
  execSync('npm install --save-dev typescript@latest', { stdio: 'inherit' });
  
  // Update React types
  execSync('npm install --save-dev @types/react@latest @types/react-dom@latest', { stdio: 'inherit' });
  
  // Update Node types
  execSync('npm install --save-dev @types/node@latest', { stdio: 'inherit' });
  
  // Update ESLint and related packages
  execSync('npm install --save-dev eslint@latest eslint-config-next@latest', { stdio: 'inherit' });
  
  // Update Jest types
  execSync('npm install --save-dev @types/jest@latest', { stdio: 'inherit' });
  
  console.log('\n✅ Successfully updated TypeScript and related dependencies!');
  
} catch (error) {
  console.error('\n❌ Error updating dependencies:', error.message);
  process.exit(1);
}

// Read updated package.json
const updatedPackageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

console.log('\n📦 Updated TypeScript version:', updatedPackageJson.devDependencies.typescript);
console.log('📦 Updated React types version:', updatedPackageJson.devDependencies['@types/react']);
console.log('📦 Updated Node types version:', updatedPackageJson.devDependencies['@types/node']);

// Update tsconfig.json for better compatibility
console.log('\n🔧 Updating TypeScript configuration...');

const tsconfigPath = 'tsconfig.json';
if (fs.existsSync(tsconfigPath)) {
  const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
  
  // Update compiler options for better compatibility
  tsconfig.compilerOptions = {
    ...tsconfig.compilerOptions,
    target: "ES2022",
    lib: ["dom", "dom.iterable", "es6"],
    allowJs: true,
    skipLibCheck: true,
    strict: true,
    noEmit: true,
    esModuleInterop: true,
    module: "esnext",
    moduleResolution: "bundler",
    resolveJsonModule: true,
    isolatedModules: true,
    jsx: "preserve",
    incremental: true,
    plugins: [
      {
        name: "next"
      }
    ],
    paths: {
      "@/*": ["./*"]
    }
  };
  
  // Add include and exclude patterns
  tsconfig.include = [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ];
  
  tsconfig.exclude = [
    "node_modules"
  ];
  
  fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
  console.log('✅ Updated tsconfig.json for better compatibility');
}

// Create a modern TypeScript configuration for better type checking
const modernTsconfigPath = 'tsconfig.modern.json';
const modernTsconfig = {
  extends: "./tsconfig.json",
  compilerOptions: {
    strict: true,
    noImplicitAny: true,
    strictNullChecks: true,
    strictFunctionTypes: true,
    strictBindCallApply: true,
    strictPropertyInitialization: true,
    noImplicitThis: true,
    alwaysStrict: true,
    noUnusedLocals: true,
    noUnusedParameters: true,
    exactOptionalPropertyTypes: true,
    noImplicitReturns: true,
    noFallthroughCasesInSwitch: true,
    noUncheckedIndexedAccess: true,
    noImplicitOverride: true,
    allowUnusedLabels: false,
    allowUnreachableCode: false
  }
};

fs.writeFileSync(modernTsconfigPath, JSON.stringify(modernTsconfig, null, 2));
console.log('✅ Created modern TypeScript configuration');

// Update package.json scripts
console.log('\n🔧 Updating package.json scripts...');

updatedPackageJson.scripts = {
  ...updatedPackageJson.scripts,
  "type-check": "tsc --noEmit",
  "type-check:strict": "tsc --noEmit --project tsconfig.modern.json",
  "lint": "next lint",
  "lint:fix": "next lint --fix",
  "build": "next build",
  "dev": "next dev",
  "start": "next start",
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage"
};

fs.writeFileSync(packageJsonPath, JSON.stringify(updatedPackageJson, null, 2));
console.log('✅ Updated package.json scripts');

console.log('\n🎉 TypeScript update completed successfully!');
console.log('\n📋 Next Steps:');
console.log('1. Run: npm run type-check (to verify TypeScript compilation)');
console.log('2. Run: npm run type-check:strict (for strict type checking)');
console.log('3. Run: npm run lint (to check for any new linting issues)');
console.log('4. Test the application to ensure everything works correctly');
