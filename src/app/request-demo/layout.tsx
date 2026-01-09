import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a Free Quote",
  description: "Get a free, no-obligation quote for your home repair or maintenance project.",
};

export default function RequestDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
