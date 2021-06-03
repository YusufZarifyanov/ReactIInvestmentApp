import React, { useState } from 'react';
import { Tabs } from "antd";
import { subMenuBriefcase } from "../../data/sub_menu"
import Overview from '../Overview/Overview';
import Securities from '../Securities/Securities';
import './TopViews.scss'

const TopViews = ({ data }) => {
  const [security, setSecurity] = useState("review")

  function changeActiveKey(activeKey) {
    setSecurity(activeKey)
  }

  return (
    <Tabs
      onChange={changeActiveKey}
      activeKey={security}
      centered
      type="card"
      tabPosition="top"
    >
      {subMenuBriefcase.map(subMenuItem => (
        <Tabs.TabPane
          tab={
            <span>
              {subMenuItem.icon}
              {subMenuItem.name}
            </span>
          }
          key={subMenuItem.path.split('/')[2]}>
          {
            subMenuItem.path.split('/')[2] === "review" ?
              (
                <Overview data={data} />
              ) : (
                <Securities
                  data={data[security]?.data}
                  securityType={security} />
              )
          }
        </Tabs.TabPane>
      ))}
    </Tabs>
  )
}

export default TopViews
