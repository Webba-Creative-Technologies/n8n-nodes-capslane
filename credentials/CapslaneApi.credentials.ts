import type { IAuthenticateGeneric, ICredentialTestRequest, ICredentialType, INodeProperties, Icon } from 'n8n-workflow'

export class CapslaneApi implements ICredentialType {
  name = 'capslaneApi'
  displayName = 'Capslane API'
  icon: Icon = { light: 'file:../nodes/Capslane/capslane.svg', dark: 'file:../nodes/Capslane/capslane.dark.svg' }
  documentationUrl = 'https://capslane.com/docs'
  properties: INodeProperties[] = [
    { displayName: 'API Key', name: 'apiKey', type: 'string', typeOptions: { password: true }, default: '', required: true },
  ]
  authenticate: IAuthenticateGeneric = { type: 'generic', properties: { headers: { 'x-api-key': '={{$credentials.apiKey}}' } } }
  test: ICredentialTestRequest = { request: { baseURL: 'https://capslane.com', url: '/v1/account' } }
}
