export interface IAuthResp {
  success: boolean,
  expires_at?: string,
  request_token?: string,
  status_message?: string
}