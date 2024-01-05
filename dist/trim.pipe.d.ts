import { PipeTransform } from '@nestjs/common';
export declare class TrimPipe implements PipeTransform<string> {
    transform(value: string): string;
}
