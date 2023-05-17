import { createKey as createFlagKey } from "./flag";
import { createKey as createAppKey } from "./app";
import { describe, expect, it } from "vitest";

describe("given 'public' & 'demo' as team and app respectively", () => {
  it("createKey() for flags should return key 'team:public:apps:demo:flags'", () => {
    expect(createFlagKey({ app: "demo", team: "public" })).to.equal(
      "team:public:app:demo:flags"
    );
  });

  it("createKey for apps should return key 'team:public:apps'", () => {
    expect(createAppKey("public")).to.equal("team:public:apps");
  });
});
