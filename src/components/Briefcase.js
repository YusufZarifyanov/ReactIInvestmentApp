import { Layout, Menu } from "antd";
import SideBar from "./SideBar";
import ContentWindow from "./ContentWindow";

const Briefcase = (props) => {
  console.log(props);
  return (
    <>
      <Layout>
        <SideBar data={props.data} url={props.url_params.url_start} />
        <ContentWindow data={props.content_data} className="content_block" />
      </Layout>
    </>
  );
};

export default Briefcase;
