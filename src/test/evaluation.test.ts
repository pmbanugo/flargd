import { evaluate, calculatePercentage } from "../evaluation";
import { describe, expect, it } from "vitest";
import type { FlagPercentage } from "../flag";

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

describe("evaluating flags without conditions", () => {
  it("should evaluate to false if userPercentage is greater than the flag's percentage", async () => {
    expect(evaluate({ amount: 80, conditions: [] }, 90, {})).toStrictEqual({
      enable: false,
    });
  });

  it("should evaluate to true if userPercentage is less than or equal to the flag's percentage", async () => {
    expect(evaluate({ amount: 80, conditions: [] }, 80, {})).toStrictEqual({
      enable: true,
    });
  });

  it("should evaluate to true if the flag's percentage is set to 100", async () => {
    expect(evaluate({ amount: 100, conditions: [] }, 100, {})).toStrictEqual({
      enable: true,
    });
  });
});

describe("evaluating flags where the target 'is' equal to the input", () => {
  const flag: FlagPercentage = {
    amount: 80,
    conditions: [{ attribute: "city", condition: "is", target: "Berlin" }],
  };

  it("should evaluate to false if 'city' is not Berlin", async () => {
    expect(evaluate(flag, 80, { city: "Munich" })).toStrictEqual({
      enable: false,
    });
  });

  it("should evaluate to true if 'city' is Berlin", async () => {
    expect(evaluate(flag, 80, { city: "Berlin" })).toStrictEqual({
      enable: true,
    });
  });
});

describe("evaluating flags where the target 'is_not' equal to the input", () => {
  const flag: FlagPercentage = {
    amount: 80,
    conditions: [{ attribute: "city", condition: "is_not", target: "Cologne" }],
  };

  it("should evaluate to true if city is not Cologne", async () => {
    expect(evaluate(flag, 80, { city: "Munich" })).toStrictEqual({
      enable: true,
    });
  });

  it("should evaluate to false if city is Cologne", async () => {
    expect(evaluate(flag, 80, { city: "Cologne" })).toStrictEqual({
      enable: false,
    });
  });
});

describe("evaluating flags where the input 'contains' the target", () => {
  const flag: FlagPercentage = {
    amount: 80,
    conditions: [
      { attribute: "email", condition: "contains", target: "@pmbanugo.me" },
    ],
  };

  it("should evaluate to true if email contains @pmbanugo.me", async () => {
    expect(evaluate(flag, 80, { email: "peter@pmbanugo.me" })).toStrictEqual({
      enable: true,
    });
  });

  it("should evaluate to false if email doesn't contain @pmbanugo.me", async () => {
    expect(evaluate(flag, 80, { email: "per@gmail.com" })).toStrictEqual({
      enable: false,
    });
  });
});

describe("evaluating flags where the input 'does_not_contain' the target", () => {
  const flag: FlagPercentage = {
    amount: 80,
    conditions: [
      {
        attribute: "email",
        condition: "does_not_contain",
        target: "@pmbanugo.me",
      },
    ],
  };

  it("should evaluate to false if email contains @pmbanugo.me", async () => {
    expect(evaluate(flag, 80, { email: "peter@pmbanugo.me" })).toStrictEqual({
      enable: false,
    });
  });

  it("should evaluate to true if email doesn't contain @pmbanugo.me", async () => {
    expect(evaluate(flag, 80, { email: "per@gmail.com" })).toStrictEqual({
      enable: true,
    });
  });
});

describe("evaluating flags where the input is 'in_list' of target", () => {
  const flag: FlagPercentage = {
    amount: 80,
    conditions: [
      {
        attribute: "city",
        condition: "in_list",
        target: ["Lagos", "Anambra"],
      },
    ],
  };

  it("should evaluate to false if 'Paris' is not in the target list", async () => {
    expect(evaluate(flag, 80, { city: "Paris" })).toStrictEqual({
      enable: false,
    });
  });

  it("should evaluate to true if 'Lagos' is in the target list", async () => {
    expect(evaluate(flag, 80, { city: "Lagos" })).toStrictEqual({
      enable: true,
    });
  });
});

describe("evaluating flags where the input is 'not_in_list' of target", () => {
  const flag: FlagPercentage = {
    amount: 80,
    conditions: [
      {
        attribute: "city",
        condition: "not_in_list",
        target: ["Lagos", "Anambra"],
      },
    ],
  };

  it("should evaluate to true if 'Paris' is not in the target list", async () => {
    expect(evaluate(flag, 80, { city: "Paris" })).toStrictEqual({
      enable: true,
    });
  });

  it("should evaluate to false if 'Lagos' is in the target list", async () => {
    expect(evaluate(flag, 80, { city: "Lagos" })).toStrictEqual({
      enable: false,
    });
  });
});

describe("evaluating flags with multiple conditions", () => {
  const flag: FlagPercentage = {
    amount: 80,
    conditions: [
      {
        attribute: "email",
        condition: "contains",
        target: "@pmbanugo.me",
      },
      {
        attribute: "city",
        condition: "in_list",
        target: ["Lagos", "Anambra"],
      },
    ],
  };

  it("should evaluate to false if one of the conditions fails", async () => {
    expect(
      evaluate(flag, 80, { city: "Paris", email: "peter@pmbanugo.me" })
    ).toStrictEqual({
      enable: false,
    });

    expect(
      evaluate(flag, 80, { city: "Lagos", email: "peter@gmail.com" })
    ).toStrictEqual({
      enable: false,
    });

    expect(evaluate(flag, 80, { city: "Lagos" })).toStrictEqual({
      enable: false,
    });
  });

  it("should evaluate to true if all the conditions passes", async () => {
    expect(
      evaluate(flag, 80, { city: "Lagos", email: "peter@pmbanugo.me" })
    ).toStrictEqual({
      enable: true,
    });
  });
});
