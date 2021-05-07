import './App.css';
import { Layout } from 'antd';
import Header from './components/header/Header';
import MainComponent from './components/MainComponent';

function App() {
  return (
    <Layout>
      <Header />
      <MainComponent />
    </Layout>
  );
}

export default App;
