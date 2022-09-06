import { SVGProps } from "react";
import ServerProps from "../../public/icons/server-off.svg";
import LockSvg from "../../public/icons/lock-off.svg";
import FormInput from "../../public/icons/forms.svg";
import ApiMethod from "../../public/icons/api.svg";
import DatabaseError from "../../public/icons/database-off.svg";
import EmailError from "../../public/icons/at-off.svg";
import UserError from "../../public/icons/user-exclamation.svg";
import CircleCheck from "../../public/icons/circle-check.svg";

let ERROR_IDS = {
  BACKEND_ERROR: 0,

  AUTHENTICATION_ERROR: 100,
  PASSWORD_SHORT: 101,
  PASSWORD_MISMATCH: 102,
  EMAIL_INVALID: 103,
  NAME_EMPTY: 104,
  USER_EXISTS: 105,

  MISSING_FIELDS: 200,
  METHOD_ERROR: 201,
  MISSING_INFO: 202,
  MISSING_COOKIES: 203,

  EMPTY_FORM: 300,

  DATABASE_READ: 900,

  NO_ERROR: 1000,
} as const;

type ErrorKind = keyof typeof ERROR_IDS;
type ErrorId = typeof ERROR_IDS[ErrorKind];

const values = Object.values(ERROR_IDS);
const valueSet = new Set(values);

if (values.length !== valueSet.size) {
  /// Should never happen
  throw new Error("ERROR_IDS contains duplicates");
}

const ERROR_IDS_REV: { [key: string]: ErrorKind } = Object.fromEntries(
  Object.entries(ERROR_IDS).map(
    ([k, v]) => [v.toString(), k] as [string, ErrorKind]
  )
);

if (process.env.NODE_ENV === "development") {
  ERROR_IDS = Object.fromEntries(
    Object.entries(ERROR_IDS).map(([k, _]) => [k, k as any as number])
  ) as any;
}

const defaultIcon: React.FC<SVGProps<SVGSVGElement>> = () => <svg></svg>;

type IconsSVG = { [key in ErrorKind]: React.FC<SVGProps<SVGSVGElement>> };

const ERROR_ICONS_SVG: IconsSVG = {
  BACKEND_ERROR: (props) => <ServerProps {...props} />,

  AUTHENTICATION_ERROR: (props) => <LockSvg {...props} />,
  PASSWORD_SHORT: (props) => <LockSvg {...props} />,
  PASSWORD_MISMATCH: (props) => <LockSvg {...props} />,
  EMAIL_INVALID: (props) => <EmailError {...props} />,
  NAME_EMPTY: (props) => <FormInput {...props} />,
  USER_EXISTS: (props) => <UserError {...props} />,

  MISSING_FIELDS: (props) => <FormInput {...props} />,
  METHOD_ERROR: (props) => <ApiMethod {...props} />,
  MISSING_INFO: (props) => <FormInput {...props} />,
  MISSING_COOKIES: (props) => <FormInput {...props} />,

  EMPTY_FORM: (props) => <FormInput {...props} />,

  DATABASE_READ: (props) => <DatabaseError {...props} />,

  NO_ERROR: (props) => <CircleCheck {...props} />,
};

const ERROR_ICONS: {
  [key: string]: React.FC<SVGProps<SVGSVGElement>>;
} = new Proxy(ERROR_ICONS_SVG, {
  get: (target, key) => {
    switch (process.env.NODE_ENV) {
      case "development":
        if (key in target && typeof key === "string" && key in ERROR_IDS) {
          return target[key as ErrorKind];
        }
        return defaultIcon;
      case "production":
        if (key in ERROR_IDS_REV && typeof key === "string") {
          return target[ERROR_IDS_REV[key] as ErrorKind];
        }
        return defaultIcon;
    }
    return defaultIcon;
  },
});

export type { ErrorKind, ErrorId };
export { ERROR_ICONS };
export { ERROR_IDS_REV };
export default ERROR_IDS;
