import { Flag } from "./flag";

function percentageForNumber(value: number) {
  return (value / (0xffffffff + 1)) * 100;
}

function getRandomPercentage() {
  const identifier = crypto.getRandomValues(new Uint32Array(1))[0];
  const percentage = percentageForNumber(identifier);

  return { percentage, identifier };
}

async function percentageByHashSum(identifier: string) {
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

async function percentageForIdentifier(identifier: number | string) {
  if (typeof identifier === "number")
    return {
      percentage: percentageForNumber(identifier),
      identifier: String(identifier),
    };

  return { percentage: await percentageByHashSum(identifier), identifier };
}

export async function calculatePercentage(identifier?: string) {
  if (identifier == null || identifier.trim() === "")
    return getRandomPercentage();

  const numericIdentifier = Number(identifier);
  return Number.isNaN(numericIdentifier)
    ? await percentageForIdentifier(identifier)
    : await percentageForIdentifier(numericIdentifier);
}

export function evaluate(
  { percentage }: Flag,
  userPercentage: number
): { enable: boolean } {
  if (percentage === 0) return { enable: false };
  if (percentage === 100) return { enable: true };

  const enable = userPercentage <= percentage;
  return { enable };
}
