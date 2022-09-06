import { NextApiHandler } from "next";
import ERROR_IDS from "./errors";
import {
  dataWrapper,
  errorWrapper,
  ApiResult,
  mandatoryFields,
  MIN_PASSWORD_LENGTH,
  tryReturn,
} from "./utils";

import UserService from "../../prisma/user/service";

type Body = { email: string; password: string; name: string };

const signupApi: NextApiHandler<ApiResult> = async (req, res) => {
  if (req.method !== "POST") {
    const errorJson = errorWrapper(
      ERROR_IDS.METHOD_ERROR,
      `[SignupAPI]: Wrong method (${req.method})`,
      405
    );
    return res.status(405).json(errorJson);
  }

  const missingFields = mandatoryFields(
    req.body,
    ["email", "password", "name"],
    ["string", "string", "string"]
  );
  if (missingFields.missing) {
    const errorJson = errorWrapper(
      ERROR_IDS.MISSING_FIELDS,
      `[SignupAPI]: missing fields (${missingFields.missingFields.join(", ")})`
    );
    return res.status(400).json(errorJson);
  }

  const { email, password, name }: Body = req.body;
  if (name.length === 0) {
    const errorJson = errorWrapper(
      ERROR_IDS.NAME_EMPTY,
      `[SignupAPI]: Name too short (${name.length})`
    );
    return res.status(400).json(errorJson);
  }

  if (!email.match(/.+@.+/)) {
    const errorJson = errorWrapper(
      ERROR_IDS.EMAIL_INVALID,
      `[SignupAPI]: Email invalid (${email})`
    );
    return res.status(400).json(errorJson);
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    const errorJson = errorWrapper(
      ERROR_IDS.PASSWORD_SHORT,
      `[SignupAPI]: Password too short (${password.length})`
    );
    return res.status(400).json(errorJson);
  }

  await tryReturn(res, async () => {
    const created = await UserService.userCreate(email, name, password);
    if (!created) {
      const errorJson = errorWrapper(
        ERROR_IDS.USER_EXISTS,
        `[SignupAPI]: User already exists (${email})`
      );
      return res.status(500).json(errorJson);
    }

    return res.status(200).json(dataWrapper(created));
  });
};

export default signupApi;
