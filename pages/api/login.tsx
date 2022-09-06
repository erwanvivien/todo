import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../prisma/utils";

import { NextApiHandler } from "next";

import UserService from "../../prisma/user/service";
import ERROR_IDS from "./errors";
import {
  dataWrapper,
  errorWrapper,
  ApiResult,
  mandatoryFields,
  tryReturn,
} from "./utils";

type Body = { email: string; password: string };

const loginApi: NextApiHandler<ApiResult> = async (req, res) => {
  if (req.method !== "POST") {
    const errorJson = errorWrapper(
      ERROR_IDS.METHOD_ERROR,
      `[LoginAPI]: Wrong method (${req.method})`,
      405
    );
    return res.status(405).json(errorJson);
  }

  const missingFields = mandatoryFields(
    req.body,
    ["email", "password"],
    ["string", "string"]
  );
  if (missingFields.missing) {
    const errorJson = errorWrapper(
      ERROR_IDS.MISSING_FIELDS,
      `[LoginAPI]: missing fields (${missingFields.missingFields.join(", ")})`
    );
    return res.status(400).json(errorJson);
  }

  const { email, password }: Body = req.body;
  const matchingPassword = await UserService.checkPassword(email, password);
  if (!matchingPassword) {
    const errorJson = errorWrapper(
      ERROR_IDS.AUTHENTICATION_ERROR,
      `[LoginAPI]: Password doesn't match (${email})`
    );
    return res.status(400).json(errorJson);
  }

  await tryReturn(res, async () => {
    const user = await UserService.userReadFromEmail(email);

    // Filling session with data
    req.session.user = user;
    await req.session.save();

    return res.status(200).json(dataWrapper(user));
  });
};

export default withIronSessionApiRoute(loginApi, sessionOptions);
