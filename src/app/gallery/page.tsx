
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function GalleryPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header />
      <main className="flex-1 py-12 container-custom px-4">
        <h1 className="text-4xl font-bold mb-8">Our Work</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="aspect-square bg-muted rounded-xl flex items-center justify-center text-muted-fg">
            Placeholder Image 1
          </div>
          <div className="aspect-square bg-muted rounded-xl flex items-center justify-center text-muted-fg">
            Placeholder Image 2
          </div>
          <div className="aspect-square bg-muted rounded-xl flex items-center justify-center text-muted-fg">
            Placeholder Image 3
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
