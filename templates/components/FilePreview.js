export function FilePreview() {
  return html`<template x-if="file">
    <div class="flex flex-col gap-3 my-4">
      <div class="flex items-center gap-1 font-semibold">
        <span class="i-tabler-file-zip -ml-5 block text-gray-900/70 w-4 h-4" />
        <span x-text="file.name" />
      </div>
      <div class="text-gray-900/70">
        File size:
        <span x-text="' ' + Number(file.size / 1000 / 1000).toFixed(2) + ' MB'" />
      </div>
      <div class="text-gray-900/70">
        Last modified: <span x-text="$formatDate(file.lastModified)" />
      </div>
    </div>
  </template>`;
}
