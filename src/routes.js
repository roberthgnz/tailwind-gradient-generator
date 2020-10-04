import Home from "./pages/Home";
import Pressets from "./pages/Pressets";

const routes = [
  { path: "/", component: Home },
  { path: "/pressets", component: Pressets },
  {
    path: "/gradient",
    name: 'user-gradient',
    component: Home,
    // user will be able to enter the url as "/gradient?colors=red+teal+indigo"
    props: route => ({ query: route.query.colors })
  },
];

export default routes;
