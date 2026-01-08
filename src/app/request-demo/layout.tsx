import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a Free Quote",
  description: "Request a free quote for handyman, installation, or maintenance services in Fort Walton Beach and surrounding areas.",
};

export default function RequestDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
