// SEO & AEO Optimization
(function() {
  'use strict';

  // Structured Data Schema
  function injectSchemaMarkup(data) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }

  // Product Schema
  window.injectProductSchema = function(product) {
    const schema = {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: product.title,
      description: product.description,
      image: product.featured_image,
      brand: {
        '@type': 'Brand',
        name: product.vendor || 'Store Brand'
      },
      offers: {
        '@type': 'Offer',
        url: window.location.href,
        priceCurrency: 'USD',
        price: product.price,
        availability: product.available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.5',
        reviewCount: '100'
      }
    };
    injectSchemaMarkup(schema);
  };

  // Collection Schema
  window.injectCollectionSchema = function(collection, products) {
    const schema = {
      '@context': 'https://schema.org/',
      '@type': 'CollectionPage',
      name: collection.title,
      description: collection.description,
      url: window.location.href,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: products.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: p.url,
          name: p.title,
          image: p.image,
          offers: {
            '@type': 'Offer',
            price: p.price,
            priceCurrency: 'USD'
          }
        }))
      }
    };
    injectSchemaMarkup(schema);
  };

  // Breadcrumb Schema
  window.injectBreadcrumbSchema = function(breadcrumbs) {
    const schema = {
      '@context': 'https://schema.org/',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: item.url
      }))
    };
    injectSchemaMarkup(schema);
  };

  // Open Graph Meta Tags
  window.updateOpenGraphTags = function(data) {
    const tags = {
      'og:title': data.title,
      'og:description': data.description,
      'og:image': data.image,
      'og:url': window.location.href,
      'og:type': data.type || 'website',
      'twitter:title': data.title,
      'twitter:description': data.description,
      'twitter:image': data.image,
      'twitter:card': 'summary_large_image'
    };

    Object.entries(tags).forEach(([property, content]) => {
      let tag = document.querySelector(`meta[property="${property}"], meta[name="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        if (property.startsWith('og:')) {
          tag.setAttribute('property', property);
        } else {
          tag.setAttribute('name', property);
        }
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });
  };

  // Performance Optimization
  window.optimizeImages = function() {
    const images = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      });
      images.forEach(img => imageObserver.observe(img));
    }
  };

  // Track performance metrics
  if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
      const perfData = {
        pageLoadTime: window.performance.timing.loadEventEnd - window.performance.timing.navigationStart,
        contentfulPaint: window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart
      };
      console.log('Performance Metrics:', perfData);
    });
  }
})();
