/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  env: {
    DATE: "rq3Fsd7rWxQfLjbMCZElYinRJbEiX9XpvjKzMNF1QuiMVi0oC5upAjvQHt5c5m5zXjgKLa1F3qr3cPlF1Q2tN0oLjNlDfRzRJmyX99OjzpIaSjdINjRcF8M1bTpv3Y4q7EjK9Qi9GJvyv2QkH7VUzJgWx7VUvZF1I7VUz9XUzJgWz2QkH7VUzJgW(israeloduguwaadeboyegaoyindamola-98698156915-1vni5vny01i5vi715-vboi55bo1yb08o5yhjny18yho9wjhjdhbdy8&^%%*I$%$%%&PKMNNB<MHNJKJM<Thisisakeyyoushouldnotbeableto8849p84-",
    ACCESS_COOKIE: "kgrb9qufoyorhhfkhfjmnfm",
  },
};

export default nextConfig;
