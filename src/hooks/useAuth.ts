import { useState } from 'react';
import { shopifyAPI } from '../lib/shopify';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  createdAt: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem('shopify_access_token')
  );

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await shopifyAPI.getCustomerAccessTokenCreate(email, password);
      if (response?.customerUserErrors?.length > 0) {
        setError(response.customerUserErrors[0].message);
        return false;
      }

      const token = response?.customerAccessToken?.accessToken;
      if (token) {
        setAccessToken(token);
        localStorage.setItem('shopify_access_token', token);

        const customer = await shopifyAPI.getCustomer(token);
        setUser(customer);
        return true;
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem('shopify_access_token');
  };

  return {
    user,
    loading,
    error,
    accessToken,
    login,
    logout,
    isAuthenticated: !!user && !!accessToken,
  };
}
