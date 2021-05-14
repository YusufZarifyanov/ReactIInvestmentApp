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
        <Route path="/" exact component={ContentWindow} />
        <Route path="/briefcase" exact component={Briefcase} />
        <Route path="/briefcase/briefcase_route" exact component={Briefcase} />
        <Route path="/showcase" exact component={Showcase} />
        <Route path="/showcase/showcase_route" exact component={Showcase} />
        <Route path="/about" exact component={ContentWindow} />
        <Redirect to="/" />
      </Switch>
    </Layout>
  );
}

export default App;
