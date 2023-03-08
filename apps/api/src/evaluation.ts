import { comparator } from "./comparator";
import type { FlagPercentage } from "./flag";

function getRandomPercentage() {
  const value = crypto.getRandomValues(new Uint32Array(1))[0];
  const percentage = (value / (0xffffffff + 1)) * 100;

  return percentage;
}

async function percentageForIdentifier(identifier: string) {
  const hash = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(identifier)
  );

  const hashSum = Array.from(new Uint8Array(hash)).reduce((sum, x) => {
    sum += x;
    return sum;
  }, 0);

  return hashSum % 100;
}

export async function calculatePercentage(identifier?: string) {
  if (identifier == null || identifier.trim() === "")
    return getRandomPercentage();

  return percentageForIdentifier(identifier);
}

export function evaluate(
  { amount, conditions }: FlagPercentage,
  userPercentage: number,
  context: Record<string, string>
): { enable: boolean } {
  if (amount === 0) return { enable: false };
  if (amount === 100 && conditions.length === 0) return { enable: true };

  const pass = conditions.reduce(
    (prev, { condition, target, attribute }) =>
      prev &&
      !!context[attribute] &&
      comparator[condition](context[attribute], target),
    true
  );

  const enable = userPercentage <= amount && pass;

  return { enable };
}
