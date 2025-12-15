import type { JSX } from "solid-js";

import { authClient } from "~/lib/auth/client";

import Button from "~/components/ui/Button";

type OAuthProvider = "github" & {};

interface SignInButtonProps {
  provider: OAuthProvider;
}

const signInWith = (provider: OAuthProvider) => () => {
  return authClient.signIn.social({
    provider,
    callbackURL: `/dashboard`,
  });
};

export default function SignInButton(props: SignInButtonProps): JSX.Element {
  const providerCapitalized =
    props.provider.charAt(0).toUpperCase() + props.provider.slice(1);

  return (
    <Button onClick={signInWith(props.provider)}>
      {"Sign in with "}
      {providerCapitalized}
    </Button>
  );
}
