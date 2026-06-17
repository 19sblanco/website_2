---
name: new-portfolio-project
description: Adds a new portfolio project card to the landing page with logo asset and click analytics. Use when the user asks to add a new portfolio project, project card, showcase item, or similar ("new portfolio project", "add project", "new project card").
---

# New Portfolio Project

End-to-end workflow for adding a project to the landing page. Projects are **frontend-only** — no new routes or backend changes are required.

## Architecture

| Piece         | Location                                                                        |
| ------------- | ------------------------------------------------------------------------------- |
| Project cards | `src/frontend/src/LandingPage.jsx` — `ProjectCard` component + `#projects` grid |
| Styles        | `src/frontend/src/landingPage.css` — `.projects-grid`, `.project-card`          |
| Logo assets   | `src/frontend/src/assets/` — imported in `LandingPage.jsx`                      |
| Analytics     | `src/frontend/src/traffic.js` — `logEventThenNavigate`                          |
| Routes        | `src/frontend/src/App.jsx` — only `/` and `/about`; project links are external  |

The `clicked_project` event is already seeded in the backend (`MyDbContext`). `ProjectCard` passes `cardName` as the event `detail` — no backend work for new projects.

## Workflow

```
Task Progress:
- [ ] Step 1: Add logo asset
- [ ] Step 2: Add ProjectCard to LandingPage
- [ ] Step 3: Verify analytics wiring
- [ ] Step 4: Run verification
```

### Step 1: Add logo asset

1. Place image in `src/frontend/src/assets/` (png, jpg, jpeg, or svg).
2. Use a descriptive filename (e.g. `myProjectLogo.png`).
3. Prefer reasonable dimensions; existing logos vary in size.

### Step 2: Add ProjectCard

In `src/frontend/src/LandingPage.jsx`:

1. **Import** the asset near other project logo imports:

```jsx
import myProjectLogo from "./assets/myProjectLogo.png";
```

2. **Add** a `<ProjectCard>` inside `.projects-grid` (before the "For more projects" paragraph):

```jsx
<ProjectCard
  cardName="My Project"
  description="Short description of the project."
  link="https://example.com"
  logo={myProjectLogo}
  onProjectClick={handleTrackedClick}
/>
```

| Prop             | Notes                                          |
| ---------------- | ---------------------------------------------- |
| `cardName`       | Display title; also sent as analytics `detail` |
| `description`    | Shown on card; keep concise                    |
| `link`           | External URL (opens in new tab)                |
| `logo`           | Imported asset variable                        |
| `onProjectClick` | Always `handleTrackedClick`                    |

**Grid layout:** 6-column grid, each card spans 2 columns (3 per row). CSS handles centering for incomplete last rows — no CSS changes needed for most additions.

### Step 3: Analytics

Analytics is wired automatically when `onProjectClick={handleTrackedClick}` is set. `ProjectCard` calls:

```jsx
onProjectClick?.(event, "clicked_project", cardName, () =>
  window.open(link, "_blank", "noopener,noreferrer"),
);
```

`handleTrackedClick` → `logEventThenNavigate` in `traffic.js` posts to `/api/web/event` with `{ event: "clicked_project", detail: cardName }`.

**Do not** add a new event type unless the product requires a distinct analytics event.

### Step 4: Verify

```bash
make verify-frontend   # format, lint, build
```

Manually: `make frontend`, open `http://localhost:5173`, confirm card renders and click opens the link.

## Checklist

- [ ] Logo in `src/frontend/src/assets/`
- [ ] Import + `<ProjectCard>` in `LandingPage.jsx`
- [ ] `onProjectClick={handleTrackedClick}` present
- [ ] `make verify-frontend` passes
