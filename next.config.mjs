/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/admin/orders",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
