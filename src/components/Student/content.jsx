import React, { useState, useEffect, Suspense } from 'react';
import { fetchAllPost } from '../../services/api';
import {
    Row, Col, Carousel, Empty, Card, Typography, Avatar
} from 'antd';
const { Meta } = Card;
const { Title, Paragraph, Text, Link } = Typography;
import imgUEF from '../../assets/team_UEF.png';
import LoadingComponent from '../Loading/loadingComponent';
import convertSlugFunction from '../../utilizes/convertSlug';
import { useNavigate } from 'react-router-dom';
const ModalDetailPost = React.lazy(() => import('./ModalDetailPost'));

const Content = () => {
    const navigate = useNavigate();
    const [postList, setPostList] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [postInfo, setPostInfo] = useState({});
    const { convertSlug } = convertSlugFunction();

    const fetchPosts = async () => {
        try {
            const res = await fetchAllPost();
            if (res && res.data) {
                setPostList(res.data);
            } else {
                message.error("Failed to load list post")
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    const onClickPost = (item) => {
        setModalOpen(true);
        setPostInfo(item);
    }


    const handleRedirectViewFacultyPost = (author) => {
        const slug = convertSlug(author.name);
        let encodedDepartmentId = btoa(author._id);
        navigate(`/post/${slug}?id=${encodedDepartmentId}`);
    }

    return (
        <Row style={{ padding: 15 }}>
            <Col span={24}>
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
                                        cursor: 'pointer'
                                        // maxHeight: '100vh', overflow: 'auto'
                                    }}
                                    hoverable={true}
                                >
                                    <Meta
                                        avatar={<Avatar
                                            size={'large'}
                                            src={item.author ? item.author.image : imgUEF}
                                            onClick={() => handleRedirectViewFacultyPost(item.author)}
                                        />}
                                        title={<Title
                                            style={{ margin: 0 }}
                                            level={5}
                                            onClick={() => handleRedirectViewFacultyPost(item.author)}
                                        >
                                            {item.author ? item.author.name : 'UEF Department'}
                                        </Title>}
                                        description={
                                            <Typography onDoubleClick={() => onClickPost(item)}>
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