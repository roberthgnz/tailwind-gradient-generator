import Home from "./pages/Home";
import Presets from "./pages/Presets";

const routes = [
  { path: "/", component: Home },
  { path: "/presets", component: Presets },
  {
    path: "/gradient",
    name: 'user-gradient',
    component: Home,
    // user will be able to enter the url as "/gradient?colors=red-300+teal-200+indigo-800" or "/gradient?colors=red-300+teal-200+indigo-800&&direction=t"
    props: route => ({
      colors: route.query.colors,
      direction: route.query.direction
    })
  },
];

export default routes;
