import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
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

test('declares the runtime supplied by the n8n host', () => {
  assert.equal(packageJson.peerDependencies['n8n-workflow'], '*')
  assert.equal(packageJson.peerDependenciesMeta?.['n8n-workflow']?.optional, true)
})

test('builds a CommonJS module for the n8n loader', () => {
  const tsconfig = JSON.parse(readFileSync(new URL('../tsconfig.json', import.meta.url), 'utf8'))
  assert.equal(packageJson.type, undefined)
  assert.equal(tsconfig.compilerOptions.module, 'CommonJS')
  assert.equal(tsconfig.compilerOptions.moduleResolution, 'Node')
})

test('uses the node wait parameter in every workflow', () => {
  const workflowFiles = [
    'sheet-row-to-transcript.json',
    'transcript-job-status.json',
    'webhook-to-transcript.json',
  ]

  for (const workflowFile of workflowFiles) {
    const workflow = JSON.parse(readFileSync(new URL(`../workflows/${workflowFile}`, import.meta.url), 'utf8'))
    const capslaneNode = workflow.nodes.find((node) => node.type === 'n8n-nodes-capslane.capslane')
    assert.ok(capslaneNode)
    assert.equal('waitForCompletion' in capslaneNode.parameters, false)
    assert.equal(typeof capslaneNode.parameters.wait, 'boolean')
  }
})
