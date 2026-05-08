// SEO Utilities
export interface SEOMetadata {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  keywords?: string[];
  author?: string;
  robots?: string;
  viewport?: string;
}

export const setSEOMeta = (meta: SEOMetadata) => {
  // Set title
  document.title = meta.title;

  // Helper function to set or update meta tag
  const setMetaTag = (name: string, content: string, property = false) => {
    let element = document.querySelector(
      property
        ? `meta[property="${name}"]`
        : `meta[name="${name}"]`
    ) as HTMLMetaElement | null;

    if (!element) {
      element = document.createElement('meta');
      if (property) {
        element.setAttribute('property', name);
      } else {
        element.setAttribute('name', name);
      }
      document.head.appendChild(element);
    }
    element.content = content;
  };

  // Set description
  setMetaTag('description', meta.description);

  // SEO keywords
  if (meta.keywords) {
    setMetaTag('keywords', meta.keywords.join(', '));
  }

  // Author
  if (meta.author) {
    setMetaTag('author', meta.author);
  }

  // Robots
  if (meta.robots) {
    setMetaTag('robots', meta.robots);
  }

  // Viewport
  if (meta.viewport) {
    setMetaTag('viewport', meta.viewport);
  }

  // Open Graph (Social Media)
  setMetaTag('og:title', meta.ogTitle || meta.title, true);
  setMetaTag('og:description', meta.ogDescription || meta.description, true);
  setMetaTag('og:type', 'website', true);
  setMetaTag('og:url', window.location.href, true);

  if (meta.ogImage) {
    setMetaTag('og:image', meta.ogImage, true);
  }

  // Twitter Card
  setMetaTag('twitter:card', meta.twitterCard || 'summary_large_image');
  setMetaTag('twitter:title', meta.twitterTitle || meta.title);
  setMetaTag('twitter:description', meta.twitterDescription || meta.description);

  // Canonical URL
  if (meta.canonical) {
    let canonicalLink = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;

    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = meta.canonical;
  }
};

export const generateStructuredData = (data: Record<string, unknown>) => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.innerHTML = JSON.stringify(data);
  document.head.appendChild(script);
};

export const productStructuredData = (product: any) => {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.featuredImage?.url,
    brand: {
      '@type': 'Brand',
      name: 'Your Store Name',
    },
    offers: {
      '@type': 'Offer',
      url: window.location.href,
      priceCurrency: product.priceRange?.minVariantPrice?.currencyCode || 'USD',
      price: product.priceRange?.minVariantPrice?.amount,
      availability: 'https://schema.org/InStock',
    },
  };
};

export const organizationStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Your Store Name',
    url: window.location.origin,
    logo: 'https://your-store.com/logo.png',
    sameAs: [
      'https://www.facebook.com/yourstore',
      'https://www.instagram.com/yourstore',
      'https://twitter.com/yourstore',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'support@your-store.com',
    },
  };
};
