import { describe, expect, it } from "vitest";
import { $URL } from "../src";

describe("$URL constructor", () => {
  it("should throw a TypeError if input is not a string", () => {
    expect(() => new $URL(undefined)).toThrow(TypeError);
    expect(() => new $URL(undefined)).toThrow(TypeError);
    expect(() => new $URL(123)).toThrow(TypeError);
    expect(() => new $URL({})).toThrow(TypeError);
  });
  it("should parse a URL string correctly", () => {
    const url = new $URL("https://example.com/path?query=value#hash");
    expect(url.protocol).toBe("https:");
    expect(url.host).toBe("example.com");
    expect(url.pathname).toBe("/path");
    expect(url.query).toEqual({ query: "value" });
    expect(url.hash).toBe("hash");
  });
});
describe("$URL getters", () => {
  it("should return the correct values", () => {
    const url = new $URL("https://example.com/path?query=value#hash");
    expect(url.hostname).toBe("example.com");
    expect(url.port).toBe("");
    expect(url.username).toBe("");
    expect(url.password).toBe("");
    expect(url.hasProtocol).toBe(true);
    expect(url.isAbsolute).toBe(true);
    expect(url.search).toBe("?query=value");
    expect(url.searchParams.get("query")).toBe("value");
    expect(url.origin).toBe("https://example.com");
    expect(url.fullpath).toBe("/path?query=value#hash");
    expect(url.encodedAuth).toBe("");
    expect(url.href).toBe("https://example.com/path?query=value#hash");
  });
});
describe("$URL append", () => {
  it("should throw an error if the URL to append has a protocol", () => {
    const url1 = new $URL("https://example.com/path");
    const url2 = new $URL("http://example.com/path");
    expect(() => url1.append(url2)).toThrow(Error);
  });
  it("should append the URL correctly", () => {
    const url1 = new $URL("https://example.com/path?query=value#hash");
    const url2 = new $URL("/newpath?newquery=newvalue#newhash");
    url1.append(url2);
    expect(url1.href).toBe(
      "https://example.com/newpath?newquery=newvalue#newhash"
    );
  });
});
describe("$URL toString", () => {
  it("should return the correct string representation", () => {
    const url = new $URL("https://example.com/path?query=value#hash");
    expect(url.toString()).toBe("https://example.com/path?query=value#hash");
  });
});
