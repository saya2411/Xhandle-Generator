# XHANDLE GENERATOR

A minimalist, high-speed, zero-API username and handle generator specifically tailored for **X (Twitter)**. It synthesizes rare, obscure, and aesthetic underground handles designed to stand out from generic, taken namespaces while adhering strictly to platform constraints.

---

## 📖 Table of Contents
1. [What is Xhandle Generator?](#what-is-xhandle-generator)
2. [What is its Use?](#what-is-its-use)
3. [Core Features](#core-features)
4. [Vibe Categories & Generation Elements](#vibe-categories--generation-elements)
5. [Interface Elements & Button Actions](#interface-elements--button-actions)
6. [Keyboard Shortcuts](#keyboard-shortcuts)
7. [Architecture & Zero-API Design](#architecture--zero-api-design)
8. [Local Development & Deployment](#local-development--deployment)

---

## What is Xhandle Generator?

**Xhandle Generator** is an autonomous, client-driven web application that generates distinct, claimable, and underground usernames for X (Twitter). Rather than generating random strings, generic words, or chaotic keyboard mashing, it draws upon an underground combinatorial lexicon across four distinct subculture aesthetics:
- **Void & Noir**
- **Dark & Edgy**
- **Cyber Occult**
- **Numeric & Ciphers**

Every handle generated complies strictly with official X rules:
- **Length**: Between 4 and 15 characters.
- **Characters**: Alphanumeric only (`[a-z0-9]`).
- **Zero Underscores**: Sleek, unbroken handles with no underscores (`_`).
- **Numeric Syntax Discipline**: In the numeric category, numbers only exist in the *middle* of the handle. It **never starts with a digit** and **never ends with a digit** (regex: `^[a-z][a-z0-9]*\d[a-z0-9]*[a-z]$`).

---

## What is its Use?

Finding an available, memorable, and stylish handle on X today is notoriously difficult because millions of standard dictionary words and simple names have been taken for years. 

**Xhandle Generator solves this by:**
- Generating **over 500,000+ unique combinatorial permutations** using rare prefixes, Latinate roots, and subterranean ciphers.
- Providing an instant, one-click way to explore, evaluate, save, and claim handles.
- Working **100% offline with zero external API dependencies**, meaning no monthly subscriptions, no rate limits, no API keys, and zero loading delays.

---

## Core Features

- ⚡ **Zero-API, 100% Client-Side Engine**: Operates entirely in the browser using dynamic procedural generation. No API keys required, no external server downtime, and no rate limits.
- 🎯 **Strict X-Rule Compliance**: Handles never exceed 15 characters, never fall below 4 characters, contain no underscores, and respect alphabetical boundary constraints.
- 🗃️ **Persistent Offline Stash (Favorites)**: Save your favorite handles to your browser's `localStorage` to review, copy individually, or export all at once.
- 🔀 **Session Collision Prevention**: Active in-memory session tracking ensures clicking "Cycle Handle" serves non-repeating, fresh suggestions every time.
- ♿ **Inclusive Accessibility Suite**:
  - Text sizing multiplier (`1x`, `1.25x`, `1.5x`, `1.75x`).
  - High Contrast mode toggle (`Contrast: Normal / High`).
  - Full keyboard shortcut navigation (spacebar to cycle, single-key actions).
- 🔗 **Direct X Integration**: Direct web links to inspect profile status (`x.com/<handle>`) and pre-filled post intents (`Post to X`) without needing expensive Twitter API credentials.

---

## Vibe Categories & Generation Elements

The application organizes handles into four distinct subculture aesthetics (plus an "All" aggregate option):

| Filter | Aesthetic Style | Generation Elements & Lexicon | Example Outputs |
| :--- | :--- | :--- | :--- |
| **All Handles** | Mixed Showcase | Dynamically mixes all categories with balanced weighting (~28% numeric ciphers, ~72% words-only). | `@abyssalmirage`, `@gh0sthaven`, `@cinderwrath` |
| **Void & Noir** | Cosmic abyss, silence, gloom, nihilism | **Words only (`[a-z]`)**. Uses rare Latinate/astronomical stems (`caligo`, `oblivion`, `umbra`, `stasis`, `stygian`, `reverie`, `cadence`, `somber`). | `@voidcadence`, `@stygianlune`, `@caligoshadow` |
| **Dark & Edgy** | Visceral gothic, wrath, blades, venom | **Words only (`[a-z]`)**. Combines aggressive, dark poetic roots (`venom`, `scythe`, `reaper`, `wrath`, `blade`, `corpse`, `malice`, `cinder`). | `@venomwrath`, `@ruinreaper`, `@cinderwrath` |
| **Cyber Occult** | Cyber-mysticism, digital arcana, daemons | **Words only (`[a-z]`)**. Blends terminal and cryptographic jargon with esoteric runes (`kernel`, `syntax`, `sigil`, `matrix`, `grimoire`, `daemon`, `glitch`). | `@synapsewitch`, `@bytegrimoire`, `@necrodigital` |
| **Numeric** | Leet ciphers & internal digits | **Letters + Numbers (`[a-z0-9]`)**. Uses mid-word leet substitutions and internal numerical inserts. **Strictly starts with [a-z] and ends with [a-z]**. | `@gh0sthaven`, `@d4rk9core`, `@void07lune` |

---

## Interface Elements & Button Actions

Here is the exact behavior of every interactive button and element across the UI:

### 1. Top Bar & Navigation
* **`Stash (N)` Button**:
  - **What it does**: Opens the **Offline Stash Drawer** displaying all handles you have bookmarked, along with the total count `(N)`.
* **Font Size Buttons (`1x`, `1.25x`, `1.5x`, `1.75x`)**:
  - **What it does**: Scalable accessibility typography multiplier. Dynamically scales all text sizes across the interface without breaking the layout.
* **`Contrast` Button**:
  - **What it does**: Toggles High-Contrast Mode on and off. In high contrast mode, borders, buttons, and text are converted to pure stark white and true black for maximum legibility.
* **`Shortcuts` Button**:
  - **What it does**: Opens a modal showing the keyboard shortcut cheat-sheet.

### 2. Vibe Selector (Category Tabs)
* **`All Handles` / `Void & Noir` / `Dark & Edgy` / `Cyber Occult` / `Numeric`**:
  - **What it does**: Filters the active generation pool to that specific subculture. Immediately switches the current handle display to match the newly selected vibe.

### 3. Handle Card Display & Action Buttons
* **Handle Display Box (`@handle`)**:
  - **What it does**: Displays the current candidate in monospace bold typography along with its active category tag and character counter (`X/15 chars`). Clicking/selecting the text allows native highlighting.
* **`Copy` Button**:
  - **What it does**: Copies the handle (including the `@` prefix, e.g. `@voidcadence`) directly to your system clipboard. The button text briefly updates to **`COPIED`** to provide instant visual feedback.
* **`Save` / `Saved` Button**:
  - **What it does**: Bookmarks the active handle to your local stash. When active, it turns amber and displays **`Saved`**. Clicking it again un-saves and removes the handle from your stash.
* **`x.com/<handle>` Button**:
  - **What it does**: Opens a new browser tab directly to `https://x.com/<handle>`. This lets you immediately check if the profile exists on X or if the username page is available/unclaimed.
* **`Post to X` Button**:
  - **What it does**: Opens X's official web tweet intent with pre-filled text (`claiming @<handle>`), allowing you to announce or reserve your new handle with one click.

### 4. Primary Generation Button
* **`Cycle Handle` Button**:
  - **What it does**: Generates the next distinct handle according to your selected category.
  - **Hover-Activated Moving Cycle Animation**: When the user hovers over the button with their mouse, the text `"Cycle Handle"` is hidden and replaced by a person sitting on and actively riding a moving bicycle centered on the button with spinning wheels, pedaling posture, bouncing chassis, and riding motion.
  - **Clean Loading State**: While generating, the button cleanly displays `"Cycling..."` with zero distracting icons.
  - Automatically synthesizes rare words, stems, and ciphers through dynamic combinatorial generation.
  - Checks against previous session history so you never see the same handle repeated.

### 5. Ambient Visual Aesthetics & Dynamic Gradient Pointer
* **Dynamic Cursor-Following Gradient Glow**:
  - As the user moves their mouse around the screen, a soft radial gradient glow (purple & cobalt blur with an inner luminous core) smoothly follows the pointer.
* **Underground Ambient Geometric Shapes**:
  - Floating background elements including a rotating cyber occult ring, dashed geometric squares, stygian void ellipses, subtle matrix lines, and an authentic terminal grid matrix overlay.

### 6. Stash Drawer Actions
* **Clicking any handle in Stash**:
  - Loads that saved handle directly onto the main card display for review.
* **`Copy` (per handle)**:
  - Copies that specific saved handle to your clipboard.
* **`Delete` (per handle)**:
  - Removes that specific handle from your stash.
* **`Copy All` Button**:
  - Formats all saved handles in your stash into a clean, newline-separated list and copies them all to your clipboard at once.
* **`Clear` Button**:
  - Empties all saved handles from your stash.

---

## Keyboard Shortcuts

The entire application can be operated seamlessly without touching the mouse:

| Key | Action |
| :--- | :--- |
| **`Space`** or **`Enter`** | Cycle to the next unique underground handle |
| **`C`** | Copy current `@handle` to clipboard |
| **`S`** | Save or un-save current handle to offline stash |
| **`X`** | Open handle profile directly on `x.com` |
| **`B`** | Open / Close the offline stash drawer |
| **`Esc`** | Close any open modal or drawer |

---

## Architecture & Zero-API Design

```
src/
├── App.tsx                     # Main application layout, state & shortcut listeners
├── types.ts                    # TypeScript domain definitions (HandleItem, VibeCategory, etc.)
├── context/
│   └── AccessibilityContext.tsx # Global font-scale and high-contrast state provider
├── data/
│   └── undergroundDictionary.ts # Subterranean lexicons & combinatorial synthesis algorithm
├── utils/
│   ├── storage.ts              # LocalStorage persistence (favorites, history, pool)
│   └── logger.ts               # Clean browser console logger
└── components/
    ├── HandleCard.tsx          # Central display, copy button, X links, and save button
    ├── CycleButton.tsx         # Primary generation control button
    ├── VibeSelector.tsx        # Subculture aesthetic filter tabs
    ├── SavedStashDrawer.tsx    # Modal drawer for saved favorites with bulk export
    ├── AccessibilityBar.tsx    # Font scaler, contrast toggle, shortcuts trigger
    ├── NetworkStatusBadge.tsx  # Autonomous status indicator
    └── ShortcutsModal.tsx      # Keyboard shortcuts reference guide
```

---

## Local Development & Deployment

### Quick Start
```bash
# 1. Install dependencies
npm install

# 2. Run local development server (port 3000)
npm run dev
```

### Building for Production
```bash
npm run build
```

### Deploying to Vercel
Because Xhandle Generator is completely autonomous with zero external API keys or serverless dependencies, it deploys seamlessly to Vercel as a pure static web app:
1. Import your repository into **Vercel**.
2. Framework Preset: **Vite**.
3. Click **Deploy**.
4. The site builds in seconds with zero warnings or runtime errors.
