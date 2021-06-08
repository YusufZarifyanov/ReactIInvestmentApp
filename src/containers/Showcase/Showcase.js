import { Layout } from "antd";
import SideBar from "../../components/SideBar/SideBar";
import { useParams } from "react-router";
import { upsDowns } from "../../data/showcase/ups_downs";
import { topViews } from "../../data/showcase/top_views";
import { subMenuShowcase } from "../../data/sub_menu";
import TopViews from "../../components/TopViews/TopViews";
import UpsDowns from "../../components/UpsDowns/UpsDowns";
import Events from "../../components/Events/Events";
import { fakeResponseForEvents as dataEvents } from '../../data/showcase/fakeResponseEvents';
import { useRedirect } from "../../hooks/useRedirect";

const components = {
  topviews: {
    component: TopViews,
    data: topViews,
  },
  upsdowns: {
    component: UpsDowns,
    data: upsDowns.shares.data,
  },
  events: {
    component: Events,
    data: dataEvents,
  },
}

const Showcase = () => {
  const { showcaseSubmenuId } = useParams();

  const Component = useRedirect(
    components,
    "/showcase/topviews",
    showcaseSubmenuId,
    "topviews"
  )

  return (
    <Layout>
      <SideBar
        menuItems={subMenuShowcase}
        activeMenuItem={`/showcase/${showcaseSubmenuId}`}
      />
      <Layout.Content>
        <Component />
      </Layout.Content>
    </Layout>
  );
};

export default Showcase
