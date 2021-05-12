import './App.css';
import { Layout } from 'antd';
import Header from './components/Header/Header';
import Briefcase from "./components/Briefcase";
import ContentWindow from "./components/ContentWindow"
import { Switch, Route, Redirect } from 'react-router-dom';

const data_briefcase = ["Валюта", "Акции", "Облигации", "Фонды"]
const data_showcase = ["Меню", "Магазин", "Что-то еще", "Подарки"];

function App() {
  return (
      <Layout>
        <Header />
        <Switch>
          <Route path="/briefcase">

            <Briefcase data={data_briefcase} />
          </Route>
          <Route exact path="/showcase">
            <Briefcase
              data={data_showcase}
              content_data={"showcase"}
              url_params={{ url_start: "showcase" }}
            />
          </Route>
          <Route exact path="/about">
            <ContentWindow data={"about"} />
          </Route>
          <Route exact path="/data">
            <ContentWindow data={"someData"} />
          </Route>
          <Route exact path="/">
            <ContentWindow content_data={"homepage"}/>
          </Route>
          <Redirect to="/" />
        </Switch>
      </Layout>
  );
}

export default App;
