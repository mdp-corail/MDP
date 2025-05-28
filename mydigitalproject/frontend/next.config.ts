const nextConfig = {
    // output: "export",
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "Content-Security-Policy",
                        value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://connect.facebook.net https://*.facebook.com https://*.fbcdn.net https://*.facebook.net blob: data:;
              style-src 'self' 'unsafe-inline';
              img-src * blob: data:;
              frame-src https://www.facebook.com;
              connect-src *;
              font-src 'self' data:;
            `.replace(/\s{2,}/g, " ").trim(),
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;