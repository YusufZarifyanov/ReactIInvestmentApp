import { Layout } from "antd";

const { Content } = Layout;

const ContentWindow = (props) => {
  return (
    <>
      <Content className="content_block">
        <div className="content_block__elem">{ props.data}</div>
      </Content>
    </>
  );
};

export default ContentWindow;
