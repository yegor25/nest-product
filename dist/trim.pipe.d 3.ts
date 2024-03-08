import { PipeTransform } from '@nestjs/common';
export declare class TrimPipe implements PipeTransform<any> {
    transform(value: string): string | undefined;
}
