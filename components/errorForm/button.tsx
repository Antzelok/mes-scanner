import Link from "next/link";
import { JSX } from "react";

const Button = (props: { label: string; link: string, className: string, icon: JSX.Element, labelClassName: string }) => {
  return (
    <Link href={props.link}>
      <button
        className={props.className}
      >
        {props.icon}
        <span className={props.labelClassName}>
          {props.label}
        </span>
      </button>
    </Link>
  );
};

export default Button;
