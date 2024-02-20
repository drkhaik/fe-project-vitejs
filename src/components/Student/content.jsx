import React, { useState, useEffect, Suspense } from 'react';
import { fetchAllPost } from '../../services/api';
import {
    Row, Col, Carousel, Empty, Card, Typography, Avatar
} from 'antd';
const { Meta } = Card;
const { Title, Paragraph, Text, Link } = Typography;
import imgUEF from '../../assets/team_UEF.png';
import LoadingComponent from '../Loading/loadingComponent';
const ModalDetailPost = React.lazy(() => import('./ModalDetailPost'));

const Content = (props) => {
    const [postList, setPostList] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [postInfo, setPostInfo] = useState({});

    const fetchPosts = async () => {
        const res = await fetchAllPost();
        if (res && res.data) {
            setPostList(res.data);
        } else {
            message.error("Failed to load list post")
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    const onClickPost = (item) => {
        setModalOpen(true);
        setPostInfo(item);
    }

    return (
        <Row style={{ padding: 15 }}>
            <Col span={18}>
                {postList && postList.length > 0
                    ?
                    <Carousel
                        autoplay
                        className='carousel-post'
                        style={{ maxHeight: 'auto', overflow: 'hidden' }}
                    >
                        {postList.map((item, index) => {
                            return (
                                <Card
                                    key={index}
                                    style={{
                                        marginTop: 16,
                                        height: 300,
                                        // maxHeight: '100vh', overflow: 'auto'
                                    }}
                                    // hoverable={true}
                                    onDoubleClick={() => onClickPost(item)}
                                >
                                    <Meta
                                        avatar={<Avatar size={'large'} src={item.author ? item.author.image : imgUEF} />}
                                        title={item.author.name}
                                        description={
                                            <Typography>
                                                <Title level={4}>{item.title}</Title>
                                                <Paragraph>
                                                    <div dangerouslySetInnerHTML={{ __html: item.description }}></div>
                                                </Paragraph>
                                            </Typography>
                                        }
                                    />
                                </Card>
                            )
                        })}
                    </Carousel>
                    :
                    <Empty
                        style={{
                            height: 'inherit',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column'
                        }}
                        description='No data!'
                    />
                }
            </Col>
            <Suspense fallback={<LoadingComponent />}>
                <ModalDetailPost
                    isModalOpen={isModalOpen}
                    setModalOpen={setModalOpen}
                    postInfo={postInfo}
                />
            </Suspense>
        </Row>
    )
}

export default Content;