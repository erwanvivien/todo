import {
  UserCreate,
  UserDelete,
  UserInfo,
  UserInfoSecrets,
  UserRead,
  UserReadSecrets,
  UserUpdate,
  UserUpdatePassword,
} from "./type";
import { prismaSanitize } from "../utils";

import prismaClient from "../utils";

const userSelection = {
  id: true,
  email: true,
  createdAt: true,
  name: true,
};

const userSelectionSecret = {
  passHash: true,
  passSalt: true,
};

const userCreate = async (user: UserCreate): Promise<UserInfo | null> => {
  const req = async () =>
    await prismaClient.user.create({
      data: user,
      select: userSelection,
    });

  return await prismaSanitize(req);
};

const userUpdate = async (user: UserUpdate): Promise<UserInfo | null> => {
  const req = async () =>
    await prismaClient.user.update({
      data: user,
      where: { email: user.email },
      select: userSelection,
    });
  return await prismaSanitize(req);
};

const userUpdatePassword = async (
  user: UserUpdatePassword
): Promise<UserInfo | null> => {
  const req = async () =>
    await prismaClient.user.update({
      data: user,
      where: { email: user.email },
      select: userSelection,
    });
  return await prismaSanitize(req);
};

const userRead = async (user: UserRead): Promise<UserInfo | null> => {
  /// Single Email
  if (user.email && typeof user.email === "string") {
    const req = async () =>
      await prismaClient.user.findUnique({
        where: { email: user.email },
        select: userSelection,
      });
    return prismaSanitize(req);
  }

  /// Single Id
  if (user.id && typeof user.id === "string") {
    const req = async () =>
      await prismaClient.user.findUnique({
        where: { id: user.id },
        select: userSelection,
      });
    return prismaSanitize(req);
  }

  return null;
};

const userReadSecrets = async (
  user: UserReadSecrets
): Promise<UserInfoSecrets | null> => {
  /// Single Email
  if (user.email && typeof user.email === "string") {
    const req = async () =>
      await prismaClient.user.findUnique({
        where: { email: user.email },
        select: { ...userSelection, ...userSelectionSecret },
      });
    return prismaSanitize(req);
  }

  /// Single Id
  if (user.id && typeof user.id === "string") {
    const req = async () =>
      await prismaClient.user.findUnique({
        where: { id: user.id },
        select: { ...userSelection, ...userSelectionSecret },
      });
    return prismaSanitize(req);
  }

  return null;
};

const userDelete = async (user: UserDelete): Promise<UserInfo | null> => {
  /// Single Email
  if (user.email && typeof user.email === "string") {
    const req = async () =>
      await prismaClient.user.delete({
        where: { email: user.email },
        select: userSelection,
      });
    return prismaSanitize(req);
  }

  /// Single Id
  if (user.id && typeof user.id === "string") {
    const req = async () =>
      await prismaClient.user.delete({
        where: { id: user.id },
        select: userSelection,
      });
    return prismaSanitize(req);
  }

  return null;
};

const UserRepository = {
  userCreate,
  userRead,
  userReadSecrets,
  userUpdate,
  userUpdatePassword,
  userDelete,
};

export default UserRepository;
