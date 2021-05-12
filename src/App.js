import './App.css';
import { Layout } from 'antd';
import Header from './components/Header/Header';
import Briefcase from "./components/Briefcase";
import ContentWindow from "./components/Content"
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

const data_briefcase = ["Валюта", "Акции", "Облигации", "Фонды"]
const data_showcase = ["Меню", "Магазин", "Что-то еще", "Подарки"];

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <Switch>
          <Route path="/briefcase">
            <Briefcase data={data_briefcase} />
          </Route>
          <Route exact path="/showcase">
            <Briefcase data={data_showcase} />
          </Route>
          <Route exact path="/about">
            <ContentWindow />
          </Route>
          <Route exact path="/">
            <ContentWindow />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
