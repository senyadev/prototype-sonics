/** Resolve app routes and public assets under the deployment base. */
export const publicPath = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

export const currentRoute = () =>
  `/${window.location.pathname.slice(import.meta.env.BASE_URL.length)}`.replace(
    /\/$/,
    "",
  ) || "/";
