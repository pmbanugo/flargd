import { createFlagKey } from "../flag";
import { describe, expect, it } from "vitest";

describe("createFlagKey", () => {
  it("given 'public' as prefix, should return key that starts with 'public:'", () => {
    const key = createFlagKey({ app: "demo", flagName: "test" });
    expect(key).to.equal("public:demo:flag:test");
  });

  it("should return key using the specified prefix", () => {
    const key = createFlagKey({
      prefix: "edge",
      app: "demo",
      flagName: "test",
    });
    expect(key).to.equal("edge:demo:flag:test");
  });
});
