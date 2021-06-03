import { Layout } from "antd";
import SideBar from "../../components/SideBar/SideBar";
import { useParams } from "react-router";
import { securities } from "../../data/briefcase/securities";
import { topViews } from '../../data/showcase/top_views';
import { subMenuShowcase } from "../../data/sub_menu";
import TopViews from "../../components/TopViews/TopViews";
import UpsDowns from "../../components/UpsDowns/UpsDowns";
import Events from "../../components/Events/Events";
import { fakeResponseForEvents as dataEvents } from '../../data/showcase/fakeResponseEvents';
import { useRedirect } from "../../hooks/useRedirect";

const dataUpsdowns = securities.currency.data;

const components = {
  topviews: {
    component: TopViews,
    data: topViews,
  },
  upsdowns: {
    component: UpsDowns,
    data: dataUpsdowns,
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
