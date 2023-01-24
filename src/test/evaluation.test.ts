import { evaluate, calculatePercentage } from "../evaluation";
import { describe, expect, it, vi } from "vitest";

describe("given an empty parameter to calculatePercentage()", () => {
  it("should return a number between 0 and 100", async () => {
    expect(await calculatePercentage())
      .to.be.greaterThanOrEqual(0)
      .and.lessThanOrEqual(100);
  });
});

describe("passing a unique identifier to calculatePercentage()", () => {
  it("should return a number between 0 and 100", async () => {
    expect(await calculatePercentage(crypto.randomUUID()))
      .to.be.greaterThanOrEqual(0)
      .and.lessThanOrEqual(100);
  });

  it("should consisntently return the same result", async () => {
    const uuid = crypto.randomUUID();
    const [result1, result2] = await Promise.all([
      calculatePercentage(uuid),
      calculatePercentage(uuid),
    ]);

    expect(result1).equals(result2);
  });
});

describe("evaluate()", () => {
  it("should evaluate to false if userPercentage is greater than the flag's percentage", async () => {
    expect(evaluate({ percentage: 80 }, 90)).to.be.toStrictEqual({
      enable: false,
    });
  });

  it("should evaluate to true if userPercentage is less than or equal to the flag's percentage", async () => {
    expect(evaluate({ percentage: 80 }, 80)).to.be.toStrictEqual({
      enable: true,
    });
  });

  it("should evaluate to true if the flag's percentage is set to 100", async () => {
    expect(evaluate({ percentage: 100 }, 100)).to.be.toStrictEqual({
      enable: true,
    });
  });
});
