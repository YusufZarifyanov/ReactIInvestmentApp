import { Layout, List, Card } from "antd";
import SideBar from "../../components/SideBar/SideBar";
import { useParams } from "react-router";
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

function withData(WrappedComponent, data) {
  return (props) => {
    return (
      <WrappedComponent {...props} data={data} />
    )
  }
}

const Showcase = () => {
  
  const { showcaseSubmenuId } = useParams();

  const [currentPath, setcurrentPath] = useState(showcaseSubmenuId)
  const Component = withData(
    components[currentPath].component,
    components[currentPath].data
  )

  useEffect(() => {
    setcurrentPath(showcaseSubmenuId)
  }, [showcaseSubmenuId])

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
