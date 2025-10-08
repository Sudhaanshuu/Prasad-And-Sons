import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  badge?: string;
}

interface ProductSliderProps {
  products: Product[];
  title: string;
}

export function ProductSlider({ products, title }: ProductSliderProps) {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-900">{title}</h2>
          <a href="/products" className="text-primary-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all group">
            View All
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="product-slider"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.badge && (
                    <div className="absolute top-3 left-3 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {product.badge}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-dark-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-dark-900">{product.price}</span>
                  </div>
                  <Button variant="primary" className="w-full group/btn">
                    <ShoppingCart className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
