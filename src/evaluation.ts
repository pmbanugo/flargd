import { Flag } from "./flag";

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
  { percentage }: Pick<Flag, "percentage">,
  userPercentage: number
): { enable: boolean } {
  if (percentage === 0) return { enable: false };
  if (percentage === 100) return { enable: true };

  const enable = userPercentage <= percentage;
  return { enable };
}
