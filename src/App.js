import { Layout } from 'antd';
import Header from './components/Header/Header';
import Briefcase from "./containers/Briefcase/Briefcase";
import Showcase from "./containers/Showcase/Showcase";
import About from "./containers/About/About"
import { Switch, Route, Redirect } from 'react-router-dom';
import {
  DollarCircleOutlined,
  EyeOutlined,
  PercentageOutlined,
  FileTextOutlined,
  BankOutlined,
  RiseOutlined,
  ScheduleOutlined,
  FireOutlined,
  AppstoreFilled,
  QuestionCircleFilled,
  ShoppingFilled,
} from "@ant-design/icons";

const routes = [
  {
    name: "Мой Портфель",
    path: "/briefcase",
    icon: <ShoppingFilled />,
    component: Briefcase,
    routes: [
      {
        name: "Обзор",
        path: '/briefcase/review',
        icon: <EyeOutlined />,
        component: Briefcase,
      },
      {
        name: "Валюта",
        path: '/briefcase/currency',
        icon: <DollarCircleOutlined />,
        component: Briefcase,
      },
      {
        name: "Акции",
        path: '/briefcase/shares',
        icon: <PercentageOutlined />,
        component: Briefcase,
      },
      {
        name: "Облигации",
        path: '/briefcase/bonds',
        icon: <FileTextOutlined />,
        component: Briefcase,
      },
      {
        name: "Фонды",
        path: '/briefcase/funds',
        icon: <BankOutlined />,
        component: Briefcase,
      },
    ]
  },
  {
    name: "Витрина",
    path: "/showcase",
    icon: <AppstoreFilled />,
    component: Showcase,
    routes: [
        {
          name: "Топ Просмотров",
          path: '/showcase/topviews',
          icon: <FireOutlined />,
          component: Showcase,
        },
        {
          name: "Взлеты и Падения",
          path: '/showcase/upsdowns',
          icon: <RiseOutlined />,
          component: Showcase,
        },
        {
          name: "События",
          path: '/showcase/events',
          icon: <ScheduleOutlined />,
          component: Showcase,
        },
    ]
  },
  {
  name: "О программе",
  path: "/about",
  icon: <QuestionCircleFilled />,
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
      <Header />
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
