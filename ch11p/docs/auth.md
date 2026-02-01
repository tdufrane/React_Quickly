# Authentication System Documentation

## Overview

The app uses React Context to provide authentication state (`isLoggedIn`) to components throughout the application.

## AuthContext

### Location
`src/AuthContext.js`

### Structure
```jsx
const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});
```

### Context Value

| Property | Type | Description |
|----------|------|-------------|
| `isLoggedIn` | boolean | Current login state |
| `setIsLoggedIn` | function | Function to update login state |

## useAuth Hook

### Location
`src/hooks/useAuth.js`

### Usage
```jsx
import useAuth from "./hooks/useAuth";

function MyComponent() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  return (
    <div>
      {isLoggedIn ? "Logged in" : "Logged out"}
      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
        Toggle Login
      </button>
    </div>
  );
}
```

### Return Value
Returns the auth context value containing:
- `isLoggedIn`: boolean indicating current auth state
- `setIsLoggedIn`: function to change the auth state

## Components Using Auth

### Main.js
- Shows different welcome message based on login state
- "Welcome back!" when logged in
- "Welcome, please log in" when logged out
- Contains Login/Logout button to change auth state

### Menu.js
- Shows "Profile" link only when logged in
- Does not contain login controls (handled by Main)

## Provider Setup

The `AuthContext.Provider` is set up in `App.js` and wraps the entire application:

```jsx
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {/* App content */}
    </AuthContext.Provider>
  );
}
```

## Adding Auth to New Components

1. Import the `useAuth` hook:
   ```jsx
   import useAuth from "./hooks/useAuth";
   ```

2. Call the hook in your component:
   ```jsx
   const { isLoggedIn, setIsLoggedIn } = useAuth();
   ```

3. Use the values to conditionally render content or handle auth actions.
