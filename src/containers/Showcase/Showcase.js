import { Layout } from "antd";
import SideBar from "../../components/SideBar/SideBar";
import ContentWindow from "../../components/ContentWindow/ContentWindow";
import { useParams } from "react-router";
import {
  FireOutlined,
  RiseOutlined,
  ScheduleOutlined
} from "@ant-design/icons";

const subMenuItems = [
  {
    name: "Топ Просмотров",
    path: '/showcase/topviews',
    icon: <FireOutlined />,
  },
  {
    name: "Взлеты и Падения",
    path: '/showcase/upsdowns',
    icon: <RiseOutlined />,
  },
  {
    name: "События",
    path: '/showcase/events',
    icon: <ScheduleOutlined />,
  },
];

const Topviews = () => {
  return (
    <div>TopViews</div>
  )
}

const Upsdowns = () => {
  return (
    <div>Upsdowns</div>
  )
}

const Events = () => {
  return (
    <div>Events</div>
  )
}

const NotFound = () => {
  return (
    <div>NotFound</div>
  )
}

const components = {
  topviews: Topviews,
  upsdowns: Upsdowns,
  events: Events,
  default: NotFound
}

const Showcase = () => {
  const { showcaseSubmenuId } = useParams();

  let CurrentComponent

  switch (showcaseSubmenuId) {
    case "topviews":
      CurrentComponent = components.topviews
      break;
    case "upsdowns":
      CurrentComponent = components.upsdowns
      break;
    case "events":
      CurrentComponent = components.events
      break;
    default:
      CurrentComponent = components.default
      break;
  }

  return (
    <Layout>
      <SideBar
        menuItems={subMenuItems}
        activeMenuItem={`/showcase/${showcaseSubmenuId}`}
      />
      <CurrentComponent />
    </Layout>
  );
};

export default Showcase
