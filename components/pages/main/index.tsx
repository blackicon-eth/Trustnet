import { SafeAreaContainer } from "@/components/safe-area-container";
import {
  ContextType,
  useMiniAppContext,
} from "@/lib/hooks/use-miniapp-context";
import dynamic from "next/dynamic";

const MainContent = dynamic(
  () => import("@/components/pages/main/main-content"),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
);

export default function MainPage() {
  const { type: contextType, context } = useMiniAppContext();

  const insets =
    contextType === ContextType.Farcaster
      ? context.client.safeAreaInsets
      : undefined;

  return (
    <SafeAreaContainer insets={insets}>
      <MainContent />
    </SafeAreaContainer>
  );
}
