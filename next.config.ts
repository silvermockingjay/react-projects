import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  distDir: './dist',
  images: {
    domains: ['rickandmortyapi.com'],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
