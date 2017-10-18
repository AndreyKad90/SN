export default class SafeErrorResponse {

  constructor(message = 'An error occurred', code = 400) {
    this.message = message;
    this.code = code;
  }

  static reject(msg, code) {
    return Promise.reject(new SafeErrorResponse(msg, code))
  }

}