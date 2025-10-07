import { ArrowRight, ShieldCheck, Truck, CreditCard, Sparkles, Zap, Star, ShoppingCart } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { Link } from '../components/ui/Link';

export function HomePage() {
  const features = [
    {
      icon: ShieldCheck,
      title: 'Secure Shopping',
      description: 'Your data and payments are protected with industry-standard encryption',
      color: 'from-primary-500 to-accent-500',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Quick and reliable shipping to your doorstep',
      color: 'from-accent-500 to-primary-600',
    },
    {
      icon: CreditCard,
      title: 'Easy Payments',
      description: 'Multiple payment options for your convenience',
      color: 'from-primary-600 to-primary-700',
    },
  ];

  return (
    <Layout>
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnpNNiA2YzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02eiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-30"></div>

        <div className="absolute top-20 right-10 w-72 h-72 bg-accent-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <Sparkles className="h-4 w-4 text-accent-300" />
              <span className="text-sm font-semibold text-white">Premium Shopping Experience</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-accent-300 to-white bg-clip-text text-transparent">
                Prasad and Sons
              </span>
            </h1>

            <p className="text-xl md:text-2xl mb-10 text-primary-100 leading-relaxed">
              Discover quality products at unbeatable prices. Your trusted online shopping destination with premium service.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <button className="bg-white text-primary-600 hover:bg-primary-50 font-bold px-8 py-4 text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-glow-lg transform hover:scale-105 flex items-center justify-center space-x-2 group">
                  <span>Shop Now</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/categories">
                <button className="border-2 border-white text-white hover:bg-white hover:text-primary-700 font-bold px-8 py-4 text-lg rounded-xl transition-all duration-300 backdrop-blur-sm transform hover:scale-105">
                  Browse Categories
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 rounded-2xl blur-xl transition-opacity duration-300" style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}></div>
                  <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-premium transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl mb-6 shadow-glow`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-dark-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-dark-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-primary-50 px-4 py-2 rounded-full mb-4">
              <Star className="h-4 w-4 text-primary-600" />
              <span className="text-sm font-semibold text-primary-700">Featured Collection</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-purple bg-clip-text text-transparent mb-4">
              Trending Products
            </h2>
            <p className="text-xl text-dark-600 max-w-2xl mx-auto">
              Check out our most popular items loved by thousands of customers
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-premium transition-all duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-2"
              >
                <div className="relative aspect-square bg-gradient-to-br from-primary-100 via-accent-50 to-primary-50 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Sparkles className="h-16 w-16 text-primary-300 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-accent-400 text-accent-400" />
                    ))}
                  </div>
                  <h3 className="font-bold text-dark-900 mb-2 text-lg group-hover:text-primary-600 transition-colors">Premium Product</h3>
                  <p className="text-dark-600 text-sm mb-4">High-quality premium item</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold bg-gradient-purple bg-clip-text text-transparent">₹999</span>
                      <span className="text-sm text-dark-500 line-through ml-2">₹1499</span>
                    </div>
                    <Button size="sm" variant="gradient">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/products">
              <Button size="lg" variant="gradient" className="group">
                <span>View All Products</span>
                <Zap className="h-5 w-5 ml-2 group-hover:rotate-12 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative py-20 bg-gradient-to-br from-primary-600 via-accent-600 to-primary-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnpNNiA2YzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02eiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Sparkles className="h-16 w-16 mx-auto mb-6 text-accent-200 animate-float" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl mb-10 text-primary-100 max-w-2xl mx-auto leading-relaxed">
            Create an account today and get exclusive access to deals, discounts, and premium features
          </p>
          <Link href="/signup">
            <button className="bg-white text-primary-600 hover:bg-primary-50 font-bold px-10 py-4 text-xl rounded-xl transition-all duration-300 shadow-lg hover:shadow-glow-lg transform hover:scale-105">
              Create Free Account
            </button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
