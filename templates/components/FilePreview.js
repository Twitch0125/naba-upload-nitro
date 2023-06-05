export function FilePreview() {
  return html`<template x-if="file">
    <div
      x-data="{dateFormatter: Intl.DateTimeFormat()}"
      class="flex flex-col gap flow-xs"
    >
      <div class="flex items-center gap-1 font-semibold">
        <span class="i-tabler-file-zip -ml-5 block text-primary/70 w-4 h-4" />
        <span x-text="file.name" />
      </div>
      <div class="text-primary/70">
        File size:
        <span
          x-text="' ' + Number(file.size / 1000 / 1000).toFixed(2) + ' MB'"
        />
      </div>
      <div class="text-primary/70">
        Last modified:
        <span x-text="' ' + dateFormatter.format(file.lastModified) + ' MB'" />
      </div>
      <button x-show="!loading" class="btn btn-primary">
        <div class="flex gap justify-center">
          <span class="i-tabler-file-upload w-5 h-5 inline-block" />
          <span>Upload</span>
        </div>
      </button>
      <button x-show="loading" disabled class="btn btn-primary bg-primary/50">
        <div class="flex gap justify-center">
          <span class="i-svg-spinners:3-dots-move w-5 h-5 inline-block" />
          <span>Uploading</span>
        </div>
      </button>
    </div>
  </template>`;
}
