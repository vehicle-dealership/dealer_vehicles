import { ButtonHTMLAttributes, ReactNode } from "react";

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  btnSize: string;
  btnColor: string;
  attributes?: string;
  handleClick?: () => void;
  type?: "button" | "submit";
}

export const Button = ({
  children,
  btnSize,
  btnColor,
  attributes,
  type,
  handleClick,
}: BtnProps) => {
  return (
    <button
      type={type}
      className={`${btnSize} ${btnColor} ${attributes}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
