import './App.css';
import { Layout } from 'antd';
import Header from './components/Header/Header';
import Briefcase from "./components/Briefcase";
import ContentWindow from "./components/ContentWindow";
import { BrowserRouter, Switch, Route } from "react-router-dom";


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
          <Route exact path="/">
            <ContentWindow content_data={"homepage"} />
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
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
