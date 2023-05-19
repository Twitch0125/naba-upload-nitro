/**
 *
 * @param {{message: string}} props
 * @returns {string}
 */
export function Upload(props = {}) {
  return html`
    <${DefaultLayout}>
      <form
        x-data="{file: null}"
        action="/upload"
        method="POST"
        enctype="multipart/form-data"
      >
        ${ props.message && html`<h2>${props.message}</h2>`}
        <label
          >Upload report
          <input
            x-on:change="file = $event.target.files[0]"
            id="file"
            name="file"
            type="file"
          />
        </label>
        <${FilePreview} />
        <button>Submit</button>
      </form>
    <//>
  `;
}
