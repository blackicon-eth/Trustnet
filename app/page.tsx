import { Metadata } from "next";
import { env } from "@/lib/env";
import Main from "@/components/pages/main";

const appUrl = env.NEXT_PUBLIC_URL;

const frame = {
  version: "next",
  imageUrl: `${appUrl}/images/feed.png`,
  button: {
    title: "Launch Trustnet",
    action: {
      type: "launch_frame",
      name: "Trustnet",
      url: appUrl,
      splashImageUrl: `${appUrl}/images/splash.png`,
      splashBackgroundColor: "#f7f7f7",
    },
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Trustnet",
    openGraph: {
      title: "Trustnet",
      description: "Undercollateralized lending protocol",
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

export default function Home() {
  return <Main />;
}
