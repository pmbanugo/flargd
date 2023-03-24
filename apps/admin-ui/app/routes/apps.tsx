import type { ActionArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import Main from "~/components/layout/main";
import Heading from "~/components/layout/heading";
import { TEAM } from "~/constant";
import { useEffect, useRef, useState } from "react";
import * as RadixToast from "@radix-ui/react-toast";

interface App {
  name: string;
  description?: string;
  isDefault?: true;
}

const ACTION_RESULT = { OK: "OK", Failed: "FAILED" } as const;

export const loader = async () => {
  const response = await fetch(`${CORE_API}/teams/${TEAM}/apps`);

  if (response.ok) {
    return json<App[]>(await response.json());
  }
  //TODO: maybe return an error?
  return json<App[]>([]);
};

export const action = async ({ request }: ActionArgs) => {
  //TODO: Validate Data
  const formData = await request.formData();

  const res = await fetch(
    `${CORE_API}/teams/${TEAM}/apps/${formData.get("name")}`,
    {
      mode: "no-cors",
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData)),
    }
  );

  if (res.ok) {
    return json(ACTION_RESULT.OK);
  }

  return json(ACTION_RESULT.Failed);
};

export default function Index() {
  const formRef = useRef<HTMLFormElement>(null);
  const apps = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();
  const [showMessage, setShowMessage] = useState(false);

  const isReloading =
    navigation.state === "loading" &&
    navigation.formData != null &&
    navigation.formAction === navigation.location.pathname;

  useEffect(() => {
    if (isReloading && actionData === ACTION_RESULT.OK) {
      formRef.current?.reset();
    }
    if (isReloading && actionData) {
      setShowMessage(true);
    }
  }, [isReloading, actionData]);

  return (
    <>
      <Heading title="Apps" />
      <Main>
        <Form method={"post"} ref={formRef}>
          <div className="shadow sm:overflow-hidden sm:rounded-md bg-white px-4 py-5 sm:p-6">
            <div className=" text-xl font-semibold mb-2">Create App</div>
            <div className="max-w-md mb-3">
              <div className="grid grid-cols-1 gap-3">
                <label className="block">
                  <span className="text-gray-700">Name</span>
                  <input
                    type="text"
                    className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                    required
                    name="name"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Description</span>
                  <textarea
                    className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                    rows={2}
                    name="description"
                  ></textarea>
                </label>
                <div className="block">
                  <div className="mt-2">
                    <div>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="isDefault"
                          className="border-gray-300 border-2 text-black focus:border-gray-300 focus:ring-black"
                        />
                        <span className="ml-2">Default</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={navigation.state === "submitting"}
              className="text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {navigation.state === "submitting" ? "Submitting" : "Submit"}
            </button>
          </div>
        </Form>

        <div className="shadow sm:overflow-hidden sm:rounded-md bg-white px-4 py-5 sm:p-6 mt-2">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Default
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {apps.map((app, index) => {
                  return (
                    <tr
                      key={app.name}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } border-b dark:bg-gray-900 dark:border-gray-700`}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {app.name}
                      </th>
                      <td className="px-6 py-4">
                        {app.isDefault ? "YES" : ""}
                      </td>
                      <td className="px-6 py-4">{app.description}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Main>

      {showMessage && (
        <Toast
          succeeded={actionData === ACTION_RESULT.OK}
          onOpenChange={setShowMessage}
        />
      )}
    </>
  );
}

const Toast = ({
  succeeded,
  onOpenChange,
}: {
  succeeded: boolean;
  onOpenChange: (open: boolean) => void;
}) => (
  <RadixToast.Provider swipeDirection="right" duration={1500}>
    <RadixToast.Root
      onOpenChange={onOpenChange}
      className={
        (succeeded ? "bg-green-200" : "bg-red-200") +
        " rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
      }
    >
      <RadixToast.Title className="[grid-area:_title] text-[15px]">
        {succeeded ? "Saved Successfully" : "Error Saving ☹️"}
      </RadixToast.Title>
    </RadixToast.Root>
    <RadixToast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px]  max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
  </RadixToast.Provider>
);
