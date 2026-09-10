import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    // Preload a route's code (and data) when the user hovers/touches its link,
    // so navigation is instant instead of leaving the current page on screen
    // while the target chunk loads (which read as "home shows first, then jumps").
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
  });

  return router;
};
