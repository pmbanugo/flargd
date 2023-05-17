import { Link } from "@remix-run/react";

export default function Nav() {
  return (
    <>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-gray-200 text-3xl">Flargd</span>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                  <Link
                    to="/"
                    className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                    aria-current="page"
                  >
                    Home
                  </Link>
                  <Link
                    to="/apps"
                    className="text-white px-3 py-2 rounded-md text-sm font-medium"
                    aria-current="page"
                  >
                    Apps
                  </Link>

                  {/* <a
                    href="/"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Reports
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
           
            <div className="h-96 rounded-lg border-4 border-dashed border-gray-200"></div>
          </div>
        </div>
      </main> */}
    </>
  );
}
