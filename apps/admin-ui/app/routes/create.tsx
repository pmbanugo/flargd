import Main from "~/components/layout/main";
import Heading from "~/components/layout/heading";
import type { Condition, ConditionKeys, ContionalAttribute } from "~/constant";
import type { ActionArgs } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import FlagForm from "~/components/flag-form";

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  //TODO: Validate Data

  const flagName = formData.get("name");
  const description = formData.get("description");
  const percentage = formData.get("percentage");
  const attributes = formData.getAll("attribute") as ContionalAttribute[];
  const conditions = formData.getAll("condition") as ConditionKeys[];
  const targets = formData.getAll("tags") as string[];

  const deducedConditions = attributes
    .filter((x) => !!x)
    .reduce<Condition[]>((previous, current, index) => {
      const condition = conditions[index];
      const target = ["in_list", "not_in_list"].includes(condition)
        ? targets[index].split(",")
        : targets[index];
      previous.push({ attribute: current, condition, target });
      return previous;
    }, []);
  const flagPercentage = {
    amount: Number(percentage),
    conditions: deducedConditions,
  };

  const data = { flagName, description, percentage: flagPercentage };

  const res = await fetch(`${CORE_API}/apps/default/flags`, {
    mode: "no-cors",
    method: "POST",
    body: JSON.stringify(data),
  });

  if (res.ok) {
    return redirect("/");
  }

  //TODO: return error messages for failures
  return redirect("/create");
};

export default function Create() {
  return (
    <>
      <Heading title="Create Flag" />
      <Main>
        <FlagForm />
      </Main>
    </>
  );
}
