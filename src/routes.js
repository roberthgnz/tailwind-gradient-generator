import Home from "./pages/Home";
import Presets from "./pages/Presets";

const routes = [
  { path: "/", component: Home },
  { path: "/presets", component: Presets },
  {
    path: "/gradient",
    name: 'user-gradient',
    component: Home,
    // user will be able to enter the url as "/gradient?colors=red+teal+indigo"
    props: route => ({ query: route.query.colors })
  },
];

export default routes;
