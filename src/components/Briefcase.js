<<<<<<< HEAD
import { Layout } from "antd";
import SideBar from "./Sider";
import ContentWindow from "./Content";
=======
import { Layout, Menu } from "antd";
import SideBar from "./SideBar";
import ContentWindow from "./ContentWindow";
>>>>>>> d7afa978d87079da2e307350e0cbeeb96eb6b808

const Briefcase = (props) => {
  return (
    <>
      <Layout>
        <SideBar data={props.data} />
        <ContentWindow data={props.content_data} className="content_block" />
      </Layout>
    </>
  );
};

export default Briefcase;
