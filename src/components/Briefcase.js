import { Layout } from "antd";
import SideBar from "./SideBar";
import ContentWindow from "./ContentWindow";

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
