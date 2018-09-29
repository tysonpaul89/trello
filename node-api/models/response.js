module.exports = class Response {
  constructor (
    responseObj = null
  ) {
    this.responseObj = responseObj
    this.statusCode = 200
    this._body = {
      data: null,
      message: null,
      error: null
    }
  }

  /**
   * Send HTTP JSON response
   */
  send () {
    this.responseObj.status(this.statusCode).json(this._body)
  }

  set status (value) {
    this.statusCode = value
  }

  set message (value) {
    this._body.message = value
  }

  set data (value) {
    this._body.data = value
  }

  set error (value) {
    this._body.error = value
  }
}
