import { copyFile, mkdir } from 'node:fs/promises'

await mkdir(new URL('../dist/nodes/Capslane/', import.meta.url), { recursive: true })
await copyFile(new URL('../nodes/Capslane/capslane.svg', import.meta.url), new URL('../dist/nodes/Capslane/capslane.svg', import.meta.url))
