const httpStatus = require('http-status');

class SuccessResponse {
  constructor({ message, status = httpStatus.OK, data = {}, options = {} }) {
    this.message = message;
    this.status = status;
    this.data = data;
    this.options = options;
  }

  send(res, headers = {}) {
    return res.status(this.status).json(this);
  }
}

class Ok extends SuccessResponse {
  constructor({ message, data = {}, options = {} }) {
    super({ message, data, options });
  }
}

class Create extends SuccessResponse {
  constructor({ message, data = {}, options = {} }) {
    super({ message, status: httpStatus.CREATED, data, options });
  }
}

const CREATED = (res, message, data, options = {}) => {
  new Create({
    message,
    data,
    options,
  }).send(res);
};

const OK = (res, message, data, options = {}) => {
  new Ok({
    message,
    data,
    options,
  }).send(res);
};

module.exports = {
  OK,
  CREATED,
};
