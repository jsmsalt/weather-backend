import { HttpException, HttpStatus } from '@nestjs/common';

export class LocationNotFound extends HttpException {
  constructor() {
    super('Location Not Found', HttpStatus.NOT_FOUND);
  }
}
