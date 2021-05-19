import { Layout } from 'antd';
import Header from './components/Header/Header';
import Briefcase from "./containers/Briefcase/Briefcase";
import Showcase from "./containers/Showcase/Showcase";
import About from "./containers/About/About"
import { Switch, Route, Redirect } from 'react-router-dom';

const routes = [
  {
    name: "Мой Портфель",
    path: "/briefcase",
    component: Briefcase,
    routes: [
      {
        name: "Обзор",
        path: '/briefcase/review',
        component: Briefcase,
      },
      {
        name: "Валюта",
        path: '/briefcase/currency',
        component: Briefcase,
      },
      {
        name: "Акции",
        path: '/briefcase/shares',
        component: Briefcase,
      },
      {
        name: "Облигации",
        path: '/briefcase/bonds',
        component: Briefcase,
      },
      {
        name: "Фонды",
        path: '/briefcase/funds',
        component: Briefcase,
      },
    ]
  },
  {
    name: "Витрина",
    path: "/showcase",
    component: Showcase,
    routes: [
        {
          name: "Топ Просмотров",
          path: '/showcase/topviews',
          component: Showcase,
        },
        {
          name: "Взлеты и Падения",
          path: '/showcase/upsdowns',
          component: Showcase,
        },
        {
          name: "События",
          path: '/showcase/events',
          component: Showcase,
        },
    ]
  },
  {
  name: "О программе",
  path: "/about",
  component: About,
  },
];

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

function App() {
  return (
    <Layout style={{ position: "relative", overflow: "hidden" }}>
      <Header routes={routes} />
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        <Route path="/" exact >
          <Redirect to="/briefcase/review" />
        </Route>
        <Redirect to="/" />
        </Switch>
    </Layout >
  );
}

export default App;
