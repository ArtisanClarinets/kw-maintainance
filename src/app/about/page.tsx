
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/../content/site";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header />
      <main className="flex-1 py-12 container-custom px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">About Us</h1>
          <div className="prose prose-lg dark:prose-invert">
            <p className="text-xl text-muted-fg leading-relaxed mb-6">
              {siteConfig.description}
            </p>
            <p className="mb-6">
              At {siteConfig.name}, we pride ourselves on delivering top-quality hospitality and maintenance services.
              Whether you need a quick repair, a major installation, or hauling services, we have the expertise to get the job done right.
            </p>
            <p>
              Based in Fort Walton Beach, we are committed to serving our local community with professionalism, reliability, and attention to detail.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
