import './App.css';
import { Layout } from 'antd';
import Header from './components/Header/Header';
import MainComponent from './components/MainComponent';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <Switch>
          <Route exact path='/'>
            <MainComponent />
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>

  );
}

export default App;
