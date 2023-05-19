export function DefaultLayout(props) {
  return `<!DOCTYPE html>` + html`
    <html lang="en">
      <${Head} />
      <body hx-boost="true" class="container">
        ${props.children}
      </body>
    </html>
  `;
}
