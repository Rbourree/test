import { MovementValidationService } from '../../domain/services/movement-validation.service';
import { Movement } from '../../domain/entities/movement.entity';
import { Reason } from "../../domain/entities/reason.entity";
import { Balance } from '../../domain/entities/balance.entity';
import { BalanceDto, MovementDto } from '../../interface/movements.dto';
import { Injectable } from '@nestjs/common';

export type ValidateMovementsUseCaseInput = {
  movements: MovementDto[];
  balances: BalanceDto[];
};

export type ValidateMovementsUseCaseOutput = {
  isValid: boolean;
  reasons: Reason[];
};

@Injectable()
export class ValidateMovementsUseCase {
  constructor(private movementValidationService: MovementValidationService) {}
  execute(data: ValidateMovementsUseCaseInput): ValidateMovementsUseCaseOutput {

    const operations = data.movements.map(
      (m) => new Movement(m.id, new Date(m.date), m.wording, m.amount)
    );
    const balances = data.balances.map(
      (b) => new Balance(new Date(b.date), b.balance)
    );
    
    const result = this.movementValidationService.validate(operations, balances);

    return {
      isValid: result.isValid,
      reasons: result.reasons
    }
  }
}
