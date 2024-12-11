import { Controller, Post, Body, HttpStatus, Res } from '@nestjs/common';
import { ValidateMovementsUseCase } from '../../application/use-case/validate-movements.use-case';
import { ValidateMovementsDto } from '../movements.dto';
import { Response } from 'express';

@Controller('/movements')
export class MovementsController {
  constructor(private readonly validateMovementsUseCase: ValidateMovementsUseCase) { }

  @Post('/validation')
  validate(@Body() payload: ValidateMovementsDto, @Res() response: Response) {
    const result = this.validateMovementsUseCase.execute(payload);

    if (result.isValid) return response.status(HttpStatus.ACCEPTED).json({ message: 'Accepted' });

    return response
      .status(HttpStatus.BAD_REQUEST)
      .json({
        message: 'Validation failed',
        reasons: result.reasons,
      });
  }
}
