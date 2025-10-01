import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

export function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');

  return (
    <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center text-center overflow-hidden">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          data-ai-hint={heroImage.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 bg-background/70 bg-gradient-to-t from-background via-background/50 to-transparent" />
      <div className="relative z-10 container mx-auto px-4 animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">
          The Future of Healthcare
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground">
          Welcome to SupremeHealth. Personalized, predictive, and proactive care, accessible to everyone, everywhere.
        </p>
      </div>
    </section>
  );
}
