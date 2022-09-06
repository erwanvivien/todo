import { User } from "@prisma/client";

type UserCreate = Omit<User, "createdAt" | "id" | "updatedAt">;
type UserRead = { id: string; email?: never } | { id?: never; email: string };
type UserReadSecrets = UserRead;
type UserUpdate = Partial<Pick<UserCreate, "name">> & { email: string };
type UserUpdatePassword = Partial<Pick<UserCreate, "passHash" | "passSalt">> & {
  email: string;
};
type UserDelete = UserRead;

type UserInfo = Pick<User, "email" | "createdAt" | "name" | "id">;
type UserInfoSecrets = Omit<User, "updatedAt">;

export type {
  // Return types
  UserInfo,
  UserInfoSecrets,
  // Query types
  UserCreate,
  UserRead,
  UserReadSecrets,
  UserUpdate,
  UserUpdatePassword,
  UserDelete,
};
