import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/../content/site";

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-background">
      <Header />
      <main className="flex-1">
        <div className="container-custom px-4 py-16 md:py-24">
            <h1 className="text-3xl md:text-4xl font-bold font-serif mb-8">Terms of Service</h1>
            <div className="prose prose-slate max-w-none">
                <p>
                    Welcome to {siteConfig.name}. By accessing our website or using our services, you agree to be bound by these Terms of Service.
                </p>

                <h3>Services</h3>
                <p>
                    We provide handyman, maintenance, and hauling services as described on our website. We reserve the right to refuse service to anyone for any reason at any time.
                </p>

                <h3>Estimates and Payments</h3>
                <p>
                    Estimates provided are non-binding and subject to change based on actual work required. Payment terms will be agreed upon prior to the commencement of work.
                </p>

                <h3>Liability</h3>
                <p>
                    While we strive to perform all work with the highest degree of care, {siteConfig.name} is not liable for any incidental or consequential damages resulting from our services, except as required by law.
                </p>

                <h3>Governing Law</h3>
                <p>
                    These Terms of Service shall be governed by and construed in accordance with the laws of the State of Florida.
                </p>

                <h3>Contact Us</h3>
                <p>
                    If you have any questions about these Terms of Service, please contact us at {siteConfig.email} or {siteConfig.phone}.
                </p>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
