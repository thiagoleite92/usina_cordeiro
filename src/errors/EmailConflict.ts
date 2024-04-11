export class EmailConflictError extends Error {
  constructor() {
    super('E-mail já cadastrado');
  }
}
