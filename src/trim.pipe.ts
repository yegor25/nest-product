

import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class TrimPipe implements PipeTransform<any> {
  transform(value: string) {
  if(typeof value === "string")  return value.trim()
  }
}