import { Layout } from "antd";
import SideBar from "../../components/SideBar/SideBar";
import ContentWindow from "../../components/ContentWindow/ContentWindow";
import { withRouter } from "react-router";

const Showcase = ({location, routes}) => {
  const currentPath = location.pathname

  return (
    <Layout>
      <SideBar menuItems={routes} active={currentPath} />
      <ContentWindow className="content_block" >
        this is super showcase
      </ContentWindow>
    </Layout>
  );
};

export default withRouter(Showcase);
