/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodObject } from 'zod'
import { BadRequestException, PipeTransform } from '@nestjs/common'

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodObject<any>) {}

  transform(value: unknown) {
    try {
      this.schema.parse(value)
    } catch (error) {
      throw new BadRequestException('Validation failed')
    }

    return value
  }
}
