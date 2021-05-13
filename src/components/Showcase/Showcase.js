import { Layout } from "antd";
import SideBar from "../SideBar";
import ContentWindow from "../ContentWindow";

const Showcase = (props) => {
  return (
    <>
      <Layout>
        <SideBar typeCase={"showcase"} />
        <ContentWindow data={"showcase"} className="content_block" />
      </Layout>
    </>
  );
};

export default Showcase;
