export const CF_GEOGRAPHIC_PROPERTIES = {
  city: "City",
  country: "Country",
  continent: "Continent",
  postalCode: "Postal Code",
  region: "Region",
  ip: "IP",
} as const;

export const CONDITIONS = {
  is: "Is",
  is_not: "Is not",
  contains: "Contains",
  does_not_contain: "Doesn't contain",
  in_list: "Is in list",
  not_in_list: "Is not in list",
} as const;

export type ContionalAttribute = keyof typeof CF_GEOGRAPHIC_PROPERTIES;
export type ConditionKeys = keyof typeof CONDITIONS;
export type Condition = {
  attribute: ContionalAttribute;
  condition: ConditionKeys;
  target: string | string[];
};

export const TEAM = "public"; //TODO: should come from a config or user scoped data after authentication
