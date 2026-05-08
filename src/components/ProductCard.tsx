import { useState } from 'react';
import { ShoppingCart, Heart, Eye } from 'lucide-react';

interface ProductCardProps {
  id: string;
  title: string;
  handle: string;
  image?: string;
  price: string;
  originalPrice?: string;
  onAddCart?: () => void;
  onQuickView?: () => void;
}

export function ProductCard({
  id,
  title,
  handle,
  image,
  price,
  originalPrice,
  onAddCart,
  onQuickView,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const hasDiscount = originalPrice && parseFloat(originalPrice) > parseFloat(price);
  const discountPercent = hasDiscount
    ? Math.round(
        ((parseFloat(originalPrice!) - parseFloat(price)) / parseFloat(originalPrice!)) * 100
      )
    : 0;

  return (
    <div className="product-card group">
      {/* Image Container */}
      <div className="product-card-image relative">
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 z-10 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm animate-pulse">
            -{discountPercent}%
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white dark:bg-slate-800 shadow-lg transition-all duration-300 hover:scale-110 group-hover:bg-azure group-hover:text-white"
        >
          <Heart
            size={20}
            className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}
          />
        </button>

        {/* Image */}
        <img
          src={image || 'https://via.placeholder.com/300x400'}
          alt={title}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {!imageLoaded && <div className="w-full h-full bg-gray-200 dark:bg-gray-700 shimmer" />}

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
          <button
            onClick={onQuickView}
            className="p-3 rounded-full bg-white text-ink transition-all duration-300 hover:bg-azure hover:text-white hover:scale-110 transform -translate-y-2 group-hover:translate-y-0"
          >
            <Eye size={24} />
          </button>
          <button
            onClick={onAddCart}
            className="p-3 rounded-full bg-azure text-white transition-all duration-300 hover:bg-ink hover:scale-110 transform -translate-y-2 group-hover:translate-y-0"
          >
            <ShoppingCart size={24} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="product-card-content">
        <h3 className="product-card-title line-clamp-2 text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground">{handle}</p>

        {/* Price */}
        <div className="flex items-center gap-3 pt-2">
          <span className="product-card-price text-2xl font-bold">${price}</span>
          {originalPrice && (
            <span className="text-sm text-gray-400 line-through">${originalPrice}</span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 pt-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">(128)</span>
        </div>

        {/* CTA Button */}
        <button className="btn-primary w-full mt-4 uppercase text-sm tracking-wide">
          View Details
        </button>
      </div>
    </div>
  );
}
