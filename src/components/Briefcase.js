import { Layout, Menu } from "antd";
import SideBar from "./Sider";
import ContentWindow from "./Content";

const Briefcase = (props) => {
  console.log(props);
  return (
    <>
      <Layout>
        <SideBar data={props.data} />
        <ContentWindow className="content_block" />
      </Layout>
    </>
  );
};

export default Briefcase;
