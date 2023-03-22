import { Form } from "@remix-run/react";
import Tagify from "@yaireo/tagify";
import { useRef, useState } from "react";
import { CF_GEOGRAPHIC_PROPERTIES, CONDITIONS } from "~/constant";
import type { Flag } from "~/types/flag";
import { TrashIcon, PlusIcon } from "./icons";

export default function FlagForm({ flag }: { flag?: Flag }) {
  const shouldEditConditions = flag && flag.percentage.conditions.length > 0;
  const tagifyInstances = useRef(new Map());

  const [ids, setIds] = useState(
    shouldEditConditions
      ? flag.percentage.conditions.map((_, index) => `${randomId()}_${index}`)
      : [randomId()]
  );

  const renderConditions = () =>
    ids.map((id, index) => {
      const hasDefaultValue =
        shouldEditConditions && Number(id.split("_")[1]) === index;

      return (
        <div key={id} className="space-x-4">
          <select
            name="attribute"
            className="w-1/5 mt-0 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
            defaultValue={
              hasDefaultValue
                ? flag.percentage.conditions[index].attribute
                : undefined
            }
          >
            <option value={""}>Select Attribute</option>
            <AttributeOptions />
          </select>
          <select
            name="condition"
            className=" w-1/5 mt-0 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
            defaultValue={
              hasDefaultValue
                ? flag.percentage.conditions[index].condition
                : undefined
            }
          >
            <option value={""}>Select Condition</option>
            <ConditionOptions />
          </select>

          {/* TODO: dynamically change the input type based on the condition */}
          <input
            className="target"
            defaultValue={
              hasDefaultValue
                ? flag.percentage.conditions[index].target
                : undefined
            }
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
      );
    });

  return (
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
              defaultValue={flag?.name}
            />
          </label>
          <label className="block">
            Description
            <input
              type="text"
              name="description"
              className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
              placeholder="Description for the flag name"
              defaultValue={flag?.description}
            />
          </label>
          <label className="block">
            Percentage
            <input
              name="percentage"
              required
              type="number"
              defaultValue={flag?.percentage?.amount ?? 100}
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
                onClick={() => setIds([...ids, randomId()])}
                type="button"
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <PlusIcon />
                Add
              </button>
            </div>
          </fieldset>
          <div>
            <button
              type="submit"
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2"
            >
              {flag ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
}

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

function randomId() {
  return Math.random().toString(32).slice(2);
}
