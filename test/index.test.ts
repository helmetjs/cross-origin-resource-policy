import connect from "connect";
import supertest from "supertest";
import { IncomingMessage, ServerResponse } from "http";

import crossOriginResourcePolicy = require("..");

describe("crossOriginResourcePolicy", () => {
  function makeApp(middleware: ReturnType<typeof crossOriginResourcePolicy>) {
    const result = connect();
    result.use(middleware);
    result.use((_req: IncomingMessage, res: ServerResponse) => {
      res.end("Hello world!");
    });
    return result;
  }

  it("sets the header value to same-origin with no argument", () => {
    const app = makeApp(crossOriginResourcePolicy());
    return supertest(app)
      .get("/")
      .expect("Cross-Origin-Resource-Policy", "same-origin")
      .expect("Hello world!");
  });

  it("sets the header value to same-origin with an empty object argument", () => {
    const app = makeApp(crossOriginResourcePolicy({}));
    return supertest(app)
      .get("/")
      .expect("Cross-Origin-Resource-Policy", "same-origin")
      .expect("Hello world!");
  });

  it("can set the value to same-origin", () => {
    const app = makeApp(crossOriginResourcePolicy({ policy: "same-origin" }));
    return supertest(app)
      .get("/")
      .expect("Cross-Origin-Resource-Policy", "same-origin")
      .expect("Hello world!");
  });

  it("can set the value to same-site", () => {
    const app = makeApp(crossOriginResourcePolicy({ policy: "same-site" }));
    return supertest(app)
      .get("/")
      .expect("Cross-Origin-Resource-Policy", "same-site")
      .expect("Hello world!");
  });

  it("errors with other values", () => {
    [null, "", "bogus", "SAME-ORIGIN"].forEach((policy) => {
      expect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        crossOriginResourcePolicy({ policy } as any);
      }).toThrow();
    });
  });

  it("names its function and middleware", () => {
    expect(crossOriginResourcePolicy.name).toStrictEqual(
      "crossOriginResourcePolicy"
    );
    expect(crossOriginResourcePolicy().name).toStrictEqual(
      "crossOriginResourcePolicy"
    );
  });
});
