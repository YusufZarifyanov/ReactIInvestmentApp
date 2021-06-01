import { Layout } from "antd";
import SideBar from "../../components/SideBar/SideBar";
import { useHistory, useParams } from "react-router";
import {
  data_bonds as dataTopviews,
  data_currency as dataUpsdowns,
  data_fonds as dataEvents,
} from "../../data/data_briefcase/index";
import { useEffect, useState } from "react";
import { subMenuItems } from "../../data/sub_menu_showcase";
import TopViews from "../../components/TopViews/TopViews";
import UpsDowns from "../../components/UpsDowns/UpsDowns";
import Events from "../../components/Events/Events";
import withData from "../../hocs/withData";

const components = {
  topviews: {
    component: TopViews,
    data: dataTopviews,
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
    moveToTopViews()
  }

  const [currentPath, setcurrentPath] = useState(hasParam)

  function moveToTopViews() {
    history.push("/showcase/topviews");
  }

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
        menuItems={subMenuItems}
        activeMenuItem={`/showcase/${showcaseSubmenuId}`}
      />
      <Component />
    </Layout>
  );
};

export default Showcase
