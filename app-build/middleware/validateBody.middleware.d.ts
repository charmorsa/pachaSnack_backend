import { PipeTransform } from '@nestjs/common';
export declare class ValidarBodyPipe implements PipeTransform<unknown, unknown> {
    transform(value: unknown): object;
}
