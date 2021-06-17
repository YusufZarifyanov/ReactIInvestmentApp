import { Layout } from "antd";
import SideBar from "../../components/SideBar/SideBar";
import { useParams } from "react-router";
import { upsDowns } from "../../data/showcase/ups_downs";
import { topViews } from "../../data/showcase/top_views";
import { subMenuShowcase } from "../../data/sub_menu";
import TopViews from "../../components/TopViews/TopViews";
import UpsDowns from "../../components/UpsDowns/UpsDowns";
import Events from "../../components/Events/Events";
import { useRedirect } from "../../hooks/useRedirect";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from '../../store/slices/showcase/events';
import { useEffect } from "react";

const Showcase = () => {
  const { showcaseSubmenuId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    showcaseSubmenuId === "events" && dispatch(fetchNews());
  }, []);

  const news = useSelector(state => state.showcase.events.news);

  useEffect(() => {
    showcaseSubmenuId === "events" && !news && dispatch(fetchNews());
  }, [showcaseSubmenuId, news, dispatch]);

  const components = {
    topviews: {
      component: TopViews,
      data: topViews,
    },
    upsdowns: {
      component: UpsDowns,
      data: upsDowns,
    },
    events: {
      component: Events,
      data: news?.data?.main?.stream,
    },
  }

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
