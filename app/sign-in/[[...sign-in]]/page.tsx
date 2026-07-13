import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink bg-grid-fade px-4">
      <SignIn
        appearance={{
          baseTheme: dark,
          variables: {
            colorPrimary: "#C9A8FF",
            colorBackground: "#12151C",
            colorInputBackground: "#0B0E14",
            colorInputText: "#ECEEF2",
            colorText: "#ECEEF2",
            colorTextSecondary: "#8A8FA3",
            colorNeutral: "#8A8FA3",
            borderRadius: "0.85rem",
          },
          elements: {
            card: "border border-ink-line shadow-xl",
            headerTitle: "font-display",
            socialButtonsBlockButton: "border border-ink-line",
            footerActionLink: "text-synth hover:text-synth/80",
          },
        }}
      />
    </div>
  );
}