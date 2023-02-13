import { json } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { PlusIcon } from "~/components/icons";
import Main from "~/components/layout/main";
import Heading from "../components/layout/heading";

interface Flag {
  name: string;
  description?: string;
  percentage: number;
  createdAt: string;
}

export const loader = async () => {
  const appName = "default";
  const response = await fetch(`${ADMIN_URL}/apps/${appName}/flags`);

  if (!response.ok) {
    //TODO: return an error
    return json<Flag[]>([]);
  }

  return json<Flag[]>(await response.json());
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <Heading title="Home" />
      <Main>
        <div className="shadow sm:overflow-hidden sm:rounded-md bg-white px-4 py-5 sm:p-6">
          <Link
            to={"/create"}
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 cursor-pointer mb-2"
          >
            <PlusIcon />
            Add Flag
          </Link>
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
                {data.map((flag, index) => {
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
                      <td className="px-6 py-4">{flag.percentage}%</td>
                      <td className="px-6 py-4">
                        <a
                          href={`/flags/${flag.name}`}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </a>
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
