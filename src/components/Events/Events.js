import React from 'react';
import { List, Card, Skeleton, Row, Col, Modal } from "antd";
import placeholder from '../../placeholder_img.png';
import styles from './Events.module.scss';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { resetWarning } from '../../store/slices/modals';
import { resetRejectedWith } from '../../store/slices/events';

const Events = ({ data }) => {
  const loading = useSelector(state => state.events.loading);
  const warning = useSelector(state => state.modals.warning);
  const rejectedWith = useSelector(state => state.events.rejectedWith);

  const dispatch = useDispatch();

  const preventDefault = (event) => event.preventDefault();

  function closeModalWindow() {
    warning && dispatch(resetWarning());
    rejectedWith && dispatch(resetRejectedWith());
  }

  if (loading) {
    return (
      <Row className={styles.row} gutter={16}>{
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(item => (
          <Col key={item} xs={24} sm={12} lg={8} xxl={6}>
            <Skeleton.Image />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Skeleton
              active={true}
              title={false}
              paragraph={{
                rows: 2,
              }}
            >
            </Skeleton>
          </Col>
        ))
      }
      </Row>
    )
  }

  return (
    <>
      {(warning || rejectedWith) && <Modal
        title="Warning"
        centered
        visible={warning || rejectedWith}
        onOk={closeModalWindow}
        onCancel={closeModalWindow}
        destroyOnClose={true}
        cancelButtonProps={
          {
            disabled: true
          }
        }
      >
        <p>{warning || rejectedWith}</p>
      </Modal>}
      <List
        className={styles.list}
        pagination={data?.length ? {
          onChange: page => {
            // console.log(page);
          },
          pageSize: 12,
          itemLayout: "vertical"
        } : false}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 3,
          xxl: 4,
        }}
        dataSource={data && data}
        renderItem={(item) => (
          <List.Item>
            <Link onClick={!item?.content?.clickThroughUrl && preventDefault} to={{ pathname: `${item?.content?.clickThroughUrl?.url}` }} target="_blank">
              <Card
                hoverable
                cover={
                  <img
                    alt={item.content.title}
                    src={item.content.thumbnail ? item.content.thumbnail?.resolutions[3].url : placeholder} />
                }
              >
                <Card.Meta title={item.content.title} description={item.content.pubDate} />
              </Card>
            </Link>
          </List.Item>
        )}
      />
    </>
  )
}

export default Events
