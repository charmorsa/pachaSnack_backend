import { BadRequestException, PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class ValidarBodyPipe implements PipeTransform<unknown, unknown> {
  transform(value: unknown) {
    if (
      !value ||
      typeof value !== 'object' ||
      Object.keys(value).length === 0
    ) {
      throw new BadRequestException('Body vacío');
    }
    return value;
  }
}
