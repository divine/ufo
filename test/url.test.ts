import { describe, expect, test } from "vitest";
import { $URL } from "../src";

describe("$URL constructor", () => {
  const tests = [
    {
      // eslint-disable-next-line unicorn/no-null
      input: null,
      out: "TypeError: URL input should be string received object (null)",
    },
    {
      input: 123,
      out: "TypeError: URL input should be string received number (123)",
    },
    {
      input: {},
      out: "TypeError: URL input should be string received object ([object Object])",
    },
  ];

  for (const t of tests) {
    test(t.input + " throw", () => {
      expect(new $URL(t.input)).toThrowError(t.out);
    });
  }
});

describe("$URL getters", () => {
  const url = new $URL("https://example.com/path?query=value#hash");

  const tests = [
    { input: url.protocol, out: "https:" },
    { input: url.host, out: "example.com" },
    { input: url.pathname, out: "/path" },
    { input: url.query, out: { query: "value" } },
    { input: url.hash, out: "#hash" },
    { input: url.hostname, out: "example.com" },
    { input: url.port, out: "" },
    { input: url.username, out: "" },
    { input: url.password, out: "" },
    { input: url.hasProtocol, out: 6 },
    { input: url.isAbsolute, out: 6 },
    { input: url.search, out: "?query=value" },
    { input: url.searchParams.get("query"), out: "value" },
    { input: url.origin, out: "https://example.com" },
    { input: url.fullpath, out: "/path?query=value#hash" },
    { input: url.encodedAuth, out: "" },
    { input: url.href, out: "https://example.com/path?query=value#hash" },
    { input: url.toString(), out: "https://example.com/path?query=value#hash" },
  ];

  for (const t of tests) {
    test(JSON.stringify(t.input) + " to be " + JSON.stringify(t.out), () => {
      expect(t.input).toEqual(t.out);
    });
  }
});

describe("$URL append with protocol", () => {
  const url3 = new $URL("https://example.com/path?query=value#hash");
  const url4 = new $URL("/newpath?newquery=newvalue#newhash");
  url3.append(url4);
  expect(url3.href).toBe(
    "https://example.com/path/newpath?query=value&newquery=newvalue#newhash"
  );
});
