import { Condition } from "./flag";

export const comparator: Readonly<
  Record<Condition, (input: any, target: any) => boolean>
> = {
  is: (input: string, target: string) =>
    typeof target === "string" && typeof input === "string" && target === input,
  is_not: (input: string, target: string) =>
    typeof target === "string" && typeof input === "string" && target !== input,
  contains: (input: string, target: string) =>
    typeof target === "string" &&
    typeof input === "string" &&
    input.includes(target),
  does_not_contain: (input: string, target: string) =>
    typeof target === "string" &&
    typeof input === "string" &&
    !input.includes(target),
  in_list: (input: string, target: Array<string>) =>
    Array.isArray(target) &&
    typeof input === "string" &&
    target.includes(input),
  not_in_list: (input: string, target: Array<string>) =>
    Array.isArray(target) &&
    typeof input === "string" &&
    !target.includes(input),
};
