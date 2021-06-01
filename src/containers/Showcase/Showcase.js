import { Layout } from "antd";
import SideBar from "../../components/SideBar/SideBar";
import { useHistory, useParams } from "react-router";
import {securities} from "../../data/briefcase/securities"
// import {data_currency as dataUpsdowns} from "../../data/briefcase/currency"
// import {data_fonds as dataEvents} from "../../data/briefcase/fonds"
import { topViews } from '../../data/showcase/top_views'

import { useEffect, useState } from "react";
import { subMenuShowcase } from "../../data/sub_menu";
import TopViews from "../../components/TopViews/TopViews";
import UpsDowns from "../../components/UpsDowns/UpsDowns";
import Events from "../../components/Events/Events";
import withData from "../../hocs/withData";

const dataUpsdowns = securities.currency;
const dataEvents = securities.funds;

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
  const history = useHistory();

  const hasParam = Object.keys(components).find(key => key === showcaseSubmenuId)

  if (!hasParam) {
    history.push("/showcase/topviews"); 
  }

  const [currentPath, setcurrentPath] = useState(hasParam)

  const Component = withData(
    components[currentPath || "topviews"].component,
    components[currentPath || "topviews"].data
  )

  useEffect(() => {
    setcurrentPath(hasParam)
  }, [hasParam])

  return (
    <Layout>
      <SideBar
        menuItems={subMenuShowcase}
        activeMenuItem={`/showcase/${showcaseSubmenuId}`}
      />
      <Component />
    </Layout>
  );
};

export default Showcase
