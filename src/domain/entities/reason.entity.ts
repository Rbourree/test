export class Reason {
  type: string;
  details: string;
}  


export class DuplicatedReason extends Reason {
  constructor(id, wording, date){
    super()
    this.type = "duplicate_operations";
    this.details = `Duplicate operations detected: for ID ${id}, ${wording} at ${date.toISOString()}`
  }
}

export class MismatchReason extends Reason {
  constructor(date, balance){
    super()
    this.type = "balance_mismatch";
    this.details = `Balance mismatch on ${date.toISOString()}: expected ${balance}`
  }
}