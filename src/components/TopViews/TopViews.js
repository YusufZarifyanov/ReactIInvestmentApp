import React, { useState } from 'react';
import { Tabs } from "antd";
import { subMenuBriefcase } from "../../data/sub_menu"
import Overview from '../Overview/Overview';
import Securities from '../Securities/Securities';
import './TopViews.scss'
import { getPathPartByOrdinalNumber } from '../../utils/getPathPartByOrdinalNumber';

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
          key={getPathPartByOrdinalNumber(subMenuItem.path, 2)}>
          {
            getPathPartByOrdinalNumber(subMenuItem.path, 2) === "review" ?
              (
                <Overview data={data} />
              ) : (
                <Securities
                  data={data[security]?.data} />
              )
          }
        </Tabs.TabPane>
      ))}
    </Tabs>
  )
}

export default TopViews
