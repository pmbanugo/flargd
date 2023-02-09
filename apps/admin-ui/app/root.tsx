import type { LinksFunction, MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import Nav from "./components/layout/nav";
import styles from "./tailwind.css";
import tagifyStyles from "@yaireo/tagify/dist/tagify.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tagifyStyles }, // This could have just been in the edit/create pages but because I don't want to override all the styles and still have the tagify input looking like other inputs, I have to add it in the root
  { rel: "stylesheet", href: styles },
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Flargd - Feature Management",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en" className="h-full bg-gray-100">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <div className="min-h-full">
          <Nav />
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
