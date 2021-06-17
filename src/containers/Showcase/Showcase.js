import { Layout } from "antd";
import SideBar from "../../components/SideBar/SideBar";
import { useParams } from "react-router";
// import { upsDowns } from "../../data/showcase/ups_downs";
import { topViews } from "../../data/showcase/top_views";
import { subMenuShowcase } from "../../data/sub_menu";
import TopViews from "../../components/TopViews/TopViews";
import UpsDowns from "../../components/UpsDowns/UpsDowns";
import Events from "../../components/Events/Events";
// import { fakeResponseForEvents as dataEvents } from '../../data/showcase/fakeResponseEvents';
import { useRedirect } from "../../hooks/useRedirect";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from '../../store/slices/showcase/events';
import { useEffect } from "react";
import { fetchUpsDowns } from "../../store/slices/showcase/upsdowns";
import * as selectors from "../../store/selectors/showcase/upsdowns";

const Showcase = () => {
  const { showcaseSubmenuId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    showcaseSubmenuId === "upsdowns" && dispatch(fetchUpsDowns("AAPL,MSFT,BABA,IBM,TSLA,INTC,BA"));
    showcaseSubmenuId === "events" && dispatch(fetchNews());
  }, []);

  const news = useSelector(state => state.showcase.events.news);

  const upsdownsData = useSelector(selectors.upsdownsData);
  const ups = useSelector(selectors.ups);
  const downs = useSelector(selectors.downs);

  useEffect(() => {
    showcaseSubmenuId === "upsdowns" && !upsdownsData && dispatch(fetchUpsDowns("AAPL,MSFT,BABA,IBM,TSLA,INTC,BA"));
    showcaseSubmenuId === "events" && !news && dispatch(fetchNews());
  }, [showcaseSubmenuId, upsdownsData, news, dispatch]);

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
