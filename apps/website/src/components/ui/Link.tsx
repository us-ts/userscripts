import type { JSX } from "solid-js";
import { splitProps } from "solid-js";

type AnchorAttributes = JSX.AnchorHTMLAttributes<HTMLAnchorElement>;

const baseStyles =
  `inline-block px-4 py-2 rounded-md focus:outline-none transition-colors cursor-pointer` as const;

const colors = {
  default: `bg-neutral-600 text-white hover:bg-neutral-700 focus:ring-neutral-500`,
} as const;

const variants = {
  default: "",
} as const;

type Color = keyof typeof colors;
type Variant = keyof typeof variants;

type LinkProps = AnchorAttributes & {
  color?: Color;
  variant?: Variant;
};

function Link(props: LinkProps) {
  const [local, rest] = splitProps(props, [
    "class",
    "color",
    "variant",
    "children",
  ]);

  return (
    <a
      class={`${baseStyles} ${colors[local.color ?? "default"]} ${
        variants[local.variant ?? "default"]
      } ${local.class ?? ""}`}
      {...rest}
    >
      {local.children}
    </a>
  );
}

export default Link;
