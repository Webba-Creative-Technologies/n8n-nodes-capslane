import type { IAuthenticateGeneric, ICredentialType, INodeProperties } from 'n8n-workflow'

export class CapslaneApi implements ICredentialType {
  name = 'capslaneApi'
  displayName = 'Capslane API'
  documentationUrl = 'https://capslane.com/docs'
  properties: INodeProperties[] = [
    { displayName: 'API Key', name: 'apiKey', type: 'string', typeOptions: { password: true }, default: '', required: true },
  ]
  authenticate: IAuthenticateGeneric = { type: 'generic', properties: { headers: { 'x-api-key': '={{$credentials.apiKey}}' } } }
}
