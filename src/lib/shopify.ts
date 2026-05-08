// Shopify API Integration
export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  featuredImage?: {
    url: string;
    alt: string;
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  collections?: {
    nodes: Array<{
      handle: string;
      title: string;
    }>;
  };
  tags?: string[];
}

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image?: {
    url: string;
    alt: string;
  };
  products: {
    nodes: ShopifyProduct[];
  };
}

const SHOPIFY_STORE_URL = process.env.VITE_SHOPIFY_STORE_URL || 'https://your-store.myshopify.com';
const SHOPIFY_ACCESS_TOKEN = process.env.VITE_SHOPIFY_ACCESS_TOKEN || '';

const graphqlQuery = async (query: string, variables?: Record<string, unknown>) => {
  try {
    const response = await fetch(`${SHOPIFY_STORE_URL}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    });
    return response.json();
  } catch (error) {
    console.error('Shopify API Error:', error);
    return null;
  }
};

export const shopifyAPI = {
  async getProducts(first = 20, query = '') {
    const gqlQuery = `
      query GetProducts($first: Int!, $query: String) {
        products(first: $first, query: $query) {
          nodes {
            id
            title
            handle
            description
            featuredImage {
              url
              alt
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            tags
          }
        }
      }
    `;
    const data = await graphqlQuery(gqlQuery, { first, query });
    return data?.data?.products?.nodes || [];
  },

  async getProductByHandle(handle: string) {
    const gqlQuery = `
      query GetProduct($handle: String!) {
        productByHandle(handle: $handle) {
          id
          title
          handle
          description
          descriptionHtml
          featuredImage {
            url
            alt
          }
          images(first: 10) {
            nodes {
              url
              alt
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 10) {
            nodes {
              id
              title
              selectedOptions {
                name
                value
              }
              price {
                amount
                currencyCode
              }
            }
          }
          collections(first: 5) {
            nodes {
              handle
              title
            }
          }
          tags
          metafields(identifiers: [
            { namespace: "custom", key: "seo_title" }
            { namespace: "custom", key: "seo_description" }
          ]) {
            key
            value
          }
        }
      }
    `;
    const data = await graphqlQuery(gqlQuery, { handle });
    return data?.data?.productByHandle || null;
  },

  async getCollections() {
    const gqlQuery = `
      query GetCollections {
        collections(first: 20) {
          nodes {
            id
            handle
            title
            description
            image {
              url
              alt
            }
          }
        }
      }
    `;
    const data = await graphqlQuery(gqlQuery);
    return data?.data?.collections?.nodes || [];
  },

  async getCollectionByHandle(handle: string, first = 20) {
    const gqlQuery = `
      query GetCollection($handle: String!, $first: Int!) {
        collectionByHandle(handle: $handle) {
          id
          handle
          title
          description
          descriptionHtml
          image {
            url
            alt
          }
          products(first: $first) {
            nodes {
              id
              title
              handle
              description
              featuredImage {
                url
                alt
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              tags
            }
          }
        }
      }
    `;
    const data = await graphqlQuery(gqlQuery, { handle, first });
    return data?.data?.collectionByHandle || null;
  },

  async getCustomerAccessTokenCreate(email: string, password: string) {
    const gqlQuery = `
      mutation CreateAccessToken($input: CustomerAccessTokenCreateInput!) {
        customerAccessTokenCreate(input: $input) {
          customerAccessToken {
            accessToken
            expiresAt
          }
          customerUserErrors {
            code
            field
            message
          }
        }
      }
    `;
    const data = await graphqlQuery(gqlQuery, {
      input: { email, password },
    });
    return data?.data?.customerAccessTokenCreate || null;
  },

  async getCustomer(accessToken: string) {
    const gqlQuery = `
      query GetCustomer($customerAccessToken: String!) {
        customer(customerAccessToken: $customerAccessToken) {
          id
          firstName
          lastName
          email
          phone
          createdAt
        }
      }
    `;
    const data = await graphqlQuery(gqlQuery, { customerAccessToken: accessToken });
    return data?.data?.customer || null;
  },
};
