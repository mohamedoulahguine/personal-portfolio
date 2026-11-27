// ---- markup for the routes data ----
export const ROUTES = {
  home: { label: "Home", href: "/" },
  about: { label: "About", href: "/about" },
  skills: { label: "Skills", href: "/skills" },
  projects: { label: "Projects", href: "/projects" },
  blog: { label: "Blog", href: "/blog" },
  contact: { label: "Contact", href: "/contact" },
} as const;

// ---- interfaces ----
export type RouteId = keyof typeof ROUTES;
export interface NavItem {
  id: RouteId;
  label: string;
  href: string;
}

// ---- here i map the routes data to the nav items data ----
export const NAV_ITEMS: NavItem[] = (
  Object.entries(ROUTES) as [RouteId, (typeof ROUTES)[RouteId]][]
).map(([id, { label, href }]) => ({
  id,
  label,
  href,
}));

// ---- get the href of a route by id ----
export function getRouteHref(id: RouteId) {
  return ROUTES[id].href;
}

// ---- get the label of a route by id ----
export function getRouteLabel(id: RouteId) {
  return ROUTES[id].label;
}
