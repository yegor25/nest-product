

import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class TrimPipe implements PipeTransform<string> {
  transform(value: string): string {
    return value.trim()
  }
}