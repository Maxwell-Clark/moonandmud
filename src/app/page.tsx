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
              Discover our most beloved creations, each one crafted with care
              and designed to bring warmth to your everyday rituals.
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
              Find the perfect piece for your home, from everyday mugs to decorative vases.
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
                  Moon & Mud Pottery was born from a deep love for the
                  meditative process of working with clay. What started as a
                  hobby in a small garage studio has grown into a passion for
                  creating functional art that brings beauty to everyday
                  moments.
                </p>
                <p>
                  Every piece is handcrafted using traditional wheel-throwing
                  techniques combined with modern glazing methods. I draw
                  inspiration from the natural world - the soft glow of
                  moonlight, the rich textures of earth, and the warm tones of
                  honey at golden hour.
                </p>
                <p>
                  Based in St. George, Utah, I believe that surrounding
                  yourself with handmade objects creates a more intentional,
                  connected life. Each mug, bowl, and vase carries the marks of
                  human hands - small imperfections that make them perfectly
                  unique.
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
                Our designs are meant to last, both in durability and style.
                Pieces you will treasure for years.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-brown text-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-brown-light/30 rounded-xl p-6 border border-cream/10">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-gold"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-cream/80 mb-4">
                "The <Link href="/shop?category=mugs" className="text-gold hover:underline">Crescent Moon Mug</Link> is absolutely perfect. It makes my
                morning coffee feel like a special ritual. You can feel the love
                in every detail."
              </p>
              <p className="font-semibold">— Sarah M.</p>
            </div>

            <div className="bg-brown-light/30 rounded-xl p-6 border border-cream/10">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-gold"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-cream/80 mb-4">
                "I bought the <Link href="/shop?category=bowls" className="text-gold hover:underline">serving bowl</Link> for my wife and she was thrilled. The
                quality is outstanding and it's become the centerpiece of our
                table."
              </p>
              <p className="font-semibold">— James T.</p>
            </div>

            <div className="bg-brown-light/30 rounded-xl p-6 border border-cream/10">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-gold"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-cream/80 mb-4">
                "The <Link href="/shop?category=planters" className="text-gold hover:underline">moon phase planter</Link> is even more beautiful in person. My
                fiddle leaf fig looks so happy in its new home. Highly
                recommend!"
              </p>
              <p className="font-semibold">— Emily R.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-24 bg-tan/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brown mb-4">
            Join Our Community
          </h2>
          <p className="text-brown/70 mb-8">
            Be the first to know about new arrivals in our shop, limited edition pieces,
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
