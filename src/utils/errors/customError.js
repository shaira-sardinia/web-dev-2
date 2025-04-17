class ThrowError extends Error {
  constructor(msg = "Something went wrong", statusCode = 400, data = {}) {
    super(msg);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.data = data;
  }
}

class DatabaseError extends ThrowError {
  constructor(msg = "Something went wrong", statusCode = 500, data = {}) {
    super(msg, statusCode, data);
  }
}

class AuthenticationError extends ThrowError {
  constructor(msg = "Authentication Error") {
    super(msg, 403);
  }
}

module.exports = { ThrowError, DatabaseError, AuthenticationError };
