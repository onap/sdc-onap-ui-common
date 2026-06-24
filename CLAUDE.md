# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

onap-ui-common is a shared UI component library for ONAP SDC (Service Design & Creation). It provides HTML templates, SCSS styles, and an SVG icon map consumed by framework-specific implementations: [onap-ui-angular](https://github.com/onap-sdc/onap-ui-angular) and [onap-ui-react](https://github.com/onap-sdc/onap-ui-react).

The library does NOT contain JavaScript logic — only HTML reference implementations, SCSS, and icons. Framework projects implement actual component behavior based on the HTML structures defined here.

## Build Commands

```bash
npm install                # Install dependencies
npm run build              # Full build (clean lib/, generate icon map, copy SCSS, compile CSS)
npm run build:icons        # Regenerate lib/icons-map.js and lib/icons-map.json from SVG files
npm run build:scss         # Compile styles/style.scss → lib/style.css
npm run build:copy-files   # Copy mixins.scss and variables.scss to lib/scss/
```

The Maven pom.xml wraps the same npm build via `frontend-maven-plugin` (installs Node 14.16.0 / npm 7.8.0 locally):

```bash
mvn clean install          # Full Maven-wrapped build
```

There are no tests — the build is the only verification step.

## Architecture

### Build Output (`lib/`)

The build produces `lib/` (gitignored) containing:
- `icons-map.js` / `icons-map.json` — generated from SVGs in `assets/sdc-icons/`
- `style.css` — compiled from all SCSS
- `scss/mixins.scss`, `scss/variables.scss` — copied for downstream use

### Component Structure (`components/`)

Each component directory contains:
- HTML files — reference implementations showing variants (e.g., `button-primary.html`, `button-primary-disabled.html`)
- `_<component>.scss` — component styles, imported by `styles/_components.scss`

Components have no JS — they define the HTML contract that Angular/React implementations must follow.

### Styles (`styles/`)

- `style.scss` → imports `_common.scss` + `_components.scss`
- `_common.scss` → normalize, variables, mixins, typography, base, icons, animation
- `_components.scss` → all component SCSS files
- `common/variables.scss` and `common/mixins.scss` are the shared tokens exported to consumers

### Icons (`assets/sdc-icons/`)

SVG icons organized by category subdirectories (common, components, resources_24, services_24, vendors_24, etc.). The build script (`utils/create-svg-icons-map.js`) reads these, strips hardcoded `fill`/`id`/`width`/`height` attributes from the root `<svg>` tag, and produces the icon map.

## Key Constraints

- No third-party UI frameworks allowed (no Bootstrap, Material, Foundation, etc.)
- Changes to HTML structure must be accompanied by corresponding changes in both onap-ui-angular and onap-ui-react
- Apache 2.0 license headers required
- Code review happens on Gerrit (`gerrit.onap.org`, project `sdc/onap-ui-common.git`); GitHub PRs are mirrored via the GitHub2Gerrit workflow
