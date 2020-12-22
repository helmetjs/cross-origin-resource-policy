# Cross-Origin-Resource-Policy middleware

[![Build Status](https://travis-ci.org/helmetjs/cross-origin-resource-policy.svg?branch=master)](https://travis-ci.org/helmetjs/cross-origin-resource-policy)

This middleware sets the `Cross-Origin-Resource-Policy` header. Read about it [in the spec](https://fetch.spec.whatwg.org/#cross-origin-resource-policy-header).

Usage:

```javascript
const crossOriginResourcePolicy = require("cross-origin-resource-policy");

// Sets Cross-Origin-Resource-Policy: same-origin
app.use(crossOriginResourcePolicy({ policy: "same-origin" }));

// Sets Cross-site-Resource-Policy: same-site
app.use(crosssiteResourcePolicy({ policy: "same-site" }));
```

This has limited browser support, so this module is currently in beta. It will be likely added to the main Helmet bundle when browser adoption improves.
