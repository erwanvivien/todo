import { Prisma, PrismaClient } from "@prisma/client";
import { IronSessionOptions } from "iron-session";

const prismaClient = new PrismaClient();

const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: "auth-cookie",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    user: any | null;
  }
}

const prismaSanitize = async <T>(f: () => Promise<T>) => {
  try {
    return await f();
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(`Unique constraint failed on ${e.meta?.target}`);
      return null;
    } else if (e instanceof Prisma.PrismaClientInitializationError) {
      console.error(`Database is not running`);
      return null;
    } else {
      throw e;
    }
  }
};

export default prismaClient;
export { prismaSanitize, sessionOptions };
