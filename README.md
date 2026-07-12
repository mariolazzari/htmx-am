# HTMX practical guide

## Getting started

### What is HTMX

- HTML extension
- JavaScript library
- No Javascript code
  - include library
  - use special tags
- Simplify data fetching

### Github course repository

[Source code](https://github.com/academind/htmx-course-resources)

## HTMX essentials

### Project setup

```sh
pnpm start
```

### Installing HTMX

[Docs](https://htmx.org/docs/)

```html
  <!DOCTYPE html>
    <html>
      <head>
        <title>HTMX Essentials</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"

        />
        <link rel="icon" href="/icon.png" />
        <script src="/htmx.js" defer></script>
        <link rel="stylesheet" href="/main.css" />
      </head>
      <body>
        <header id="main-header">
          <img src="/htmx-logo.jpg" alt="HTMX Logo" />
          <h1>Essentials</h1>
        </header>

        <main>
          <p>HTMX is a JavaScript library that you use without writing JavaScript code.</p>
          <button>Learn More</button>
        </main>
      </body>
    </html>
    ```
### Sending GET request

```html
<button hx-get="/info">Learn More</button>
```

### hx-swap

```html
<button hx-get="/info" hx-swap="outerHTML">Learn More</button>
```

### hx-target

```html
<button hx-get="/info" hx-target="main" hx-swap="beforeend">Learn More</button>
```
