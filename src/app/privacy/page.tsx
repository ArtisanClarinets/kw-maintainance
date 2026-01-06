import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/../content/site";

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-background">
      <Header />
      <main className="flex-1">
        <div className="container-custom px-4 py-16 md:py-24">
            <h1 className="text-3xl md:text-4xl font-bold font-serif mb-8">Privacy Policy</h1>
            <div className="prose prose-slate max-w-none">
                <p>
                    At {siteConfig.name}, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information about you when you visit our website or use our services.
                </p>

                <h3>Information We Collect</h3>
                <p>
                    We may collect personal information that you provide to us, such as your name, phone number, email address, and address when you contact us for a quote or schedule a service.
                </p>

                <h3>How We Use Your Information</h3>
                <p>
                    We use the information we collect to:
                </p>
                <ul>
                    <li>Provide and improve our services.</li>
                    <li>Communicate with you about your appointments and quotes.</li>
                    <li>Respond to your inquiries.</li>
                </ul>

                <h3>Sharing Your Information</h3>
                <p>
                    We do not sell your personal information. We may share your information with service providers who assist us in operating our business, or as required by law.
                </p>

                <h3>Contact Us</h3>
                <p>
                    If you have any questions about this Privacy Policy, please contact us at {siteConfig.email} or {siteConfig.phone}.
                </p>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
