import { useEffect, useState } from 'react';
import { Layout } from '../../components/layout/Layout';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useCart } from '../../contexts/CartContext';
import { getProducts, getCategories, formatPrice, calculateDiscount, getProductImages } from '../../lib/services/product-service';
import type { ProductWithCategory, Category } from '../../types';
import { Search, Filter, ShoppingCart, Tag, Star, Sparkles, X } from 'lucide-react';

export function ProductsPage() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<ProductWithCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 10000 });
  const [showFilters, setShowFilters] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
      setError('Failed to load categories');
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const filters: any = {};
      if (search) filters.search = search;
      if (selectedCategory) filters.categoryId = selectedCategory;
      if (priceRange.min > 0) filters.minPrice = priceRange.min;
      if (priceRange.max < 10000) filters.maxPrice = priceRange.max;

      const data = await getProducts(filters);
      setProducts(data);
    } catch (error: any) {
      console.error('Error loading products:', error);
      setError(error?.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadProducts();
  };

  const handleAddToCart = async (productId: string) => {
    try {
      await addToCart(productId, 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedCategory('');
    setPriceRange({ min: 0, max: 10000 });
    setTimeout(loadProducts, 0);
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnpNNiA2YzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02eiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-white/20">
              <Sparkles className="h-4 w-4 text-accent-300" />
              <span className="text-sm font-semibold text-white">Premium Collection</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Discover Our Products</h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">Find exactly what you're looking for in our curated collection</p>
          </div>

          <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-dark-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/95 backdrop-blur-sm border-2 border-white/20 focus:border-accent-300 focus:ring-4 focus:ring-accent-200/50 transition-all text-dark-900 placeholder-dark-400 font-medium"
                />
              </div>
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="px-6 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl text-white font-semibold hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
              >
                <Filter className="h-5 w-5" />
                <span className="hidden sm:inline">Filters</span>
              </button>
              <button
                type="submit"
                className="px-8 py-4 bg-white text-primary-600 rounded-xl font-bold hover:bg-primary-50 transition-all duration-300 shadow-lg hover:shadow-glow transform hover:scale-105"
              >
                Search
              </button>
            </div>
          </form>

          {showFilters && (
            <div className="max-w-3xl mx-auto mt-6 p-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-white/20">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-dark-900">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-dark-600" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-dark-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all text-dark-900 font-medium"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-dark-700 mb-2">Min Price</label>
                    <Input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-dark-700 mb-2">Max Price</label>
                    <Input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                      placeholder="10000"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button onClick={loadProducts} className="flex-1" variant="gradient">
                    Apply Filters
                  </Button>
                  <Button onClick={clearFilters} variant="outline" className="flex-1">
                    Clear All
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 font-medium">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block h-12 w-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-dark-600 mt-6 text-lg font-medium">Loading amazing products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-gradient-purple p-6 rounded-full inline-block mb-6 shadow-glow">
              <Tag className="h-12 w-12 text-white" />
            </div>
            <p className="text-dark-600 text-xl font-medium">No products found</p>
            <p className="text-dark-500 mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <p className="text-dark-700 font-medium">
                Showing <span className="font-bold text-primary-600">{products.length}</span> products
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => {
                const images = getProductImages(product);
                const discount = calculateDiscount(product.price, product.compare_at_price);

                return (
                  <div
                    key={product.id}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-premium transition-all duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-2"
                  >
                    <a href={`/products/${product.slug}`} className="block">
                      <div className="relative aspect-square bg-gradient-to-br from-primary-50 to-accent-50 overflow-hidden">
                        {images.length > 0 ? (
                          <img
                            src={images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Sparkles className="h-16 w-16 text-primary-300" />
                          </div>
                        )}

                        {discount > 0 && (
                          <div className="absolute top-3 right-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                            {discount}% OFF
                          </div>
                        )}

                        {product.is_featured && (
                          <div className="absolute top-3 left-3 bg-gradient-purple text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-glow flex items-center gap-1">
                            <Star className="h-3 w-3 fill-current" />
                            Featured
                          </div>
                        )}
                      </div>

                      <div className="p-5">
                        {product.category && (
                          <div className="flex items-center gap-1.5 mb-2">
                            <Tag className="h-3.5 w-3.5 text-primary-600" />
                            <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide">
                              {product.category.name}
                            </span>
                          </div>
                        )}

                        <h3 className="font-bold text-dark-900 mb-2 text-lg line-clamp-2 group-hover:text-primary-600 transition-colors min-h-[3.5rem]">
                          {product.name}
                        </h3>

                        {product.description && (
                          <p className="text-dark-600 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                            {product.description}
                          </p>
                        )}

                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-2xl font-bold bg-gradient-purple bg-clip-text text-transparent">
                              {formatPrice(product.price)}
                            </span>
                            {product.compare_at_price && parseFloat(product.compare_at_price) > parseFloat(product.price) && (
                              <span className="text-sm text-dark-500 line-through ml-2">
                                {formatPrice(product.compare_at_price)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </a>

                    <div className="px-5 pb-5">
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(product.id);
                        }}
                        variant="gradient"
                        className="w-full group/btn"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
