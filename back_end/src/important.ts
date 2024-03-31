import { User } from "src/user/user.entity";
export const databaseSchemaName = 'book_manager';

export const jwtExpiresIn = '1d';
export const bcryptSaltOrRounds = 10;

export const selectColumns: (keyof User)[] = ['id', 'firstName', 'lastName', 'age', 'sex', 'nationality', 'country', 'email', 'username', 'dateSigned'];