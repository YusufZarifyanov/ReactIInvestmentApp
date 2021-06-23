import { Layout } from "antd";
import SideBar from "../../components/SideBar/SideBar";
import { useParams } from "react-router";
import { subMenuShowcase } from "../../data/sub_menu";
import TopViews from "../../components/TopViews/TopViews";
import UpsDowns from "../../components/UpsDowns/UpsDowns";
import Events from "../../components/Events/Events";
import { useRedirect } from "../../hooks/useRedirect";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTopViews } from "../../store/slices/securities";
import { fetchUpsDowns } from "../../store/slices/securities";
import { fetchNews } from '../../store/slices/events';

const Showcase = () => {
  const { showcaseSubmenuId } = useParams();
  const dispatch = useDispatch();

  const topViews = useSelector(state => state.securities.topViews);
  const ups = useSelector(state => state.securities.upsDowns.ups);
  const downs = useSelector(state => state.securities.upsDowns.downs);
  const news = useSelector(state => state.events.news);

  useEffect(() => {
    showcaseSubmenuId === "topviews" && !topViews && dispatch(fetchTopViews());
    showcaseSubmenuId === "upsdowns" && (!ups.length && !downs.length) && dispatch(fetchUpsDowns());
    showcaseSubmenuId === "events" && !news && dispatch(fetchNews());
  }, [showcaseSubmenuId, topViews, ups, downs, news, dispatch]);

  const components = {
    topviews: {
      component: TopViews,
      data: topViews,
    },
    upsdowns: {
      component: UpsDowns,
      data: {
        ups: {
          name: "Взлеты",
          data: ups,
          // data: upsDowns.ups.data
        },
        downs: {
          name: "Падения",
          data: downs,
          // data: upsDowns.downs.data
        }
      },
    },
    events: {
      component: Events,
      data: news,
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
