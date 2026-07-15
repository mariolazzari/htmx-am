# HTMX practical guide

[Github](https://github.com/academind/htmx-course-resources)

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

### hx-trigger

```html
<button hx-get="/info" hx-target="main" hx-trigger="mouseenter[ctrlkey]" hx-swap="beforeend">Learn More</button>
```

### hx-post

```html
<form hx-post="/note" hx-target="ul" hx-swap="outerHTML">
```

### hx-select

```html
<form hx-post="/note" hx-target="ul" hx-swap="outerHTML" hx-select="ul">
```

### Practice 1

```js
import express from 'express';

const courseGoals = [];

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Learn HTMX</title>
      <link rel="stylesheet" href="/main.css" />
      <script src="/htmx.js" defer></script>
    </head>
    <body>
      <main>
        <h1>Manage your course goals</h1>
        <section>
          <form id="goal-form" hx-post="/note" hx-target="#goals" hx-swap="outerHTML" hx-select="#goals">
            <div>
              <label htmlFor="goal">Goal</label>
              <input type="text" id="goal" name="goal" />
            </div>
            <button type="submit">Add goal</button>
          </form>
        </section>
        <section>
          <ul id="goals">
          ${courseGoals.map(
            (goal, index) => `
            <li id="goal-${index}">
              <span>${goal}</span>
              <button>Remove</button>
            </li>
          `
          )}
          </ul>
        </section>
      </main>
    </body>
  </html>
  `);
});

app.post("/note", (req, res) => {
  const note = req.body.goal;
  courseGoals.unshift(note)

  res.redirect("/")
})

app.listen(3000);
```

## Adcvanced concepts

### hx-delete

```html
<ul id="goals">
        ${courseGoals
        .map(
          (goal, index) => `
            <li id="goal-${index}">
              <span>${goal}</span>
              <button
                hx-delete="/goals/${index}"
                hx-target="#goal-${index}"
                hx-swap="outerHTML"
                >
                  Remove
                </button>
            </li>
          `
         )
        .join('')}
</ul>
```

### HYMX inheritance

```html
  <ul id="goals" hx-swap="outerHTML">
          ${courseGoals
            .map(
              (goal, index) => `
            <li id="goal-${index}">
              <span>${goal}</span>
              <button
                hx-delete="/goals/${index}"
                hx-target="#goal-${index}"
                >
                  Remove
                </button>
            </li>
          `
            )
            .join('')}
  </ul>
```

### Reusing fragments

```js
import express from 'express';

const courseGoals = [];

function renderListItem(id,text) {
  return   `<li id="goal-${id}">
    <span>${text}</span>
    <button
      hx-delete="/goals/${id}"
      hx-target="#goal-${id}"
      >
        Remove
      </button>
  </li>`
}

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Learn HTMX</title>
      <link rel="stylesheet" href="/main.css" />
      <script src="/htmx.js" defer></script>
    </head>
    <body>
      <main>
        <h1>Manage your course goals</h1>
        <section>
          <form
            id="goal-form"
            hx-post="/goals"
            hx-target="#goals"
            hx-swap="beforeend">
            <div>
              <label htmlFor="goal">Goal</label>
              <input type="text" id="goal" name="goal" />
            </div>
            <button type="submit">Add goal</button>
          </form>
        </section>
        <section>
          <ul id="goals" hx-swap="outerHTML">
          ${courseGoals
            .map(goal  => renderListItem(goal.id, goal.text))
            .join('')}
          </ul>
        </section>
      </main>
    </body>
  </html>
  `);
});

app.post('/goals', (req, res) => {
  const goalText = req.body.goal;
  courseGoals.push(goalText);

  const id = courseGoals.length - 1;
  res.send(renderListItem(id, goalText));
});

app.delete('/goals/:idx', (req, res) => {
  const index = req.params.idx;
  courseGoals.splice(index, 1);

  res.send();
});

app.listen(3000);
```

### Advanced targeting

[hx-target](https://htmx.org/attributes/hx-target/)

```js
import express from 'express';

const courseGoals = [];

function renderGoalListItem(id, text) {
  return `
    <li>
      <span>${text}</span>
      <button 
        hx-delete="/goals/${id}" 
        hx-target="closest li"
        >
          Remove
      </button>
    </li>
  `;
}

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Learn HTMX</title>
      <link rel="stylesheet" href="/main.css" />
      <script src="/htmx.js" defer></script>
    </head>
    <body>
      <main>
        <h1>Manage your course goals</h1>
        <section>
          <form 
            id="goal-form" 
            hx-post="/goals" 
            hx-target="#goals"
            hx-swap="beforeend">
            <div>
              <label htmlFor="goal">Goal</label>
              <input type="text" id="goal" name="goal" />
            </div>
            <button type="submit">Add goal</button>
          </form>
        </section>
        <section>
          <ul id="goals" hx-swap="outerHTML">
          ${courseGoals
            .map((goal) => renderGoalListItem(goal.id, goal.text))
            .join('')}
          </ul>
        </section>
      </main>
    </body>
  </html>
  `);
});

app.post('/goals', (req, res) => {
  const goalText = req.body.goal;
  const id = new Date().getTime().toString();
  courseGoals.push({ text: goalText, id: id });
  // res.redirect('/');
  res.send(renderGoalListItem(id, goalText));
});

app.delete('/goals/:id', (req, res) => {
  const id = req.params.id;
  const index = courseGoals.findIndex((goal) => goal.id === id);
  courseGoals.splice(index, 1);
  res.send();
});

app.listen(3000);
```

### hx-confirmation

```js
function renderGoalListItem(id, text) {
  return `
    <li>
      <span>${text}</span>
      <button
        hx-delete="/goals/${id}"
        hx-target="closest li"
        hx-confirm="Are you sure?"
        >
          Remove
      </button>
    </li>
  `;
}
```
