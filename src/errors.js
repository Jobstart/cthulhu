import ExtendableError from 'es6-error';

class BaseError extends ExtendableError {
  constructor (message) {
    super(message);
  }
  toString () {
    return JSON.stringify({
      message: this.message,
      code: this.code
    });
  }
}

export class UrlRequiredError extends BaseError {
  constructor () {
    const message = 'body must contain "url" property of type String';
    super(message);
    this.message = message;
    this.code = 'url_required_error';
  }
}

export class ScriptRequiredError extends BaseError {
  constructor () {
    const message = 'request body must container "script" property of type String';
    super(message);
    this.message = message;
    this.code = 'script_required_error';
  }
}
