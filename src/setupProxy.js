const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = (app) => {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://www.moi.gov.kw",
      changeOrigin: true,
      pathRewrite: {
        "^/api/traffic-violation": "/mfservices/traffic-violation",
      },
    }),
  )
}

     