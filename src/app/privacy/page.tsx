
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/../content/site";

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header />
      <main className="flex-1 py-12 container-custom px-4">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="prose max-w-3xl text-muted-fg">
          <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          <p className="mb-4">
            At {siteConfig.name}, we respect your privacy. This Privacy Policy explains how we collect, use, and protect your personal information.
          </p>
          <h2 className="text-xl font-semibold text-fg mt-6 mb-2">Information We Collect</h2>
          <p className="mb-4">
            We collect information you provide directly to us, such as when you request a quote, fill out a form, or communicate with us. This may include your name, email address, phone number, and address.
          </p>
          <h2 className="text-xl font-semibold text-fg mt-6 mb-2">How We Use Your Information</h2>
          <p className="mb-4">
            We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to comply with legal obligations.
          </p>
          <h2 className="text-xl font-semibold text-fg mt-6 mb-2">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at {siteConfig.email}.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
