# Calculator

A clean, responsive calculator built with vanilla HTML, CSS, and JavaScript — no frameworks, no build step.

## Features

- Basic arithmetic: addition, subtraction, multiplication, division
- Chained calculations (e.g. `5 + 3 − 2 =`)
- Percent, sign toggle, delete, and clear
- Full keyboard support (numbers, `+ - * /`, `Enter`, `Backspace`, `Escape`)
- Divide-by-zero and floating-point rounding handled gracefully
- Responsive layout, visible focus states, and reduced-motion support

## Live demo

Once this is pushed to GitHub and Pages is enabled (Settings → Pages → Deploy from branch `main`), it will be live at:

`https://<your-username>.github.io/<repo-name>/`

## Running locally

No build step required — just open `index.html` in a browser:

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
open index.html
```

## File structure

```
.
├── index.html   # markup
├── style.css    # layout, theme, and responsive styles
├── script.js    # calculator logic and keyboard handling
└── README.md
```

## License

Free to use or modify for your own projects.
