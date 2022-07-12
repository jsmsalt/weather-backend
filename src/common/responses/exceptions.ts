import { HttpException, HttpStatus } from '@nestjs/common';

export class LocationNotFoundException extends HttpException {
  constructor() {
    super('Location Not Found', HttpStatus.NOT_FOUND);
  }
}

export class InvalidIpException extends HttpException {
  constructor() {
    super('Invalid IP', HttpStatus.BAD_REQUEST);
  }
}
