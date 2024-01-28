import { lazy } from "react";

const routes = [
  {
    path: "/",
    component: lazy(() => import("./pages/Homepage")),
    exact: true,
  },
  {
    path: "/home",
    component: lazy(() => import("./pages/Homepage")),
    exact: true,
    preload: true,
  },
  {
    path: "*",
    component: lazy(() => import("./pages/Errorpage")),
    exact: true,
    preload: true,
  },
  {
    path: "/login",
    component: lazy(() => import("./pages/Login")),
    exact: true,
    preload: true,
  },
  {
    path: "/signup",
    component: lazy(() => import("./pages/Signup")),
    exact: true,
    preload: true,
  },
  {
    path: "/dashboard",
    component: lazy(() => import("./pages/Dashboard")),
    exact: true,
    preload: true,
  },
  {
    path: "/viewad/:id",
    component: lazy(() => import("./pages/Viewadindetail")),
    exact: true,
    preload: true,
  },
  {
    path: "/postad",
    component: lazy(() => import("./pages/Postad")),
    exact: true,
    preload: true,
  },
  {
    path: "/editad/:id",
    component: lazy(() => import("./pages/Editad")),
    exact: true,
    preload: true,
  },
];

export default routes;
