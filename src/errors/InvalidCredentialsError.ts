export class InvalidCredentialsError extends Error {
  constructor() {
    super('Credenciais não conferem');
  }
}
