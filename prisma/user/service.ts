import crypto from "crypto";
import UserRepository from "./repository";
import { UserUpdate } from "./type";

const ITERATIONS = 1000;
const HASH_LENGTH = 64;

const checkPassword = async (email: string, password: string) => {
  const userWithSecrets = await UserRepository.userReadSecrets({ email });
  if (!userWithSecrets) {
    return false;
  }

  const hash = crypto
    .pbkdf2Sync(password, userWithSecrets.passSalt, ITERATIONS, 64, "sha512")
    .toString("hex");

  if (hash !== userWithSecrets.passHash) {
    return false;
  }

  return true;
};

const userCreate = async (email: string, name: string, password: string) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, ITERATIONS, HASH_LENGTH, "sha512")
    .toString("hex");

  const created = await UserRepository.userCreate({
    email,
    name,
    passHash: hash,
    passSalt: salt,
  });

  return created;
};

const userReadFromEmail = (email: string) => {
  return UserRepository.userRead({ email });
};

const userReadFromId = (id: string) => {
  return UserRepository.userRead({ id });
};

const userReadSecretsFromEmail = (email: string) => {
  return UserRepository.userReadSecrets({ email });
};

const userReadSecretsFromId = (id: string) => {
  return UserRepository.userReadSecrets({ id });
};

const userUpdate = (email: string, data: Omit<UserUpdate, "email">) => {
  return UserRepository.userUpdate({ email, ...data });
};

const userUpdatePassword = (email: string, password: string) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, ITERATIONS, HASH_LENGTH, "sha512")
    .toString("hex");

  const data = { passSalt: salt, passHash: hash };
  return UserRepository.userUpdate({ email, ...data });
};

const userDeleteFromEmail = (email: string) => {
  return UserRepository.userDelete({ email });
};

const userDeleteFromId = (id: string) => {
  return UserRepository.userDelete({ id });
};

const UserService = {
  checkPassword,
  userCreate,
  userReadFromEmail,
  userReadSecretsFromEmail,
  userReadFromId,
  userReadSecretsFromId,
  userUpdate,
  userUpdatePassword,
  userDeleteFromEmail,
  userDeleteFromId,
};

export default UserService;
