import { Flag } from "./flag";

//TODO: write test
export function evaluate(
  { percentage }: Flag,
  userPercentage: number
): { enable: boolean } {
  if (percentage === 0) return { enable: false };
  if (percentage === 100) return { enable: true };

  const enable = userPercentage <= percentage;
  return { enable };
}

//TODO: write test
function calculatePercentage(value: number) {
  return (value / (0xffffffff + 1)) * 100;
}

export function getRandomPercentage() {
  const identifier = crypto.getRandomValues(new Uint32Array(1))[0];
  const percentage = calculatePercentage(identifier);

  return { percentage, identifier };
}

export function getUserPercentage(identifier: number) {
  return { percentage: calculatePercentage(identifier), identifier };
}
