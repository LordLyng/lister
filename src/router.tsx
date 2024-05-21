import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { ListPage } from "./pages/list.page";
import { RootPage } from "./pages/root.page";
import { HomePage } from "./pages/home.page";
import { getListDocByCollectionName } from "./firebase/simple-api";

const rootRoute = createRootRoute({
  component: RootPage,
});

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

export const listRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "list/$listName",
  component: ListPage,
  loader: async ({ params }) => {
    const list = await getListDocByCollectionName(params.listName);
    return list;
  },
  gcTime: 0,
  shouldReload: false,
});

const routeTree = rootRoute.addChildren([homeRoute, listRoute]);

export const router = createRouter({
  routeTree,
});
