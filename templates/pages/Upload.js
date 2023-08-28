/**
 *
 * @param {{message: string}} props
 * @returns {string}
 */
export function Upload(props = { message: "" }) {
  return html`
    <${DefaultLayout}>
      <form
        name="upload"
        class="stack"
        method="POST"
        enctype="multipart/form-data"
      >
        <div class="stack">
          <h1>Upload the zip file here.</h1>
          <p>It might take several minutes</p>
          <label>
            File
            <input required name="file" type="file" />
            <div id="file_preview"></div>
          </label>
        </div>
        <button name="upload_button" class="fit-content">Upload</button>
        <div>${props.message && html`<p>${props.message}</p>`}</div>
        <a href="/">Go home</a>
      </form>
    <//>
  `;
}
