import { Layout } from "antd";
import SideBar from "../../components/SideBar/SideBar";
import ContentWindow from "../../components/ContentWindow/ContentWindow";
import { withRouter } from "react-router";

const Briefcase = ({routes, location}) => {
  const currentPath = location.pathname

  return (
    <Layout>
      <SideBar menuItems={routes} active={currentPath} />
      <ContentWindow className="content_block" >this is a cool briefcase!</ContentWindow>
    </Layout>
  );
};

export default withRouter(Briefcase);
