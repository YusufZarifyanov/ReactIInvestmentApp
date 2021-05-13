import { Layout } from "antd";
import SideBar from "../SideBar";
import ContentWindow from "../ContentWindow";

const Briefcase = (props) => {
  return (
    <>
      <Layout>
        <SideBar typeCase={"briefcase"}/>
        <ContentWindow data={"briefcase"} className="content_block" />
      </Layout>
    </>
  );
};

export default Briefcase;
