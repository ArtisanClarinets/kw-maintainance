
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/../content/site";

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header />
      <main className="flex-1 py-12 container-custom px-4">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <div className="prose max-w-3xl text-muted-fg">
          <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          <p className="mb-4">
            Please read these Terms of Service carefully before using our website or services operated by {siteConfig.name}.
          </p>
          <h2 className="text-xl font-semibold text-fg mt-6 mb-2">Agreement to Terms</h2>
          <p className="mb-4">
            By accessing or using our service, you agree to be bound by these terms. If you disagree with any part of the terms, you may not access the service.
          </p>
          <h2 className="text-xl font-semibold text-fg mt-6 mb-2">Services</h2>
          <p className="mb-4">
            We provide hospitality and maintenance services as described on our website. We reserve the right to refuse service to anyone for any reason at any time.
          </p>
          <h2 className="text-xl font-semibold text-fg mt-6 mb-2">Governing Law</h2>
          <p>
            These terms shall be governed and construed in accordance with the laws of Florida, United States, without regard to its conflict of law provisions.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
