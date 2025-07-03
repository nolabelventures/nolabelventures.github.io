# Refactoring Tasks for Website Navigation

This document outlines the plan to refactor the JavaScript-based section navigation for improved readability, maintainability, and robustness.

## 1. Encapsulate Logic into a `SectionNavigator` Class

- **Goal:** Move all navigation-related state and logic from the global scope into a dedicated class.
- **State to include:**
  - `sections`: The array of section elements.
  - `currentIndex`: The index of the currently active section.
  - `isAnimating`: A boolean flag to prevent overlapping transitions.
- **Benefits:**
  - Reduces global scope pollution.
  - Makes the code self-contained and easier to understand.
  - Improves reusability.

## 2. Decompose the `gotoPanel` Monolith

- **Goal:** Break down the large `gotoPanel` function into smaller, single-responsibility methods.
- **Proposed Methods:**
  - `_createTransition(fromSection, toSection, direction)`: Manages the GSAP animation timeline for transitioning between sections.
  - `_updateNavigationUI(newIndex)`: Handles updating the visual state of navigation links (e.g., adding/removing `active` classes).
  - `_updateTheme(newSection)`: Changes the page theme (e.g., background and text colors) based on the new section's attributes.
  - `_handleEdgeCases(newSection)`: Manages special logic, such as enabling/disabling scroll lock for the portfolio section.
- **Benefits:**
  - Improves code readability and maintainability.
  - Simplifies debugging by isolating logic.

## 3. Implement a Data-Driven Approach

- **Goal:** Move hardcoded logic based on section indices to a more declarative, data-driven system using `data-*` attributes in the HTML.
- **Example:**
  ```html
  <!-- Before -->
  <section id="portfolio" class="portfolio"></section>

  <!-- After -->
  <section id="portfolio" data-nav-theme="dark" data-scroll-lock="true"></section>
  ```
- **JavaScript Changes:** The `SectionNavigator` class will read these attributes to determine behavior, eliminating the need for `if (index === 5)` style checks.
- **Benefits:**
  - Decouples the JavaScript from the specific order and number of sections.
  - Makes it easier for developers to add, remove, or reorder sections without breaking the navigation logic.

## 4. Simplify State Management

- **Goal:** Consolidate multiple state-tracking flags (`animating`, `hasExited`, etc.) into a single, more robust state property within the `SectionNavigator` class.
- **Implementation:** A single `this.isAnimating` flag will be used to control the flow of navigation events and prevent conflicts.
- **Benefits:**
  - Simplifies the logic for handling transitions.
  - Reduces the chance of race conditions and state-related bugs.
