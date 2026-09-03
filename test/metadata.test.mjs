import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import test from 'node:test'
import packageJson from '../package.json' with { type: 'json' }

test('declares discoverable n8n metadata', () => {
  assert.equal(packageJson.name, 'n8n-nodes-capslane')
  assert.ok(packageJson.keywords.includes('n8n-community-node-package'))
  assert.equal(packageJson.n8n.nodes.length, 1)
  assert.equal(packageJson.n8n.credentials.length, 1)
  assert.ok(existsSync(new URL('../credentials/CapslaneApi.credentials.ts', import.meta.url)))
  assert.ok(existsSync(new URL('../nodes/Capslane/Capslane.node.ts', import.meta.url)))
})
