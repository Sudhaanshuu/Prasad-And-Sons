import { Play, ArrowRight, ShoppingBag, Package, Shield, Headphones } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { ProductSlider } from '../components/home/ProductSlider';
import { Button } from '../components/ui/Button';

export function HomePage() {
  const bestSellers = [
    {
      id: '1',
      name: 'Wireless Bluetooth Headphones',
      price: '₹2,999',
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
      badge: 'BESTSELLER',
    },
    {
      id: '2',
      name: 'Premium Cotton T-Shirt',
      price: '₹499',
      image: 'https://images.pexels.com/photos/1020585/pexels-photo-1020585.jpeg?auto=compress&cs=tinysrgb&w=800',
      badge: 'NEW',
    },
    {
      id: '3',
      name: 'Steel Water Bottle',
      price: '₹799',
      image: 'https://images.pexels.com/photos/4199098/pexels-photo-4199098.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '4',
      name: 'Leather Backpack',
      price: '₹1,999',
      image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=800',
      badge: 'TRENDING',
    },
  ];

  const topPicks = [
    {
      id: '5',
      name: 'Smart Watch',
      price: '₹3,499',
      image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800',
      badge: 'NEW',
    },
    {
      id: '6',
      name: 'Wireless Earbuds',
      price: '₹1,499',
      image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '7',
      name: 'Premium Sneakers',
      price: '₹2,499',
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '8',
      name: 'Designer Sunglasses',
      price: '₹899',
      image: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=800',
      badge: 'HOT',
    },
  ];

  return (
    <Layout>
      <section className="relative h-[600px] md:h-[700px] bg-dark-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Hero"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900/90 via-dark-900/60 to-transparent"></div>
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-2xl">
            <div className="inline-block bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 animate-pulse">
              NEW COLLECTION
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
              THE BEST OF
              <br />
              <span className="text-primary-500">TRIPHOP HIP</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-lg">
              Experience premium quality products designed for the modern lifestyle. Shop the latest collection now.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/products">
                <Button size="lg" variant="primary" className="group">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-white/20 transition-all flex items-center gap-3 group">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <Play className="h-5 w-5 text-dark-900 ml-1" />
                </div>
                <span>Watch Video</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <ProductSlider products={bestSellers} title="Best Sellers" />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                image: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=800',
                title: 'Electronics',
                tag: '#nucodeofcool',
              },
              {
                image: 'https://images.pexels.com/photos/5710152/pexels-photo-5710152.jpeg?auto=compress&cs=tinysrgb&w=800',
                title: 'Fashion',
                tag: '#nucodeofcool',
              },
              {
                image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800',
                title: 'Accessories',
                tag: '#nucodeofcool',
              },
              {
                image: 'https://images.pexels.com/photos/6510384/pexels-photo-6510384.jpeg?auto=compress&cs=tinysrgb&w=800',
                title: 'Lifestyle',
                tag: '#nucodeofcool',
              },
            ].map((category, idx) => (
              <a
                key={idx}
                href="/products"
                className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-dark-900/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-xl mb-1">{category.title}</h3>
                  <p className="text-primary-400 text-sm font-semibold">{category.tag}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 bg-dark-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1964471/pexels-photo-1964471.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Banner"
            className="w-full h-full object-cover opacity-40"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Product showcase"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="text-white">
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                NU CODE
                <br />
                OF <span className="text-primary-500">COOL</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Redefining style and innovation. Our products embody the perfect blend of design, functionality, and coolness.
              </p>
              <a href="/products">
                <Button size="lg" variant="primary" className="group">
                  Explore Collection
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <ProductSlider products={topPicks} title="Top Picks" />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-dark-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience excellence in every aspect of your shopping journey
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Package,
                title: 'Fast Delivery',
                description: 'Quick and reliable shipping to your doorstep',
              },
              {
                icon: Shield,
                title: 'Secure Payments',
                description: 'Your transactions are protected and encrypted',
              },
              {
                icon: Headphones,
                title: '24/7 Support',
                description: 'Round-the-clock customer service assistance',
              },
              {
                icon: ShoppingBag,
                title: 'Quality Products',
                description: 'Premium quality guaranteed on all items',
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="bg-gray-50 p-8 rounded-2xl hover:bg-gray-100 transition-all duration-300 text-center group"
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-600 group-hover:scale-110 transition-all">
                    <Icon className="h-8 w-8 text-primary-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-dark-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative h-[500px] bg-dark-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="CTA"
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              Join the Revolution
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Be part of a community that values quality, style, and innovation. Start shopping today.
            </p>
            <a href="/signup">
              <Button size="lg" variant="primary" className="group">
                Create Account
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
