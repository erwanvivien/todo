import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiHandler } from "next";
import { sessionOptions } from "../../prisma/utils";
import ERROR_IDS from "./errors";
import { dataWrapper, errorWrapper, ApiResult, tryReturn } from "./utils";

const LogoutAPI: NextApiHandler<ApiResult> = async (req, res) => {
  if (req.method !== "POST") {
    const errorJson = errorWrapper(
      ERROR_IDS.METHOD_ERROR,
      `[LogoutAPI]: Wrong method (${req.method})`,
      405
    );
    return res.status(405).json(errorJson);
  }

  await tryReturn(res, async () => {
    req.session.destroy();
    return res.status(200).json(dataWrapper(null));
  });
};

export default withIronSessionApiRoute(LogoutAPI, sessionOptions);
