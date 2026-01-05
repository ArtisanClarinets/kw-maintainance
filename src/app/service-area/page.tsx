
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/../content/site";

export default function ServiceAreaPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header />
      <main className="flex-1 py-12 container-custom px-4">
        <h1 className="text-4xl font-bold mb-8">Service Area</h1>
        <div className="prose prose-lg max-w-3xl">
          <p className="text-xl text-muted-fg leading-relaxed mb-6">
            We are proud to serve the entire <strong>Fort Walton Beach</strong> area and surrounding communities.
          </p>
          <p>
            Our team is local and ready to assist with your hospitality and maintenance needs in the following locations:
          </p>
          <ul className="grid sm:grid-cols-2 gap-4 list-disc pl-6 mt-6 mb-12">
            <li>Fort Walton Beach, FL</li>
            <li>Destin, FL</li>
            <li>Mary Esther, FL</li>
            <li>Niceville, FL</li>
            <li>Miramar Beach, FL</li>
            <li>Shalimar, FL</li>
            <li>Okaloosa Island</li>
          </ul>
          <p>
            Not sure if we cover your area? <a href="/contact" className="text-primary hover:underline">Contact us</a> and we&apos;ll let you know!
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
