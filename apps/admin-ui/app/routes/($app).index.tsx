import type { ActionArgs, LoaderArgs } from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";
import { Form, Link, useLoaderData, useNavigate } from "@remix-run/react";
import { PlusIcon, TrashIcon } from "~/components/icons";
import Main from "~/components/layout/main";
import Heading from "~/components/layout/heading";
import { TEAM } from "~/constant";
import type { TeamApp } from "~/types/app";
import type { Flag } from "~/types/flag";

export const loader = async ({ params }: LoaderArgs) => {
  const { app } = params;
  let flags: Flag[];

  const appsResponse = await fetch(`${CORE_API}/teams/${TEAM}/apps`);
  if (!appsResponse.ok) throw new Error("Error getting team data");
  const teamApp = await appsResponse.json<TeamApp>();

  flags =
    app !== undefined
      ? await fetchFlags(app)
      : await fetchFlags(teamApp.defaultApp);

  return json({
    flags,
    selectedApp: app ?? teamApp!.defaultApp,
    apps: teamApp!.apps,
  });
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  //TODO: Validate Data
  const flag = formData.get("flag");
  const app = formData.get("app");

  const res = await fetch(
    `${CORE_API}/teams/${TEAM}/apps/${app}/flags/${flag}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    return json(res.status);
  }

  return redirect("/");
};

export default function Index() {
  const { apps, flags, selectedApp } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return (
    <>
      <Heading title="Home" />
      <Main>
        <div className="shadow sm:overflow-hidden sm:rounded-md bg-white px-4 py-5 sm:p-6">
          <div className="flex justify-between mb-2">
            <div>
              <Link
                to={"/create"}
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 cursor-pointer"
              >
                <PlusIcon />
                Add Flag
              </Link>
            </div>
            <div className="grow max-w-sm">
              <label className="">
                <span className="text-gray-700">You're viewing flags for:</span>
                <select
                  className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={(e) => navigate(`/${e.target.value}`)}
                >
                  <option value={""}>Select App</option>
                  {apps.map(({ name }) => (
                    <option key={name} selected={selectedApp === name}>
                      {name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Flag name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Percentage
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {flags.map((flag, index) => {
                  return (
                    <tr
                      key={flag.name}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } border-b dark:bg-gray-900 dark:border-gray-700`}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {flag.name}
                      </th>
                      <td className="px-6 py-4">{flag.description}</td>
                      <td className="px-6 py-4">{flag.percentage.amount}%</td>
                      <td className="px-6 py-4">
                        <a
                          href={`/flags/${flag.name}`}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </a>
                        <Form method="post" className="inline-block">
                          <input type="hidden" name="flag" value={flag.name} />
                          <input type="hidden" name="app" value={selectedApp} />
                          <button type="submit" className="">
                            <TrashIcon className="h-4 text-gray-500 dark:text-white cursor-pointer inline-block ml-6" />
                          </button>
                        </Form>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Main>
    </>
  );
}

async function fetchFlags(app: string) {
  const flagsResponse = await fetch(`${CORE_API}/apps/${app}/flags`);
  if (flagsResponse.ok) return await flagsResponse.json<Flag[]>();
  return [];
}
