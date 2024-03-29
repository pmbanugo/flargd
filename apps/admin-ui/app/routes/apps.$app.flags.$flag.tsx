import Main from "~/components/layout/main";
import Heading from "~/components/layout/heading";
import type { Condition, ConditionKeys, ContionalAttribute } from "~/constant";
import { TEAM } from "~/constant";
import type { ActionArgs, LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import FlagForm from "~/components/flag-form";
import { useLoaderData } from "@remix-run/react";
import type { Flag } from "~/types/flag";

export const action = async ({ request, params }: ActionArgs) => {
  const { app } = params;
  const formData = await request.formData();
  //TODO: Validate Data

  const flag = formData.get("name");
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

  const data = { description, percentage: flagPercentage };

  const res = await fetch(
    `${CORE_API}/teams/${TEAM}/apps/${app}/flags/${flag}`,
    {
      mode: "no-cors",
      method: "POST",
      body: JSON.stringify(data),
    }
  );

  if (res.ok) {
    return redirect(`/${app}`);
  }

  //TODO: return error messages for failures
  throw new Response("Error saving data", {
    status: 500,
  });
};

export const loader = async ({ params }: LoaderArgs) => {
  const { flag, app } = params;
  const res = await fetch(
    `${CORE_API}/teams/${TEAM}/apps/${app}/flags/${flag}`,
    {
      mode: "no-cors",
    }
  );
  if (res.ok) {
    return json(await res.json<Flag>());
  }

  throw new Response("Not Found", {
    status: 404,
  });
};

export default function Edit() {
  const flag = useLoaderData<typeof loader>();
  return (
    <>
      <Heading title="Edit Flag" />
      <Main>
        <FlagForm flag={flag} />
      </Main>
    </>
  );
}
