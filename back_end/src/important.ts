import { User } from 'src/user/user.entity';
export const databaseSchemaName = 'travelers_community';

export const jwtExpiresIn = '1d';
export const bcryptSaltOrRounds = 10;

export const selectColumns: (keyof User)[] = [
  'id',
  'firstName',
  'lastName',
  'age',
  'sex',
  'nationality',
  'country',
  'email',
  'dateSigned',
  'avatarFilepath',
];
