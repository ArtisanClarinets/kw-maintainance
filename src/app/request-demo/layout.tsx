import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request Operational Consultation",
  description: "Schedule a strategic assessment with our operational architects to evaluate your hospitality portfolio.",
};

export default function RequestDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
