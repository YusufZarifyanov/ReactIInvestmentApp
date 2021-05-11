import { Layout, Menu } from "antd";

const { Content, Sider } = Layout;

const ContentWindow = () => {
  return (
    <>
      <Content className="content_block">
        <div className="content_block__elem">content</div>
      </Content>
    </>
  );
};

export default ContentWindow;
