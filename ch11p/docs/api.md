# Links API Documentation

## Overview

This API provides navigation link data for the application menu.

## Endpoint

### GET /api/links.json

Returns the list of navigation links.

**URL:** `/api/links.json`

**Method:** `GET`

**Response Format:** JSON

### Response Structure

```json
{
  "links": [
    {
      "title": "string",
      "href": "string",
      "icon": "string"
    }
  ]
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `links` | array | Array of link objects |
| `links[].title` | string | Display text for the link |
| `links[].href` | string | URL path for the link |
| `links[].icon` | string | Icon identifier (corresponds to SVG files in `/icons/`) |

### Example Response

```json
{
  "links": [
    { "title": "Home", "href": "/", "icon": "home" },
    { "title": "Services", "href": "/services", "icon": "services" },
    { "title": "Pricing", "href": "/pricing", "icon": "pricing" },
    { "title": "Blog", "href": "/blog", "icon": "blog" }
  ]
}
```

## Usage in React

Use the `useLinks` custom hook to fetch and consume the links data:

```jsx
import useLinks from "./hooks/useLinks";

function MyComponent() {
  const { links, loading, error } = useLinks();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {links.map((link) => (
        <li key={link.href}>
          <a href={link.href}>{link.title}</a>
        </li>
      ))}
    </ul>
  );
}
```

## Adding New Links

To add a new navigation link, edit `public/api/links.json` and add a new object to the `links` array:

```json
{ "title": "Contact", "href": "/contact", "icon": "contact" }
```

Ensure a corresponding icon SVG exists at `public/icons/{icon}.svg`.
