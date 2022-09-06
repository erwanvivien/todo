import { NextApiRequest, NextApiResponse } from "next";
import ERROR_IDS, { ErrorId, ERROR_IDS_REV } from "./errors";

type ResData<T> = {
  status: number;
  data: T;
  success: true;
};

type ResError = {
  status: number;
  errorId: ErrorId;
  success: false;
  message: string;
};

const dataWrapper = <T>(data: T, status = 200): ResData<T> => ({
  status,
  data,
  success: true,
});

const errorWrapper =
  process.env.NODE_ENV === "production"
    ? (errorId: ErrorId, _: string, status: number = 400): ResError => {
        console.error(`[${status}][${ERROR_IDS_REV[errorId]}]: ` + _);
        return {
          status,
          errorId,
          success: false,
          message: null as any,
        };
      }
    : (errorId: ErrorId, message: string, status: number = 400): ResError => {
        console.error(`[${status}][${errorId}]: ` + message);
        return {
          status,
          errorId,
          success: false,
          message,
        };
      };

type MandatoryFields = <T>(
  obj: { [key: string]: any },
  fields: string[],
  types: (
    | "string"
    | "number"
    | "bigint"
    | "boolean"
    | "symbol"
    | "undefined"
    | "object"
    | "function"
  )[]
) => { missing: boolean; missingFields: string[]; message: string };

const mandatoryFields: MandatoryFields = (obj, fields, types) => {
  const missing = [];
  if (fields.length !== types.length) {
    console.error(
      "[mandatoryFields]: THIS SHOULD NEVER HAPPEN: fields & types are not the same length"
    );
  }
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];

    if (obj[field] === undefined) {
      missing.push(field);
    } else if (typeof obj[field] !== types[i]) {
      missing.push(field);
    }
  }

  return {
    missing: missing.length !== 0,
    missingFields: missing,
    message:
      `Field${missing.length > 1 ? "s" : ""}` +
      " `" +
      `${missing.join("`, `")}` +
      "` " +
      `${missing.length > 1 ? "are" : "is"} missing`,
  };
};

const tryReturn = async (
  res: NextApiResponse<ApiResult>,
  callback: () => Promise<void>
) => {
  try {
    await callback();
  } catch (error) {
    console.error(error);
    const errorJson = errorWrapper(
      ERROR_IDS.BACKEND_ERROR,
      `[GetQRData]: Backend error
      
      ${error instanceof Error ? error.message : "Unknown error"}`,
      500
    );
    return res.status(500).json(errorJson);
  }
};

type ApiResult =
  | ReturnType<typeof errorWrapper>
  | ReturnType<typeof dataWrapper>;

const MIN_PASSWORD_LENGTH = 8;

export { dataWrapper, errorWrapper, mandatoryFields, tryReturn };
export { MIN_PASSWORD_LENGTH };

export type { ResError, ResData, ApiResult };
