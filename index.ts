import { IncomingMessage, ServerResponse } from "http";

interface CrossOriginResourcePolicyOptions {
  policy?: string;
}

function getHeaderValue(options: Readonly<CrossOriginResourcePolicyOptions>) {
  const { policy = "same-origin" } = options;

  if (policy !== "same-origin" && policy !== "same-site") {
    throw new Error(
      'Cross-Origin-Resource-Policy must be "same-origin" or "same-site"'
    );
  }

  return policy;
}

export = function crossOriginResourcePolicy(
  options: Readonly<CrossOriginResourcePolicyOptions> = {}
) {
  const headerValue = getHeaderValue(options);

  return function crossOriginResourcePolicy(
    _req: IncomingMessage,
    res: ServerResponse,
    next: () => void
  ) {
    res.setHeader("Cross-Origin-Resource-Policy", headerValue);
    next();
  };
};
