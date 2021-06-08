import { Tabs } from 'antd';
import React from 'react';
import Securities from '../Securities/Securities';

const UpsDowns = ({ data }) => {

  return (
    <Tabs
      centered
      type="card"
      tabPosition="top"
      defaultActiveKey="ups"
    >
      <Tabs.TabPane
        tab={
          <span>
            Взлеты
          </span>
        }
        key="ups">
        <Securities
          data={data.filter(item => item.is_active === true)}
          securityType='shares' />
      </Tabs.TabPane>
      <Tabs.TabPane
        tab={
          <span>
            Падения
          </span>
        }
        key="downs">
        <Securities
          data={data.filter(item => item.is_active === false)}
          securityType='shares' />
      </Tabs.TabPane>
    </Tabs>
  )
}

export default UpsDowns
