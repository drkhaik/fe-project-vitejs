import React, { useState, useEffect } from 'react';
import {
    Row, Col, Tag, Typography, Card, Avatar
} from 'antd';
import { EditOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons';
const { Title, Paragraph, Text, Link } = Typography;
const { Meta } = Card;
import imgUEF from '../../../assets/logo-uef-home.jpg';
import AddPost from './AddPost';

const Post = () => {
    const [isOpenAddModal, setOpenAddModal] = useState(false);
    const [isOpenEditModal, setOpenEditModal] = useState(false);

    // const [loading, setLoading] = useState(false);
    const Description = () => {
        return (
            <Typography>
                <Title level={4}>Introduction</Title>
                <Paragraph copyable>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    <img src={imgUEF} />
                </Paragraph>
            </Typography>
        )
    }

    return (
        <>
            <Row className='post-wrapper' style={{ padding: 15 }}>
                <Col span={16}>
                    <div>
                        <Card
                            className='add-new-post'
                            style={{
                                marginTop: 16,
                            }}
                            hoverable={true}
                            onClick={() => setOpenAddModal(true)}
                        >
                            <Meta
                                avatar={<Avatar size={'large'} src={imgUEF} />}
                                title="Phòng công tác sinh viên"
                                description={"What u do today determines who u will be tomorrow..."}
                            />
                        </Card>
                        <Card
                            style={{
                                // width: 300,
                                marginTop: 16,
                            }}
                            hoverable={true}
                            // loading={loading}
                            actions={[
                                <EditOutlined onClick={() => console.log("click edit")} key="edit" />,
                                <DeleteOutlined onClick={() => console.log("click setting")} key="ellipsis" />,
                            ]}
                        >
                            <Meta
                                avatar={<Avatar size={'large'} src={imgUEF} />}
                                title="Phòng công tác sinh viên"
                                description={<Description />}
                            />
                        </Card>
                        <Card
                            style={{
                                // width: 300,
                                marginTop: 16,
                            }}
                            hoverable={true}
                            // loading={loading}
                            actions={[
                                <EditOutlined key="edit" />,
                                <DeleteOutlined key="ellipsis" />,
                            ]}
                        >
                            <Meta
                                avatar={<Avatar size={'large'} src={imgUEF} />}
                                title="Phòng công tác sinh viên"
                                description={<Description />}
                            />
                        </Card>
                        <Card
                            style={{
                                // width: 300,
                                marginTop: 16,
                            }}
                            hoverable={true}
                            // loading={loading}
                            actions={[
                                <EditOutlined key="edit" />,
                                <DeleteOutlined key="ellipsis" />,
                            ]}
                        >
                            <Meta
                                avatar={<Avatar size={'large'} src={imgUEF} />}
                                title="Phòng công tác sinh viên"
                                description={<Description />}
                            />
                        </Card>
                    </div>
                </Col>
                <Col span={8}>
                    dont know what to do with it
                </Col>
            </Row>
            <AddPost
                isOpenAddModal={isOpenAddModal}
                setOpenAddModal={setOpenAddModal}
            />
        </ >
    )
}

export default Post;