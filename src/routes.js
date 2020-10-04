import Home from "./pages/Home";
import Presets from "./pages/Presets";

const routes = [
  { path: "/", component: Home },
  { path: "/presets", component: Presets },
  {
    path: "/gradient",
    name: "gradient",
    component: Home,
    props: (route) => ({
      query: route.query.colors,
      direction: route.query.direction,
    }),
  },
];

export default routes;
