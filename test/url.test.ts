import { describe, expect, test } from "vitest";
import { $URL } from "../src";

describe("$URL constructor", () => {
  const tests = [
    {
      // eslint-disable-next-line unicorn/no-null
      input: null,
      out: "URL input should be string received object (null)",
    },
    {
      input: 123,
      out: "URL input should be string received number (123)",
    },
    {
      input: {},
      out: "URL input should be string received object ([object Object])",
    },
  ];

  for (const t of tests) {
    test(t.input + " throw", () => {
      expect(() => new $URL(t.input)).toThrow(TypeError(t.out));
    });
  }
});

describe("$URL getters", () => {
  const url = new $URL(
    "https://john:doe@example.com:1080/path?query=value#hash"
  );

  const tests = [
    { input: url.protocol, out: "https:" },
    { input: url.host, out: "example.com:1080" },
    { input: url.auth, out: "john:doe" },
    { input: url.pathname, out: "/path" },
    { input: url.query, out: { query: "value" } },
    { input: url.hash, out: "#hash" },
    { input: url.hostname, out: "example.com" },
    { input: url.port, out: "1080" },
    { input: url.username, out: "john" },
    { input: url.password, out: "doe" },
    { input: url.hasProtocol, out: 6 },
    { input: url.isAbsolute, out: 6 },
    { input: url.search, out: "?query=value" },
    { input: url.searchParams.get("query"), out: "value" },
    { input: url.origin, out: "https://example.com:1080" },
    { input: url.fullpath, out: "/path?query=value#hash" },
    { input: url.encodedAuth, out: "john:doe" },
    {
      input: url.href,
      out: "https://john:doe@example.com:1080/path?query=value#hash",
    },
    {
      input: url.toString(),
      out: "https://john:doe@example.com:1080/path?query=value#hash",
    },
    {
      input: url.toJSON(),
      out: "https://john:doe@example.com:1080/path?query=value#hash",
    },
  ];

  for (const t of tests) {
    test(JSON.stringify(t.input) + " to be " + JSON.stringify(t.out), () => {
      expect(t.input).toEqual(t.out);
    });
  }
});

describe("$URL append", () => {
  const url = new $URL("https://example.com/path?query=value#hash");
  const url2 = new $URL("http://example.com/path");
  const path = new $URL("/newpath?newquery=newvalue#newhash");

  test("append basic", () => {
    expect(() =>
      url
        .append(path)
        .toBe("https://example.com/newpath?newquery=newvalue#newhash")
    );
  });

  test("append with protocol", () => {
    expect(() =>
      url.append(url2).toThrow("Cannot append a URL with protocold")
    );
  });
});
