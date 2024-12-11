import { Module } from '@nestjs/common';
import { MovementsController } from './interface/controllers/movements.controller';
import { ValidateMovementsUseCase } from './application/use-case/validate-movements.use-case';
import { MovementValidationService } from './domain/services/movement-validation.service';
@Module({
  imports: [],
  controllers: [MovementsController],
  providers: [MovementValidationService, ValidateMovementsUseCase],
})
export class AppModule {}
