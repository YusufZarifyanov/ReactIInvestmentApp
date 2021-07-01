import { Layout, Modal } from "antd";
import SideBar from "../../components/SideBar/SideBar";
import { useParams } from "react-router";
import { subMenuShowcase } from "../../data/sub_menu";
import TopViews from "../../components/TopViews/TopViews";
import UpsDowns from "../../components/UpsDowns/UpsDowns";
import Events from "../../components/Events/Events";
import { useRedirect } from "../../hooks/useRedirect";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchTopViews,
  fetchUpsDowns,
  resetTopViewsRejectedWith,
  resetUpsDownsRejectedWith,
} from "../../store/slices/securities";
import { fetchNews } from "../../store/slices/events";
import { resetWarning } from "../../store/slices/modals";
import { resetRejectedWith as resetEventsRejectedWith } from "../../store/slices/events";

const Showcase = () => {
  const { showcaseSubmenuId } = useParams();
  const dispatch = useDispatch();

  const topViews = useSelector((state) => state.securities.topViews.main);
  const ups = useSelector((state) => state.securities.upsDowns.ups);
  const downs = useSelector((state) => state.securities.upsDowns.downs);
  const news = useSelector((state) => state.events.news);
  const warning = useSelector((state) => state.modals.warning);
  const eventsRejectedWith = useSelector((state) => state.events.rejectedWith);
  const topViewsRejectedWith = useSelector(
    (state) => state.securities.topViews.rejectedWith
  );
  const upsDownsRejectedWith = useSelector(
    (state) => state.securities.upsDowns.rejectedWith
  );

  useEffect(() => {
    showcaseSubmenuId === "topviews" &&
      !topViews.currency.data.length &&
      !topViews.shares.data.length &&
      !topViews.bonds.data.length &&
      !topViews.funds.data.length &&
      dispatch(fetchTopViews());
    showcaseSubmenuId === "upsdowns" &&
      !ups.length &&
      !downs.length &&
      dispatch(fetchUpsDowns());
    showcaseSubmenuId === "events" && !news.length && dispatch(fetchNews());
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
        },
      },
    },
    events: {
      component: Events,
      data: news,
    },
  };

  const Component = useRedirect(
    components,
    "/showcase/topviews",
    showcaseSubmenuId,
    "topviews"
  );

  function closeModalWindow() {
    warning && dispatch(resetWarning());
    eventsRejectedWith && dispatch(resetEventsRejectedWith());
    topViewsRejectedWith && dispatch(resetTopViewsRejectedWith());
    upsDownsRejectedWith && dispatch(resetUpsDownsRejectedWith());
  }

  return (
    <>
      {(warning ||
        eventsRejectedWith ||
        topViewsRejectedWith ||
        upsDownsRejectedWith) && (
        <Modal
          title="Warning"
          centered
          visible={
            warning ||
            eventsRejectedWith ||
            topViewsRejectedWith ||
            upsDownsRejectedWith
          }
          onOk={closeModalWindow}
          onCancel={closeModalWindow}
          destroyOnClose={true}
          cancelButtonProps={{
            disabled: true,
          }}
        >
          <p>
            {warning ||
              eventsRejectedWith ||
              topViewsRejectedWith ||
              upsDownsRejectedWith}
          </p>
        </Modal>
      )}
      <Layout>
        <SideBar
          menuItems={subMenuShowcase}
          activeMenuItem={`/showcase/${showcaseSubmenuId}`}
        />
        <Layout.Content>
          <Component />
        </Layout.Content>
      </Layout>
    </>
  );
};

export default Showcase;
