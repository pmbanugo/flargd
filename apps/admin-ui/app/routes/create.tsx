import { Form } from "@remix-run/react";
import Main from "~/components/layout/main";
import Heading from "~/components/layout/heading";
import Tagify from "@yaireo/tagify";
import { useRef, useState } from "react";
import { TrashIcon } from "~/components/icons";
import type { Condition, ConditionKeys, ContionalAttribute } from "~/constant";
import { CF_GEOGRAPHIC_PROPERTIES, CONDITIONS } from "~/constant";
import type { ActionArgs } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  //TODO: Validate Data

  const flagName = formData.get("name");
  const description = formData.get("description");
  const percentage = formData.get("percentage");
  const attributes = formData.getAll("attribute") as ContionalAttribute[];
  const conditions = formData.getAll("condition") as ConditionKeys[];
  const targets = formData.getAll("tags") as string[];

  const deducedConditions = attributes.reduce<Condition[]>(
    (previous, current, index) => {
      const condition = conditions[index];
      const target = ["in_list", "not_in_list"].includes(condition)
        ? targets[index].split(",")
        : targets[index];
      previous.push({ attribute: current, condition, target });
      return previous;
    },
    []
  );
  const flagPercentage = {
    amount: Number(percentage),
    conditions: deducedConditions,
  };

  const data = { flagName, description, percentage: flagPercentage };

  const res = await fetch(`${ADMIN_URL}/apps/default/flag`, {
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

const AttributeOptions = () => (
  <>
    {Object.entries(CF_GEOGRAPHIC_PROPERTIES).map(([key, value]) => (
      <option key={key} value={key}>
        {value}
      </option>
    ))}
  </>
);

const ConditionOptions = () => (
  <>
    {Object.entries(CONDITIONS).map(([key, value]) => (
      <option key={key} value={key}>
        {value}
      </option>
    ))}
  </>
);

export default function Index() {
  const tagifyInstances = useRef(new Map());
  const [ids, setIds] = useState([crypto.randomUUID()]);

  const renderConditions = () =>
    ids.map((id) => (
      <div key={id} className="space-x-4">
        <select
          name="attribute"
          className="w-1/5 mt-0 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
        >
          <option>Select Attribute</option>
          <AttributeOptions />
        </select>
        <select
          name="condition"
          className=" w-1/5 mt-0 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
        >
          <option>Select Condition</option>
          <ConditionOptions />
        </select>

        {/* TODO: dynamically change the input type based on the condition */}
        <input
          className="target"
          ref={(ref) => {
            if (ref && !tagifyInstances.current.has(id)) {
              tagifyInstances.current.set(
                id,
                new Tagify(ref, {
                  id,
                  originalInputValueFormat: (values) =>
                    values.map((item) => item.value).join(","),
                })
              );
            }
          }}
          name="tags"
          placeholder="Target"
        />

        <TrashIcon
          onClick={() => {
            tagifyInstances.current.delete(id);
            setIds(ids.filter((x) => x !== id));
          }}
          className="h-5 text-gray-500 cursor-pointer inline-block mt-3"
        />
      </div>
    ));

  return (
    <>
      <Heading title="Create Flag" />
      <Main>
        <Form method="post">
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
              <label className="block">
                Name
                <input
                  required
                  type="text"
                  name="name"
                  className="mt-0 block w-1/3 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                  placeholder="Flag-Name"
                />
              </label>
              <label className="block">
                Description
                <input
                  type="text"
                  name="description"
                  className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                  placeholder=""
                />
              </label>
              <label className="block">
                Percentage
                <input
                  name="percentage"
                  required
                  type="number"
                  min={0}
                  max={100}
                  className="mt-0 block w-1/3 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                  placeholder="0"
                />
              </label>
              <fieldset className="border-2 p-2">
                <legend className=" font-semibold px-2">Conditions</legend>
                {renderConditions()}
                <div className="mt-2">
                  <button
                    onClick={() => setIds([...ids, crypto.randomUUID()])}
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <svg
                      className="-ml-1 mr-2 h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"
                      />
                    </svg>
                    Add
                  </button>
                </div>
              </fieldset>
              <div>
                <button
                  type="submit"
                  className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </Form>
      </Main>
    </>
  );
}
