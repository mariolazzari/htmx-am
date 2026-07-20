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

### hx-on

[hx-on](https://htmx.org/attributes/hx-on/)

**hx-on** can be a useful HTMX attribute for listening to events and handling those events.

When using hx-on, you can either call some function that's stored somewhere else (e.g., in some JavaScript file) OR you can put your JS code right between the double quotes (hx-on:click="console.log('Yeah!')").

No matter which approach you use, it's worth noting that HTMX will automatically provide a variable called event which gives you access to the emitted event object.

You can then use this event object to access event data or call methods like event.preventDefault():

```html
<button hx-on:click="console.log(event)">
  Click me
</button>
```

### Events

```html
hx-on:htmx:after-request="document.querySelector('form').reset()"
hx-on::after-request="this.reset()"
```

### Disabling elements

```html
hx-disabled-elt="form button"
```

### Request values

```html
export default function renderLocation(location) {
  return `
    <li class="location-item">
      <button hx-post="/places" hx-vals='{"locationId: "${location.id}"}'>
        <img src="${`/images/${location.image.src}`}" alt="${location.image.alt}" />
        <h3>${location.title}</h3>
      </button>
    </li>
  `;
}
```

### Rendering fragments

```js
export default function renderLocation(location) {
  return `
    <li class="location-item">
      <button
        hx-post="/places"
        hx-vals='{"locationId: "${location.id}"}
        hx-target="#interesting-locations"'
        hx-swap="beforeend"
      >
        <img src="${`/images/${location.image.src}`}" alt="${location.image.alt}" />
        <h3>${location.title}</h3>
      </button>
    </li>
  `;
}
```

### Dynamic attributes on server

```js
export default function renderLocation(location, isAvailable = true) {
  let attributes;

  if (isAvailable) {
    attributes = `
      hx-post="/places"
      hx-vals='{"locationId: "${location.id}"}
      hx-target="#interesting-locations"'
      hx-swap="beforeend"
    `
  } else {
    attributes = `
      hx-delete="/places/${location.id}"
      hx-confirm="Are you sure?"
      hx-target="closest li"
      hx-swap="outerHTML"
    `
  }

  return `
    <li class="location-item">
      <button ${attributes}>
        <img src="${`/images/${location.image.src}`}" alt="${location.image.alt}" />
        <h3>${location.title}</h3>
      </button>
    </li>
  `;
}
```

### Dynamic attributes on client


```html
<script>
  const button = document.querySelector("button"); 
  button.setAttribute("hx-get", "/data");
  htmx.process(button);
</script>
```

### Out of band swap

```js
import express from 'express';

import { AVAILABLE_LOCATIONS } from './data/available-locations.js';
import renderLocationsPage from './views/index.js';
import renderLocation from './views/components/location.js';

const app = express();

const INTERESTING_LOCATIONS = [];

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  const availableLocations = AVAILABLE_LOCATIONS.filter(
    (location) => !INTERESTING_LOCATIONS.includes(location)
  );
  res.send(renderLocationsPage(availableLocations, INTERESTING_LOCATIONS));
});

app.post('/places', (req, res) => {
  const locationId = req.body.locationId;
  const location = AVAILABLE_LOCATIONS.find((loc) => loc.id === locationId);
  INTERESTING_LOCATIONS.push(location);

  const availableLocations = AVAILABLE_LOCATIONS.filter(
    (location) => !INTERESTING_LOCATIONS.includes(location)
  );

  res.send(`renderLocation(location, false)
    <ul id="available-locations" class="locations hx-swap-oob="true">
      ${availableLocations.map((location) => renderLocation(location)).join('')}
    </ul>
  `);
});

app.delete('/places/:id', (req, res) => {
  const locationId = req.params.id;
  const locationIndex = INTERESTING_LOCATIONS.findIndex(
    (loc) => loc.id === locationId
  );
  INTERESTING_LOCATIONS.splice(locationIndex, 1);

  const availableLocations = AVAILABLE_LOCATIONS.filter(
    (location) => !INTERESTING_LOCATIONS.includes(location)
  );

  res.send(`renderLocation(location, false)
    <ul id="available-locations" class="locations hx-swap-oob="true">
      ${availableLocations.map((location) => renderLocation(location)).join('')}
    </ul>
  `);
});

app.listen(3000);
```

### Scroll

```js
export default function renderLocation(location, isAvailable = true) {
  let attributes;

  if (isAvailable) {
    attributes = `
      hx-post="/places"
      hx-vals='{"locationId: "${location.id}"}
      hx-target="#interesting-locations"'
      hx-swap="beforeend show:top"
    `
  } else {
    attributes = `
      hx-delete="/places/${location.id}"
      hx-confirm="Are you sure?"
      hx-target="closest li"
      hx-swap="outerHTML show:top"
    `
  }

  return `
    <li class="location-item">
      <button ${attributes}>
        <img src="${`/images/${location.image.src}`}" alt="${location.image.alt}" />
        <h3>${location.title}</h3>
      </button>
    </li>
  `;
}
```

### main.js

```js
function showConfirmationModal(event) {
  event.preventDefault()

  document.body.insertAdjacentHTML("beforeend", confirmationModal)
  const dialog = document.querySelector("dialog")
  dialog.showModal()
}

document.querySelector("li").addEventListener("htmx:beforeRequest", showConfirmationModal)brew 
```

### Custom modal

```js
const confirmationModal = `
  <dialog class="modal">
    <div id="confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to ACTION this place?</p>
      <div id="confirmation-actions">
        <button id="action-no" className="button-text">
          No
        </button>
        <button id="action-yes" className="button">
          Yes
        </button>
      </div>
    </div>
  </dialog>
`;
```

### Element data

```js
function showConfirmationModal(event) {
  event.preventDefault();
  console.log(event);
  const action = event.detail.elt.dataset.action;
  const confirmationModal = `
    <dialog class="modal">
      <div id="confirmation">
        <h2>Are you sure?</h2>
        <p>Do you really want to ${action} this place?</p>
        <div id="confirmation-actions">
          <button id="action-no" className="button-text">
            No
          </button>
          <button id="action-yes" className="button">
            Yes
          </button>
        </div>
      </div>
    </dialog>
  `;
  document.body.insertAdjacentHTML('beforeend', confirmationModal);
  const dialog = document.querySelector('dialog');

  const noBtn = document.getElementById('action-no');
  noBtn.addEventListener('click', function() {
    dialog.remove();
  });

  const yesBtn = document.getElementById('action-yes');
  yesBtn.addEventListener('click', function() {
    event.detail.issueRequest();
    dialog.remove();
  });

  dialog.showModal();
}

document.addEventListener('htmx:confirm', showConfirmationModal);
```

###
