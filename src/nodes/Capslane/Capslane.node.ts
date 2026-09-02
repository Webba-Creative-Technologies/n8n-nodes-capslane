import type { IDataObject, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow'
import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow'

export class Capslane implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Capslane',
    name: 'capslane',
    icon: 'file:capslane.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["mode"] + " transcript"}}',
    description: 'Retrieve native or generated YouTube transcripts.',
    defaults: { name: 'Capslane' },
    inputs: [NodeConnectionTypes.Main],
    outputs: [NodeConnectionTypes.Main],
    credentials: [{ name: 'capslaneApi', required: true }],
    properties: [
      { displayName: 'YouTube URL or ID', name: 'url', type: 'string', default: '', required: true, placeholder: 'https://www.youtube.com/watch?v=...' },
      { displayName: 'Mode', name: 'mode', type: 'options', default: 'auto', options: [{ name: 'Auto', value: 'auto', description: 'Use native captions and generate only when unavailable.' }, { name: 'Native', value: 'native', description: 'Never start speech transcription.' }, { name: 'Generate', value: 'generate', description: 'Create a transcript from the video audio.' }] },
      { displayName: 'Language', name: 'lang', type: 'string', default: '', placeholder: 'en', description: 'Optional preferred language code.' },
      { displayName: 'Plain Text', name: 'text', type: 'boolean', default: false, description: 'Return one text string instead of timestamped segments.' },
      { displayName: 'Wait for Generated Transcript', name: 'wait', type: 'boolean', default: true, description: 'Wait for an accepted transcript job before continuing.' },
      { displayName: 'Polling Interval', name: 'interval', type: 'number', default: 2, typeOptions: { minValue: 1, maxValue: 30 }, displayOptions: { show: { wait: [true] } }, description: 'Number of seconds between job status requests.' },
    ],
  }

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const input = this.getInputData()
    const output: INodeExecutionData[] = []
    for (let index = 0; index < input.length; index += 1) {
      try {
        const url = this.getNodeParameter('url', index) as string
        const mode = this.getNodeParameter('mode', index) as string
        const lang = this.getNodeParameter('lang', index) as string
        const text = this.getNodeParameter('text', index) as boolean
        const wait = this.getNodeParameter('wait', index) as boolean
        const query: Record<string, string | boolean> = { url, mode, text }
        if (lang.trim()) query.lang = lang.trim()
        let result = await this.helpers.httpRequestWithAuthentication.call(this, 'capslaneApi', { method: 'GET', url: 'https://capslane.com/v1/transcript', qs: query, json: true, timeout: 20_000 }) as IDataObject

        if (wait && typeof result.jobId === 'string') {
          const interval = (this.getNodeParameter('interval', index) as number) * 1000
          const deadline = Date.now() + 20 * 60_000
          while (Date.now() < deadline && !('content' in result)) {
            await new Promise((resolve) => setTimeout(resolve, interval))
            result = await this.helpers.httpRequestWithAuthentication.call(this, 'capslaneApi', { method: 'GET', url: `https://capslane.com/v1/transcript/${encodeURIComponent(String(result.jobId))}`, json: true, timeout: 20_000 }) as IDataObject
            if (result.status === 'failed' || result.status === 'cancelled') throw new Error(`Transcript job ${String(result.status)}`)
          }
          if (!('content' in result)) throw new Error('Transcript job deadline exceeded')
        }

        output.push({ json: result, pairedItem: { item: index } })
      } catch (error) {
        if (this.continueOnFail()) {
          output.push({ json: { error: error instanceof Error ? error.message : 'Capslane request failed' }, pairedItem: { item: index } })
          continue
        }
        throw new NodeOperationError(this.getNode(), error as Error, { itemIndex: index })
      }
    }
    return [output]
  }
}
