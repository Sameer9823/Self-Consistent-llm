import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-grid-fade px-4">
      <SignIn
        appearance={{
          variables: { colorPrimary: "#C9A8FF", colorBackground: "#12151C" },
        }}
      />
    </div>
  );
}
