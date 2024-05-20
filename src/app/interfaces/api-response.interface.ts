export interface IApiResponse<T> {
  'result': T,
  'targetUrl': string,
  'success': boolean,
  'error': string,
  'unAuthorizedRequest': boolean,
  '__abp': boolean,
}
