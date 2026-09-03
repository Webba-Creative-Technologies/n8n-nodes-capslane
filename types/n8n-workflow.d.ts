declare module 'n8n-workflow' {
  export type IDataObject = Record<string, unknown>
  export interface INodeExecutionData { json: IDataObject; pairedItem?: { item: number } }
  export type INodeTypeDescription = Record<string, unknown>
  export type INodeProperties = Record<string, unknown>
  export type IAuthenticateGeneric = Record<string, unknown>
  export type Icon = string | { light: string; dark: string }
  export type ICredentialTestRequest = { request: Record<string, unknown> }
  export interface ICredentialType { name: string; displayName: string; properties: INodeProperties[]; icon?: Icon; test?: ICredentialTestRequest }
  export interface INodeType { description: INodeTypeDescription; execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> }
  export interface IExecuteFunctions {
    getInputData(): INodeExecutionData[]
    getNodeParameter(name: string, itemIndex: number): unknown
    getNode(): unknown
    continueOnFail(): boolean
    helpers: {
      httpRequestWithAuthentication: {
        call(context: IExecuteFunctions, credentialType: string, options: Record<string, unknown>): Promise<unknown>
      }
    }
  }
  export const NodeConnectionTypes: { Main: 'main' }
  export function sleep(milliseconds: number): Promise<void>
  export class NodeOperationError extends Error {
    constructor(node: unknown, error: Error, options?: { itemIndex: number })
  }
}
