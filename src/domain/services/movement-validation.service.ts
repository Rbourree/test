import { Movement } from '../entities/movement.entity';
import { Balance } from '../entities/balance.entity';
import { Reason, MismatchReason, DuplicatedReason } from "../entities/reason.entity";
export class MovementValidationService {
  validate(operations: Movement[], balances: Balance[]): { isValid: boolean; reasons?: Reason[] } {
    const reasons: Reason[] = [];

    const sortedOperations = this.sortByDate(operations);

    const mismatchpoint = this.checkBalance(balances, sortedOperations);
    if (mismatchpoint.length > 0) {
      mismatchpoint.forEach(point => {
        reasons.push(new MismatchReason(point.date, point.balance));
      });
    }

    // Check duplicated operations
    const duplicateOperations = this.getDuplicateOperations(operations);
    if (duplicateOperations.length > 0) {
      duplicateOperations.forEach(dup => {
        reasons.push(new DuplicatedReason(dup.id, dup.wording, dup.date));
      });
      
    }

    return { isValid: reasons.length === 0, reasons: reasons.length > 0 ? reasons : undefined };
  }

  sortByDate(operations: Movement[]): Movement[] {
    return operations.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  checkBalance(balances: Balance[], movements: Movement[]): Balance[] {
    const mismatchPoints: Balance[] = [];

    balances.forEach((balancePoint) => {
      const cumulativeBalance = movements
        .filter((op) => op.date <= balancePoint.date)
        .reduce((sum, op) => sum + op.amount, 0);

        
      if (cumulativeBalance !== balancePoint.balance) { 
        console.log(movements, balancePoint);
        mismatchPoints.push(balancePoint);
      }
    });

    return mismatchPoints
  }

  getDuplicateOperations(operations: Movement[]): Movement[] {
    return operations.filter(
      (op, index, self) => self.findIndex((o) => o.amount+o.wording+o.date === op.amount+op.wording+op.date ) !== index
    );
  }
}
