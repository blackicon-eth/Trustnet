import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { FullPageError } from "../custom-ui/fullpage-error";
import { useSignIn } from "@/lib/hooks/use-sign-in";
import { User } from "@/lib/db/schemas/db.schema";

const UserProviderContext = createContext<
  | {
      user: User | null;
    }
  | undefined
>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const useRegisteredUser = () => {
  const context = useContext(UserProviderContext);
  if (!context) {
    throw new Error("useRegisteredUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const { signIn, isLoading: isSigningIn, error: signInError } = useSignIn();

  // Try to sign in the user
  useEffect(() => {
    const registerUser = async () => {
      const signInData = await signIn();
      setUser(signInData?.user ?? null);
    };

    registerUser();
  }, [signIn]);

  // Error state
  if (!isSigningIn && signInError) {
    console.error("signInError", signInError);
    return (
      <FullPageError errorMessage={signInError || "Error Signing the user in"}>
        <button
          onClick={signIn}
          className="w-[40%] rounded-lg bg-primary text-white py-2 mt-4"
        >
          Try Again
        </button>
      </FullPageError>
    );
  }

  return (
    <UserProviderContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </UserProviderContext.Provider>
  );
};
