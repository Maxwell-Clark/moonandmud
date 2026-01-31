import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-cream via-cream-dark to-cream-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-brown mb-6 leading-tight">
              Crafted by Hand,
              <br />
              <span className="text-gold">Inspired by Nature</span>
            </h1>
            <p className="text-lg md:text-xl text-brown/70 mb-8 max-w-lg mx-auto md:mx-0">
              Each piece of Moon & Mud pottery is handcrafted with care,
              bringing the warmth of earth and the serenity of moonlight into
              your home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/shop" className="btn-primary text-center text-lg py-4 px-8 min-h-[56px] flex items-center justify-center">
                Shop Collection
              </Link>
              <Link href="#about" className="btn-outline text-center text-lg py-4 px-8 min-h-[56px] flex items-center justify-center">
                Our Story
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-gold/20 to-terracotta/20 rounded-full flex items-center justify-center">
              <div className="w-3/4 h-3/4 bg-white rounded-full flex items-center justify-center shadow-2xl overflow-hidden">
                <Image
                  src="/images/MNMLogo.PNG"
                  alt="Moon & Mud Pottery"
                  width={300}
                  height={300}
                  className="w-56 h-56 object-contain rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#FAF8F5"
          />
        </svg>
      </div>
    </section>
  );
}
