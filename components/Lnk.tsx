import Link from "next/link";
import { AnchorHTMLAttributes, DetailedHTMLProps } from "react";

type LnkProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & {
  href: string;
};

const Lnk: React.FC<LnkProps> = (props) => (
  <Link href={props.href}>
    <a {...props} />
  </Link>
);

export default Lnk;
