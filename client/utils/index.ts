export function getAPIEndpoint(path: string) {
  const scheme = process.env["SERVER_SCHEME"];
  const host = process.env["SERVER_HOST"];
  const port = process.env["SERVER_PORT"];

  return `${scheme}://${host}:${port}${path}`;
}