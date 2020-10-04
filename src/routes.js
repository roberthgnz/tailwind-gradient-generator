import Home from "./pages/Home";
import Presets from "./pages/Presets";

const routes = [
  { path: "/", component: Home },
  { path: "/presets", component: Presets },
  {
    path: "/gradient",
    name: 'user-gradient',
    component: Home,
    // user will be able to enter the url as "/gradient?colors=red+teal+indigo" or "/gradient?colors=red+teal+indigo&&direction=t"
    props: route => ({ query: route.query.colors, direction: route.query.direction })
  },
];

export default routes;
