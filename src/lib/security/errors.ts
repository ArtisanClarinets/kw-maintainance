export class HTTPError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'HTTPError';
  }
}

export class UnauthorizedError extends HTTPError {
  constructor(msg = 'Unauthorized') {
    super(msg, 401);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends HTTPError {
  constructor(msg = 'Forbidden') {
    super(msg, 403);
    this.name = 'ForbiddenError';
  }
}
