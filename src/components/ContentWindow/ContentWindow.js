import { Layout } from "antd";

const ContentWindow = ({children}) => {
  return (
    <Layout.Content className="content_block">
      {children}
    </Layout.Content>
  );
};

export default ContentWindow;
