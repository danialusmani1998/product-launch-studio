// Filter utilities for products

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface FilterCategory {
  name: string;
  options: FilterOption[];
}

export const PRODUCT_FILTERS: FilterCategory[] = [
  {
    name: 'Price',
    options: [
      { label: 'Under $25', value: 'price_0_25' },
      { label: '$25 - $50', value: 'price_25_50' },
      { label: '$50 - $100', value: 'price_50_100' },
      { label: '$100 - $250', value: 'price_100_250' },
      { label: 'Over $250', value: 'price_250_plus' },
    ],
  },
  {
    name: 'Availability',
    options: [
      { label: 'In Stock', value: 'in_stock' },
      { label: 'On Sale', value: 'on_sale' },
      { label: 'New Arrivals', value: 'new_arrivals' },
    ],
  },
  {
    name: 'Collection',
    options: [
      { label: 'Spring Collection', value: 'spring' },
      { label: 'Summer Collection', value: 'summer' },
      { label: 'Autumn Collection', value: 'autumn' },
      { label: 'Winter Collection', value: 'winter' },
      { label: 'Premium Line', value: 'premium' },
    ],
  },
  {
    name: 'Material',
    options: [
      { label: 'Cotton', value: 'cotton' },
      { label: 'Silk', value: 'silk' },
      { label: 'Wool', value: 'wool' },
      { label: 'Linen', value: 'linen' },
      { label: 'Synthetic', value: 'synthetic' },
    ],
  },
  {
    name: 'Size',
    options: [
      { label: 'XS', value: 'xs' },
      { label: 'S', value: 's' },
      { label: 'M', value: 'm' },
      { label: 'L', value: 'l' },
      { label: 'XL', value: 'xl' },
      { label: 'XXL', value: 'xxl' },
    ],
  },
  {
    name: 'Color',
    options: [
      { label: 'Black', value: 'black' },
      { label: 'White', value: 'white' },
      { label: 'Navy', value: 'navy' },
      { label: 'Blue', value: 'blue' },
      { label: 'Red', value: 'red' },
      { label: 'Green', value: 'green' },
    ],
  },
];

export const filterProducts = (
  products: any[],
  filters: Record<string, string[]>
): any[] => {
  return products.filter(product => {
    for (const [filterKey, selectedValues] of Object.entries(filters)) {
      if (selectedValues.length === 0) continue;

      // Add your filter logic here based on product properties
      // This is a template that you should customize based on your product structure
    }
    return true;
  });
};

export const getSortedProducts = (
  products: any[],
  sortBy: 'newest' | 'price-low' | 'price-high' | 'popular' | 'rating'
): any[] => {
  const sorted = [...products];

  switch (sortBy) {
    case 'price-low':
      return sorted.sort(
        (a, b) =>
          parseFloat(a.priceRange?.minVariantPrice?.amount || 0) -
          parseFloat(b.priceRange?.minVariantPrice?.amount || 0)
      );
    case 'price-high':
      return sorted.sort(
        (a, b) =>
          parseFloat(b.priceRange?.minVariantPrice?.amount || 0) -
          parseFloat(a.priceRange?.minVariantPrice?.amount || 0)
      );
    case 'newest':
      return sorted; // Assume products are already sorted by creation date
    case 'popular':
      return sorted; // Add popularity logic
    case 'rating':
      return sorted; // Add rating logic
    default:
      return sorted;
  }
};
