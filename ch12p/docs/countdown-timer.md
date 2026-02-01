# Countdown Timer Application

## Overview
A fully accessible, performant countdown timer application built with React. Supports multiple independent timers with a modern purple theme.

## Project Structure

```
ch12p/
├── src/
│   ├── components/
│   │   └── CountdownTimer.js   # Timer component with accessibility
│   ├── hooks/
│   │   └── useCountdown.js     # Custom countdown hook
│   ├── App.js                  # Main app with timer management
│   └── index.css               # All styles (purple theme)
└── docs/
    └── countdown-timer.md      # This documentation
```

## Features

### Core Functionality
- Add unlimited timers with "+ Add Timer" button
- Each timer runs independently
- Remove individual timers without affecting others
- MM:SS time display format
- Start/Pause/Reset controls per timer
- "Time's up!" message when complete
- Input changes immediately reflect in timer display
- Empty state message when no timers exist

### Styling
- Purple theme (`#6b21a8` background, `#7c3aed` timer containers)
- White text for contrast
- Rounded corners and modern UI
- Hover states on all interactive elements
- Disabled button styling
- All styles in external CSS (no inline styles)

## Performance Optimizations

### useCountdown Hook
- `useRef` for interval reference (avoids stale closures)
- `useCallback` for memoized `start`, `pause`, `reset` functions
- Removed `timeLeft` from useEffect dependencies (uses functional updates)
- Proper cleanup on unmount

### CountdownTimer Component
- `React.memo` wrapper prevents unnecessary re-renders
- `formatTime` moved outside component (pure function)
- `useCallback` for all event handlers (`handleInputChange`, `handleRemove`, `handleReset`)

### App.js
- `useCallback` for `addTimer` and `removeTimer`
- Functional state updates for proper batching

## W3C/WCAG Accessibility Compliance

### Semantic HTML
- `<article>` for each timer container
- `<header>` for timer and app headers
- `<main>` landmark for main content
- `<section>` for timers list

### ARIA Attributes
- `aria-labelledby` on timer articles linking to headings
- `aria-label` on all buttons for screen reader context
- `role="timer"` with `aria-live="polite"` for time display
- `role="alert"` with `aria-live="assertive"` for completion message
- `aria-describedby` linking input to timer display
- `role="group"` for button controls

### Form Accessibility
- Proper `<label>` elements with `htmlFor` attribute
- Unique `id` and `name` attributes on inputs
- `type="button"` on all buttons

### Keyboard Navigation
- Skip link to main content
- Visible focus indicators (3px yellow outline)
- All interactive elements keyboard accessible

### Screen Reader Support
- `.visually-hidden` class for screen reader only text
- "Time remaining:" prefix for timer display
- Descriptive button labels (e.g., "Start Timer 1", "Remove Timer 2")

## CSS Classes

| Class | Description |
|-------|-------------|
| `.App` | Main application container |
| `.timer` | Timer article container |
| `.timer-header` | Timer header with title and remove button |
| `.timer-display` | Large time display (MM:SS) |
| `.timer-complete` | "Time's up!" message |
| `.timer-input` | Seconds input field |
| `.timer-button` | Start/Pause/Reset buttons |
| `.timer-remove-button` | Red remove button |
| `.visually-hidden` | Screen reader only content |
| `.skip-link` | Skip to main content link |

## Hook API

### useCountdown(initialSeconds)

**Parameters:**
- `initialSeconds` - Initial countdown value in seconds

**Returns:**
| Property | Type | Description |
|----------|------|-------------|
| `timeLeft` | number | Seconds remaining |
| `isRunning` | boolean | Timer is active |
| `isComplete` | boolean | Timer reached zero |
| `start()` | function | Start the countdown |
| `pause()` | function | Pause the countdown |
| `reset(seconds)` | function | Reset to specified seconds |

## Component Props

### CountdownTimer

| Prop | Type | Description |
|------|------|-------------|
| `id` | number | Unique timer identifier |
| `onRemove` | function | Callback when remove is clicked |

## Verification

1. Run `npm start` in ch12p
2. Click "Add Timer" - new timer appears
3. Start multiple timers - each runs independently
4. Change input value - timer display updates immediately
5. Click Pause - timer stops
6. Click Reset - timer resets to input value
7. Timer reaches 0 - shows "Time's up!"
8. Click Remove - only that timer is removed
9. Remove all timers - empty state message appears

### Accessibility Testing
1. Tab through all elements - focus visible on each
2. Press Tab on page load - skip link appears
3. Use screen reader - all elements properly announced
4. Check color contrast - meets WCAG AA standards
