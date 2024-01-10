import React, { useState, useEffect, Suspense } from 'react';
import {
    Row, Col, Tag, Typography, Card, Avatar, message, Empty, Popconfirm
} from 'antd';
import { EditOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons';
const { Title, Paragraph, Text, Link } = Typography;
const { Meta } = Card;
import imgUEF from '../../../assets/logo-uef-home.jpg';
import { fetchAllPost, deletePost } from '../../../services/api';
const AddPost = React.lazy(() => import('./AddPost'));
const UpdatePost = React.lazy(() => import('./UpdatePost'));
import LoadingComponent from '../../Loading/loadingComponent';
import { useSelector } from 'react-redux';
import './post.scss';

const Post = () => {
    const user = useSelector(state => state.account.user);
    const [isOpenAddModal, setOpenAddModal] = useState(false);
    const [isOpenEditModal, setOpenEditModal] = useState(false);
    const [postInfo, setPostInfo] = useState("");
    const [listPost, setListPost] = useState([]);

    const fetchPosts = async () => {
        const res = await fetchAllPost();
        if (res && res.data) {
            setListPost(res.data);
        } else {
            message.error("Failed to load list postInfo")
        }
    }

    const onClickPost = (item) => {
        // console.log("check item", item)
        setOpenEditModal(true);
        setPostInfo(item);
    }

    const onClickDeletePost = async (_id) => {
        const res = await deletePost(_id);
        if (res && res.errCode === 0) {
            message.success("Success!");
            await fetchPosts();
        } else {
            message.error("Oops...something went wrong...");
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);

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
                            onClick={() => onClickPost(item)}
                        >
                            <Meta
                                avatar={<Avatar size={'large'} src={user.image ? user.image : imgUEF} />}
                                title={user.name}
                                description={"What u do today determines who u will be tomorrow..."}
                            />
                        </Card>
                        {listPost && listPost.length > 0
                            ?
                            listPost.map((item, index) => {
                                return (
                                    <Card
                                        key={index}
                                        style={{
                                            // width: 300,
                                            marginTop: 16,
                                        }}
                                        hoverable={true}
                                        actions={[
                                            <EditOutlined onClick={() => onClickPost(item)} key="edit" />,
                                            <Popconfirm
                                                placement="topLeft"
                                                title="Are you sure?"
                                                description="Are you sure to delete this post?"
                                                onConfirm={() => onClickDeletePost(item._id)}
                                                okText="Yes"
                                                cancelText="No"
                                                key="delete"
                                            >
                                                <span style={{ cursor: 'pointer', margin: "0 20px" }}>
                                                    <DeleteOutlined />
                                                </span>
                                            </Popconfirm>,
                                            // <DeleteOutlined onClick={() => console.log("click setting")} key="delete" />,
                                        ]}
                                    >
                                        <Meta
                                            onClick={() => {
                                                setOpenEditModal(true);
                                                setPostInfo(item);
                                            }}
                                            avatar={<Avatar size={'large'} src={item.author.image ? item.author.image : imgUEF} />}
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
                            })
                            :
                            <Empty
                                style={{
                                    height: 'inherit',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column'
                                }}
                                description='Send a message!'
                            />
                        }
                    </div>
                </Col>
                <Col span={8}>
                    dont know what to do with it
                </Col>
            </Row>
            <Suspense fallback={<LoadingComponent />}>
                <AddPost
                    isOpenAddModal={isOpenAddModal}
                    setOpenAddModal={setOpenAddModal}
                    fetchPosts={fetchPosts}
                />
            </Suspense>
            <Suspense fallback={<LoadingComponent />}>
                <UpdatePost
                    isOpenEditModal={isOpenEditModal}
                    setOpenEditModal={setOpenEditModal}
                    postInfo={postInfo}
                    fetchPosts={fetchPosts}
                />
            </Suspense>

        </ >
    )
}

export default Post;