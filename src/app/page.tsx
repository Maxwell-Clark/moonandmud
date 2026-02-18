import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import { getFeaturedProducts } from '@/lib/products';
import Link from 'next/link';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      <Hero />

      {/* Featured Products Section */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brown mb-4">
              Featured Pieces
            </h2>
            <p className="text-brown/70 max-w-2xl mx-auto">
              Discover my most beloved creations, each one crafted with care
              and designed to bring warmth and a touch of creative sparkle to your everyday life.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/shop" className="btn-primary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Browse by Category Section */}
      <section className="py-16 md:py-24 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brown mb-4">
              Browse by Category
            </h2>
            <p className="text-brown/70 max-w-2xl mx-auto">
              Find the perfect piece for your home from everyday cups, bowls, plates to decorative vases.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Mugs', slug: 'mugs', icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h1a4 4 0 110 8h-1M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" />
                </svg>
              )},
              { name: 'Bowls', slug: 'bowls', icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12c0 4.97 4.03 9 9 9s9-4.03 9-9H3z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12c0-1.1.9-2 2-2h14a2 2 0 012 2" />
                </svg>
              )},
              { name: 'Vases', slug: 'vases', icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3h6v2a3 3 0 01-3 3 3 3 0 01-3-3V3zM7.5 8c-.5 2-1 4-1 6 0 4 2.5 7 5.5 7s5.5-3 5.5-7c0-2-.5-4-1-6h-9z" />
                </svg>
              )},
              { name: 'Plates', slug: 'plates', icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" strokeWidth={1.5} />
                  <circle cx="12" cy="12" r="5" strokeWidth={1.5} />
                </svg>
              )},
              { name: 'Planters', slug: 'planters', icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v5M9 8l3-3 3 3M5 12h14l-2 9H7l-2-9z" />
                </svg>
              )},
              { name: 'Decorative', slug: 'decorative', icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              )},
            ].map((category) => (
              <Link
                key={category.slug}
                href={`/shop?category=${category.slug}`}
                className="group bg-cream rounded-xl p-6 text-center hover:bg-gold/10 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gold/20"
              >
                <div className="w-16 h-16 mx-auto mb-3 bg-gold/10 rounded-full flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all duration-300">
                  {category.icon}
                </div>
                <h3 className="font-display text-lg font-semibold text-brown group-hover:text-gold transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-brown mb-6">
                The Story of Moon & Mud Pottery
              </h2>
              <div className="space-y-4 text-brown/70">
                <p>
                  Hi, I&apos;m Kira! The hands and heart behind Moon &amp; Mud Pottery.
                </p>
                <p>
                  Moon &amp; Mud was born shortly after the birth of my first child
                  in Little Rock, Arkansas. During a season of postpartum
                  depression and anxiety, I knew I needed something just for me.
                  Something grounding, creative and life giving. What began as a
                  simple pottery class quickly became so much more than a hobby.
                  It became healing and it felt like I was meeting myself again.
                </p>
                <p>
                  Working with clay gave me a way to slow down. To breathe. To create.
                  Over time, that creative outlet grew into a deep love for the
                  meditative rhythm of the wheel and the quiet magic of shaping
                  earth into something both beautiful and useful.
                </p>
                <p>
                  I began sharing my successes and my failures on social media,
                  inviting others into the messy, funny and honest process of
                  learning. I&apos;ve since sold pieces at local markets and am now
                  excited to offer my work online as Moon &amp; Mud continues to grow.
                </p>
                <p>
                  Each piece is handcrafted using traditional wheel-throwing
                  techniques paired with modern glazing methods. I draw
                  inspiration from the natural world. The soft glow of moonlight,
                  the rich textures of earth, and the warm, golden tones of honey
                  at sunset.
                </p>
                <p>
                  Now based in St. George, Utah, my work continues to evolve as I
                  experiment with new techniques and forms. I love creating both
                  functional and decorative pieces. Mugs to hold your morning
                  coffee, bowls for gathering around the table, and vases that
                  bring life into your home.
                </p>
                <p>
                  I believe surrounding yourself with handmade objects creates a
                  more intentional, connected life. Every mug, bowl, and vase
                  carries the subtle marks of human hands. Small imperfections
                  that make each piece perfectly unique.
                </p>
                <p>
                  Thank you for being here and supporting handmade.
                </p>
                <p className="font-display text-brown">
                  — Kira
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d103089.29871892584!2d-113.6342!3d37.0965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80ca44d8f7b8a3e5%3A0x7d5c8e3b1e8c8b0a!2sSt.%20George%2C%20UT!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Moon & Mud Pottery Location - St. George, Utah"
                />
              </div>
              <div className="text-center mt-4">
                <p className="font-display text-2xl text-brown mb-1">Made with Love</p>
                <p className="text-brown/70">St. George, Utah</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brown mb-4">
              Our Values
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gold/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
                  />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-brown mb-2">
                Handcrafted
              </h3>
              <p className="text-brown/70">
                Every piece is made by hand on the potter's wheel, ensuring each
                item is truly one-of-a-kind.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gold/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-brown mb-2">
                Sustainable
              </h3>
              <p className="text-brown/70">
                I use locally-sourced clay and non-toxic glazes, minimizing my
                environmental footprint.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gold/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-brown mb-2">
                Timeless
              </h3>
              <p className="text-brown/70">
                My designs are meant to last, both in durability and style.
                Pieces you will treasure for years.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 md:py-24 bg-brown text-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Follow Along
            </h2>
            <p className="text-cream/70 max-w-2xl mx-auto">
              Join me on social media for behind-the-scenes peeks, new pieces, and the messy, funny, honest process of creating.
            </p>
          </div>

          <div className="flex justify-center gap-8">
            <a
              href="https://instagram.com/moonandmudpottery"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3"
            >
              <div className="w-16 h-16 bg-cream/10 rounded-full flex items-center justify-center group-hover:bg-gold/20 transition-all duration-300">
                <svg className="w-7 h-7 text-cream group-hover:text-gold transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </div>
              <span className="text-cream/70 group-hover:text-gold transition-colors font-medium">Instagram</span>
            </a>

            <a
              href="https://tiktok.com/@moonandmudpottery"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3"
            >
              <div className="w-16 h-16 bg-cream/10 rounded-full flex items-center justify-center group-hover:bg-gold/20 transition-all duration-300">
                <svg className="w-7 h-7 text-cream group-hover:text-gold transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V13a8.28 8.28 0 005.58 2.16V11.7a4.85 4.85 0 01-3.77-1.82v-.01l.01-.02V6.69h3.76z" />
                </svg>
              </div>
              <span className="text-cream/70 group-hover:text-gold transition-colors font-medium">TikTok</span>
            </a>

            <a
              href="https://youtube.com/@moonandmudpottery"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3"
            >
              <div className="w-16 h-16 bg-cream/10 rounded-full flex items-center justify-center group-hover:bg-gold/20 transition-all duration-300">
                <svg className="w-7 h-7 text-cream group-hover:text-gold transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </div>
              <span className="text-cream/70 group-hover:text-gold transition-colors font-medium">YouTube</span>
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-24 bg-tan/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brown mb-4">
            Join The Moon &amp; Mud Community
          </h2>
          <p className="text-brown/70 mb-8">
            Be the first to know about new arrivals in my shop, limited edition pieces,
            and exclusive subscriber-only offers.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-3 rounded-lg border border-tan/30 focus:outline-none focus:ring-2 focus:ring-gold bg-white"
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
