import type { JSX } from "solid-js";
import { splitProps } from "solid-js";

type ButtonAttributes = JSX.ButtonHTMLAttributes<HTMLButtonElement>;

const baseStyles =
  `px-4 py-2 rounded-md focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer` as const;

const colors = {
  default: `bg-neutral-600 text-white enabled:hover:bg-neutral-700 focus:ring-neutral-500`,
} as const;

const variants = {
  default: "",
} as const;

type Color = keyof typeof colors;
type Variant = keyof typeof variants;

type ButtonProps = ButtonAttributes & {
  color?: Color;
  variant?: Variant;
};

function Button(props: ButtonProps) {
  const [local, rest] = splitProps(props, [
    "class",
    "color",
    "variant",
    "children",
  ]);

  return (
    <button
      class={`${baseStyles} ${colors[local.color ?? "default"]} ${
        variants[local.variant ?? "default"]
      } ${local.class ?? ""}`}
      {...rest}
    >
      {local.children}
    </button>
  );
}

export default Button;
