import { Layout } from 'antd';
import Header from './components/Header/Header';
import Briefcase from "./containers/Briefcase/Briefcase";
import Showcase from "./containers/Showcase/Showcase";
import About from "./containers/About/About"
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

const routes = [
  {
    name: "Мой Портфель",
    path: "/briefcase/:briefcaseSubmenuId",
    component: Briefcase,
  },
  {
    name: "Витрина",
    path: "/showcase/:showcaseSubmenuId",
    component: Showcase,
  },
  {
    name: "О программе",
    path: "/about",
    component: About,
  },
];

function App() {
  return (
    <Layout style={{ position: "relative", overflow: "visible", minHeight: '100vh' }}>
      <Header />
      <Switch>
        {routes.map((route, i) => (
          <Route key={i} path={route.path} component={route.component} />
        ))}
        <Redirect to="/briefcase/review" />
      </Switch>
    </Layout >
  );
}

export default App;
