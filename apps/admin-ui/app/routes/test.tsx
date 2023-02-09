import { useEffect, useRef } from "react";
import type { TagData } from "@yaireo/tagify";
import Tagify from "@yaireo/tagify";

import tagifyStyles from "@yaireo/tagify/dist/tagify.css";
import type { ActionArgs, LinksFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Form, useActionData } from "@remix-run/react";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tagifyStyles },
];

export async function action({ request }: ActionArgs) {
  const body = await request.formData();

  for (const [key, value] of body) {
    console.log({ [key]: value });
  }
  return json({ get: body.get("tags"), getAll: body.getAll("tags") });
}

export default function Index() {
  const conditionsRef = useRef<HTMLInputElement>(null);
  const tagify = useRef<Tagify<TagData> | null>(null);
  const data = useActionData<typeof action>();
  console.log({ data: (data?.get as string)?.split(",") });

  useEffect(() => {
    if (tagify?.current === null) {
      tagify.current = new Tagify(conditionsRef.current as HTMLInputElement, {
        originalInputValueFormat: (values) =>
          values.map((item) => item.value).join(","),
      });
    }
  }, []);

  return (
    <div>
      <h1>Welcome to Remix</h1>
      {/* <p>{data?.get}</p> */}

      <Form method="post">
        <label className="block">
          <span className="text-gray-700">Full name</span>
          <input
            type="text"
            name="text"
            className="
                    mt-1
                    block
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
            placeholder=""
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Input (range)</span>
          <input name="range" type="range" className="mt-1 block w-full" />
        </label>
        <br />
        <div>
          <label>Conditions</label>
          <input ref={conditionsRef} name="tags" />
        </div>
        <button type={"submit"}>Submit</button>
      </Form>
    </div>
  );
}
