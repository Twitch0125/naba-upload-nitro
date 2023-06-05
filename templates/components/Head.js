export function Head() {
  return html`
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <link
        rel="stylesheet"
        href="/uno.css"
      />
      <script src="https://unpkg.com/htmx.org@1.9.2"></script>
      <script
      defer
      src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"
      ></script>
      <script type="module" src="/alpine-plugin.js" defer></script>
    </head>
  `;
}
