import { Layout } from 'antd';
import Header from './components/Header/Header';
import Briefcase from "./components/Briefcase/Briefcase";
import Showcase from "./components/Showcase/Showcase";
import ContentWindow from "./components/ContentWindow"
import { Switch, Route, Redirect } from 'react-router-dom';

function App() {
  return (
    <Layout style={{ position: "relative", overflow: "hidden" }}>
      <Header />
      <Switch>
        <Route path="/briefcase" exact >
          <Briefcase />
        </Route>
        <Route path="/briefcase/briefcase_route" exact >
          <Briefcase />
        </Route>

        <Route path="/showcase" exact >
          <Showcase />
        </Route>

        <Route path="/showcase/showcase_route" exact >
          <Showcase />
        </Route>

        <Route path="/about" exact >
          <About />
        </Route>

        <Route path="/" exact >
          <Briefcase />
        </Route>

        <Redirect to="/" />
      </Switch>
    </Layout>
  );
}

export default App;
