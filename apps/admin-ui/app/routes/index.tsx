import { Form } from "@remix-run/react";
import Main from "~/components/layout/main";
import Heading from "../components/layout/heading";

export default function Index() {
  return (
    <>
      <Heading title="Home" />
      <Main>
        <Form>
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
              <label className="block">
                Name
                <input
                  required
                  type="text"
                  className="
                    mt-0
                    block w-1/3
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
                  placeholder="Flag-Name"
                />
              </label>
              <label className="block">
                Description
                <input
                  type="text"
                  className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                  placeholder=""
                />
              </label>
              Conditions
              <div className=" space-x-1">
                <select
                  className="
                   w-1/6
                    mt-0
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
                >
                  <option>Corporate </option>
                  <option>Wedding</option>
                  <option>Birthday</option>
                  <option>Other</option>
                </select>
                <select
                  className="w-1/6
                    mt-0
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
                >
                  <option>Corporate </option>
                  <option>Wedding</option>
                  <option>Birthday</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </div>
        </Form>
      </Main>
    </>
  );
}
