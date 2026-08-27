// Doctor/consultant data now lives in `src/data/consultants/` — one file per
// person, aggregated by `consultants/index.ts`. This file is kept as a stable
// import path so existing consumers (`lib/api`, doctor listing/detail pages,
// the blog author-linking helper, etc.) don't need to change. To add a new
// doctor, see `consultants/index.ts`.
export { consultants as doctors } from "./consultants";
