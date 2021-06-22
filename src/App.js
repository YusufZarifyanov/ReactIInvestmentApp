import { Layout } from "antd";
import Header from "./components/Header/Header";
import Briefcase from "./containers/Briefcase/Briefcase";
import Showcase from "./containers/Showcase/Showcase";
import About from "./containers/About/About";
import { Switch, Route, Redirect } from "react-router-dom";
import styles from "./App.module.scss";
import SecurityItem from "./containers/SecurityItem/SecurityItem";
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

const routes = [
  {
    path: "/briefcase/:securityType/:ticker",
    component: SecurityItem,
  },
  {
    path: "/showcase/:activeSideBar/:ticker",
    component: SecurityItem,
  },
  {
    path: "/briefcase/:briefcaseSubmenuId",
    component: Briefcase,
  },
  {
    path: "/showcase/:showcaseSubmenuId",
    component: Showcase,
  },
  {
    path: "/about",
    component: About,
  },
];

function App() {
  return (
    <ErrorBoundary>
      <Layout
        className={styles.app}
      >
        <Header />
        <Switch>
          {routes.map((route, i) => (
            <Route key={i} path={route.path} component={route.component} />
          ))}
          <Redirect from="/showcase" to="/showcase/topviews" />
          <Redirect to="/briefcase/review" />
        </Switch>
      </Layout>
    </ErrorBoundary>
  );
}

export default App;
