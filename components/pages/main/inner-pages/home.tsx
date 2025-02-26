"use client";

import { useRegisteredUser } from "@/components/providers/user-provider";
import {
  ContextType,
  useMiniAppContext,
} from "@/lib/hooks/use-miniapp-context";

export default function HomePage() {
  const { type: contextType, context, actions } = useMiniAppContext();
  const { user } = useRegisteredUser();

  const handlePresave = async () => {
    if (contextType === ContextType.Farcaster) {
      if (!context.client.added && actions) {
        await actions.addFrame();
        // add to db
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 gap-3">
      {user && (
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">
            Welcome {user.farcasterDisplayName}
          </h1>
        </div>
      )}
      <button
        onClick={handlePresave}
        className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        Presave
      </button>
    </div>
  );
}
