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
  resetRejectedInSecuritiesSlice,
} from "../../store/slices/securities";
import { fetchNews } from "../../store/slices/events";
import { resetWarning } from "../../store/slices/modals";
import { resetRejectedInEventsSlice } from "../../store/slices/events";

const Showcase = () => {
  const { showcaseSubmenuId } = useParams();
  const dispatch = useDispatch();

  const topViews = useSelector((state) => state.securities.topViews.main);
  const ups = useSelector((state) => state.securities.upsDowns.ups);
  const downs = useSelector((state) => state.securities.upsDowns.downs);
  const news = useSelector((state) => state.events.news);
  const warning = useSelector((state) => state.modals.warning);
  const rejectedInEvents = useSelector((state) => state.events.rejected);
  const rejectedInSecurities = useSelector(
    (state) => state.securities.rejected
  );

  useEffect(() => {
    let promiseForCanceling;

    if (
      showcaseSubmenuId === "topviews" &&
      !topViews.currency.data.length &&
      !topViews.shares.data.length &&
      !topViews.bonds.data.length &&
      !topViews.funds.data.length
    ) {
      promiseForCanceling = dispatch(fetchTopViews());
    } else if (
      showcaseSubmenuId === "upsdowns" &&
      !ups.length &&
      !downs.length
    ) {
      promiseForCanceling = dispatch(fetchUpsDowns());
    } else if (showcaseSubmenuId === "events" && !news.length) {
      promiseForCanceling = dispatch(fetchNews());
    }

    return () => {
      promiseForCanceling && promiseForCanceling.abort();
    };
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
    rejectedInEvents && dispatch(resetRejectedInEventsSlice());
    rejectedInSecurities && dispatch(resetRejectedInSecuritiesSlice());
  }

  return (
    <>
      {(warning || rejectedInEvents || rejectedInSecurities) && (
        <Modal
          title="Warning"
          centered
          visible={warning || rejectedInEvents || rejectedInSecurities}
          onOk={closeModalWindow}
          onCancel={closeModalWindow}
          destroyOnClose={true}
          maskClosable={false}
          cancelButtonProps={{
            disabled: true,
          }}
        >
          <p>{warning || rejectedInEvents || rejectedInSecurities}</p>
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
