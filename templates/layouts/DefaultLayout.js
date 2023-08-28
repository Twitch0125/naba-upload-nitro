export function DefaultLayout(props) {
  return `<!DOCTYPE html>` + html`
    <html lang="en">
      <${Head} />
      <body>
        ${props.children}
      </body>
    </html>
  `;
}
