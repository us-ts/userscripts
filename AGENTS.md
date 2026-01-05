# AGENTS.md

This file contains guidelines and commands for agentic coding agents working in this repository.

## Project Structure

This is a monorepo with two main packages:

- `packages/usts` - Userscript TypeScript build tool
- `apps/registry` - Astro-based userscript registry app

## Build/Lint/Test Commands

### Root Level Commands

```bash
# Lint all files
bun run lint

# Format all files
bun run format
```

### Package Specific Commands

#### usts Package (`packages/usts`)

```bash
# Build the package
bun run build:cli

# Build and publish to npm
bun run -F usts npm:publish
```

#### Registry App (`apps/registry`)

```bash
# Start development server
bun run -F registry dev

# Build for production
bun run -F registry build

# Deploy to Cloudflare Workers
bun run -F registry deploy

# Generate auth schema
bun run -F registry ba:gen
```

## Code Style Guidelines

### Formatting and Linting

- **Tool**: Biome (configured in `biome.json`)
- **Indentation**: 2 spaces
- **Line endings**: LF
- **File types**: `.ts`, `.tsx`, `.astro`
- **Auto-import organization**: Enabled
- **Unused variables/imports**: Disabled in `.astro` files

### Import Conventions

- Use `import * as z from "zod"` for Zod imports
- Use `import * as path from "node:path"` for Node.js built-in modules
- Use relative imports with `~/` alias for package internal paths
- Use `bunx` for running CLI tools in scripts

### Type Conventions

- Use `zod` for schema validation and type inference
- Export types explicitly: `export type { TypeName }`
- Use `interface` for object shapes, `type` for unions/intersections
- Use readonly types where appropriate: `z.readonly(Schema)`

### Naming Conventions

- **Files**: kebab-case (e.g., `meta-header.ts`)
- **Variables**: camelCase
- **Constants**: SCREAMING_SNAKE_CASE for static values
- **Functions**: camelCase with descriptive verbs
- **Types**: PascalCase with descriptive names

### Error Handling

- Throw descriptive Error objects with emoji prefixes: `throw new Error("❌ Unexpected userscript build output")`
- Use async/await consistently
- Validate inputs with Zod schemas
- Handle file operations with proper cleanup

### Code Organization

- Group related exports together
- Separate CLI logic from core functionality
- Use consistent directory structure: `src/{cli,core,config,bin}`

### Documentation

- Use JSDoc comments for public APIs
- Include `@example` in JSDoc where helpful
- Add `@default` values in schema definitions
- Use descriptive console messages with emojis for CLI output

### Build and Bundle Configuration

- usts uses `rolldown` for bundling userscripts
- Registry uses Astro with Solid.js integration
- Output format: IIFE for userscripts
- Sourcemaps: disabled for production builds
- Minification: "dce-only" (dead code elimination)

### Environment and Config

- Use Zod schemas for environment validation
- Store config in `src/config/` with separate schema files
- Use `z.readonly()` for parsed environment variables
- Support both development and production configurations

## Testing

No dedicated test framework is currently configured. When implementing tests:

- Follow the existing file structure conventions
- Use Bun's built-in test runner

## Development Workflow

1. Make changes to source code
2. Run `bun run lint` to check code style
3. Run `bun run format` to fix formatting issues
4. Build affected packages to verify changes

## Dependencies Management

- Root package.json uses workspace catalog for shared dependencies
- Use `catalog:` reference for shared packages
- Prefer Bun as package manager and runtime
