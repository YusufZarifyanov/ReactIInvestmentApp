import './App.css';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to Investment App!
        </p>
        <p>
          <a href="https://ant.design/docs/react/introduce">
            <Button type="primary" shape="round" icon={<ArrowRightOutlined />}>
              Start Learn Ant Design
            </Button>
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
