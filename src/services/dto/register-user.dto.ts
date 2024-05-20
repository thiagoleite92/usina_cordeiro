export type RegisterUserDto = {
  name: string;
  password: string;
  email: string;
  residence: {
    bloco: string;
    apto: string;
  };
};
