
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GulfGrid } from "@/components/GulfGrid";

export default function GalleryPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-background relative overflow-hidden">
      <GulfGrid />
      <Header />
      <main className="flex-1 py-16 md:py-24 container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold font-serif mb-6">Our Work</h1>
            <p className="text-lg text-muted-foreground">
                See the quality and precision we bring to every hospitality and maintenance project across the Gulf Coast.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Using abstract placeholders that look premium instead of gray boxes */}
          {[1, 2, 3, 4, 5, 6].map((item) => (
             <div key={item} className="aspect-[4/3] bg-muted/20 border border-border/50 rounded-2xl overflow-hidden backdrop-blur-sm group relative hover:shadow-lg transition-all duration-300">
                <div className="absolute inset-0 flex items-center justify-center bg-muted/30 group-hover:bg-muted/40 transition-colors">
                    <span className="font-serif italic text-muted-foreground/50 text-2xl">Project {item}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-background/80 backdrop-blur-md border-t border-border/10">
                    <p className="font-semibold text-sm">Residential Maintenance</p>
                    <p className="text-xs text-muted-foreground">Fort Walton Beach, FL</p>
                </div>
             </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
