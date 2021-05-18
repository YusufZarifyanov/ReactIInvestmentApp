import { Layout } from "antd";

const ContentWindow = ({children}) => {
  return (
    <Layout.Content className="content_block">
      <div className="content_block__elem">{children}</div>
    </Layout.Content>
  );
};

export default ContentWindow;
