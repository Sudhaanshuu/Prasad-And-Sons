import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, ShoppingCart, Heart, Share2, Check, X, Loader2 } from 'lucide-react';

// Toast Notification Component
function Toast({ message, type = 'success', onClose }) {
  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
  
  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in z-50`}>
      {type === 'success' && <Check className="h-5 w-5" />}
      {type === 'error' && <X className="h-5 w-5" />}
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-80">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

// Loading Skeleton Component
function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
      <div className="aspect-square bg-gray-200"></div>
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}

// Star Rating Component
function StarRating({ rating, size = 'md', showNumber = true, interactive = false, onRate }) {
  const [hover, setHover] = useState(0);
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            disabled={!interactive}
            onMouseEnter={() => interactive && setHover(star)}
            onMouseLeave={() => interactive && setHover(0)}
            onClick={() => interactive && onRate && onRate(star)}
            className={interactive ? 'cursor-pointer' : 'cursor-default'}
          >
            <Star
              className={`${sizeClasses[size]} ${
                star <= (hover || rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'fill-gray-200 text-gray-200'
              } transition-colors`}
            />
          </button>
        ))}
      </div>
      {showNumber && (
        <span className="text-sm font-semibold text-gray-700">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}

// Image Gallery Component
function ImageGallery({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden group">
        <img
          src={images[currentIndex]}
          alt="Product"
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        />
        
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                idx === currentIndex
                  ? 'border-blue-600 ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Review Component
function ReviewItem({ review }) {
  return (
    <div className="border-b pb-6 last:border-0">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              {review.userName[0].toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{review.userName}</p>
              <p className="text-sm text-gray-500">{review.date}</p>
            </div>
          </div>
          <StarRating rating={review.rating} size="sm" showNumber={false} />
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed">{review.comment}</p>
      {review.helpful > 0 && (
        <button className="text-sm text-gray-500 mt-3 hover:text-gray-700">
          {review.helpful} people found this helpful
        </button>
      )}
    </div>
  );
}

// Review Form Component
function ReviewForm({ onSubmit }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    onSubmit({ rating, comment });
    setRating(0);
    setComment('');
  };

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Write a Review</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
        <StarRating rating={rating} interactive onRate={setRating} />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Share your experience with this product..."
          required
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
      >
        Submit Review
      </button>
    </div>
  );
}

// Main Enhanced Product Page Component
function EnhancedProductPage() {
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isFavorite, setIsFavorite] = useState(false);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const product = {
    name: 'Premium Cotton T-Shirt',
    price: 1499,
    originalPrice: 2499,
    rating: 4.5,
    reviewCount: 128,
    images: [
      'https://images.pexels.com/photos/1020585/pexels-photo-1020585.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2294342/pexels-photo-2294342.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1261422/pexels-photo-1261422.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    stock: 45,
    description: 'Experience ultimate comfort with our Premium Cotton T-Shirt. Made from 100% organic cotton, this shirt features a modern fit and superior durability. Perfect for everyday wear.',
    features: [
      '100% Organic Cotton',
      'Pre-shrunk fabric',
      'Reinforced seams',
      'Machine washable',
      'Eco-friendly dyes'
    ],
    relatedProducts: [
      { id: 1, name: 'Casual Polo Shirt', price: 1799, image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { id: 2, name: 'Cotton Hoodie', price: 2499, image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { id: 3, name: 'Denim Jacket', price: 3499, image: 'https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { id: 4, name: 'Sport T-Shirt', price: 1299, image: 'https://images.pexels.com/photos/2294342/pexels-photo-2294342.jpeg?auto=compress&cs=tinysrgb&w=400' },
    ]
  };

  const reviews = [
    { id: 1, userName: 'John Doe', rating: 5, date: 'Oct 5, 2025', comment: 'Excellent quality! The fabric is soft and comfortable. Highly recommend this product.', helpful: 12 },
    { id: 2, userName: 'Sarah Smith', rating: 4, date: 'Oct 3, 2025', comment: 'Great t-shirt, fits perfectly. Only wish there were more color options.', helpful: 8 },
    { id: 3, userName: 'Mike Johnson', rating: 5, date: 'Sep 28, 2025', comment: 'Best t-shirt I have bought in years. Worth every penny!', helpful: 15 },
  ];

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddToCart = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast('Product added to cart!');
    }, 800);
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    showToast(isFavorite ? 'Removed from wishlist' : 'Added to wishlist', 'info');
  };

  const handleShare = () => {
    showToast('Link copied to clipboard!', 'info');
  };

  const handleReviewSubmit = (reviewData) => {
    showToast('Thank you for your review!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="text-sm text-gray-600 mb-6">
          <span className="hover:text-blue-600 cursor-pointer">Home</span>
          <span className="mx-2">/</span>
          <span className="hover:text-blue-600 cursor-pointer">Products</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <ImageGallery images={product.images} />
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center gap-3 mb-4">
                  <StarRating rating={product.rating} />
                  <span className="text-sm text-gray-600">({product.reviewCount} reviews)</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleToggleFavorite}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Heart className={`h-6 w-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Share2 className="h-6 w-6 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                <span className="text-xl text-gray-400 line-through">₹{product.originalPrice}</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </span>
              </div>
              <p className="text-sm text-green-600 font-medium">In stock - {product.stock} units available</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">Select Size</label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border-2 rounded-lg font-semibold transition-all ${
                      selectedSize === size
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">Quantity</label>
              <div className="flex items-center border-2 border-gray-300 rounded-lg w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-6 py-2 font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </>
                )}
              </button>
              <button className="px-6 py-4 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors font-semibold">
                Buy Now
              </button>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-700">
                    <Check className="h-4 w-4 text-green-600" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm mb-12">
          <div className="border-b">
            <div className="flex gap-8 px-8">
              {['description', 'reviews', 'shipping'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 font-semibold capitalize transition-colors relative ${
                    activeTab === tab
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8">
            {activeTab === 'description' && (
              <div>
                <p className="text-gray-700 leading-relaxed mb-4">{product.description}</p>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Care Instructions</h3>
                <p className="text-gray-700">Machine wash cold with like colors. Tumble dry low. Do not bleach. Iron on low heat if needed.</p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Customer Reviews</h3>
                    <div className="flex items-center gap-4">
                      <StarRating rating={product.rating} size="lg" />
                      <span className="text-gray-600">Based on {product.reviewCount} reviews</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 mb-8">
                  {reviews.map((review) => (
                    <ReviewItem key={review.id} review={review} />
                  ))}
                </div>

                <ReviewForm onSubmit={handleReviewSubmit} />
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Free Shipping</h4>
                    <p className="text-gray-600">On orders over ₹500</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Fast Delivery</h4>
                    <p className="text-gray-600">Estimated delivery in 3-5 business days</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Easy Returns</h4>
                    <p className="text-gray-600">30-day return policy</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {product.relatedProducts.map((item) => (
              <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group cursor-pointer">
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.name}</h3>
                  <p className="text-lg font-bold text-gray-900">₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

function LoadingStateDemo() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Loading Skeletons Demo</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState('product');

  return (
    <div>
      <div className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex gap-4">
          <button
            onClick={() => setView('product')}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              view === 'product' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Enhanced Product Page
          </button>
          <button
            onClick={() => setView('loading')}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              view === 'loading' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Loading States
          </button>
        </div>
      </div>

      {view === 'product' ? <EnhancedProductPage /> : <LoadingStateDemo />}
    </div>
  );
}