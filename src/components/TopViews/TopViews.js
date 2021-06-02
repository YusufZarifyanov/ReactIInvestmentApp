import React, { useEffect, useMemo, useState } from 'react';
import { List, Card, Tabs } from "antd";
import { subMenuBriefcase } from "../../data/sub_menu"

const TopViews = ({ data }) => {
  const [active, setActive] = useState("/briefcase/review")

  const allData = useMemo(() => [].concat.apply([], Object.values(data)), [data]);

  const [activeData, setActiveData] = useState(allData)

  const currentData = Object.keys(data).find(key => key === active.split('/')[2])

  useEffect(() => {
    if (!currentData) {
      setActiveData(allData)
    } else {
      setActiveData(data[currentData])
    }
  }, [currentData, allData, data])

  function changeActiveKey(activeKey) {
    setActive(activeKey)
  }

  return (
    <Tabs
      onChange={changeActiveKey}
      activeKey={active}
    >
      {subMenuBriefcase.map(item => (
        <Tabs.TabPane
          tab={
            <span>
              {item.icon}
              {item.name}
            </span>
          }
          key={item.path}>
          <List
            dataSource={activeData && activeData}
            renderItem={(item) => (
              <Card
                hoverable
                style={{ width: 200 }}
                cover={<img alt={item.name} src={item.src} />}
              >
                <Card.Meta title={item.name} description={item.cost} />
              </Card>
            )}
          />
        </Tabs.TabPane>
      ))}
    </Tabs>
  )
}

export default TopViews
