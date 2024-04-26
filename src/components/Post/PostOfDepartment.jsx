import React, { useState, useEffect, Suspense } from 'react';
import {
    Row, Col, Tag, Typography, Card, Avatar, Image, Empty
} from 'antd';
const { Title, Paragraph, Text, Link } = Typography;
const { Meta } = Card;
import imgUEF from '../../assets/logo-uef-home.jpg';
import { useSelector } from 'react-redux';
import './post.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ClipLoader } from "react-spinners";
const MostRating = React.lazy(() => import('../Document/MostRating'));
import LoadingComponent from '../Loading/loadingComponent';



const PostOfDepartment = (props) => {
    const { postList, departmentInfo, fetchMorePost, hasMore } = props;

    const onClickPost = (item) => {
        setOpenEditModal(true);
        setPostInfo(item);
    }

    return (
        <>
            <Row className='post-wrapper' style={{ padding: 15 }}>
                <Col span={6} style={{ position: 'sticky', top: 0 }}>
                    <Card
                        style={{
                            position: 'sticky', top: 5,
                            // width: 300,
                            borderColor: '#d2d0d0',
                            margin: '0 1em 0 0px',
                            // backgroundColor: '#f7f7f7'
                        }}
                    >
                        <p><b>Name</b> {departmentInfo.name}</p>
                        <p><b>Email:</b> {departmentInfo.email}</p>
                        <p><b>Description:</b> {departmentInfo.description}</p>
                        <Image
                            width={100}
                            src={departmentInfo.image}
                        />
                    </Card>
                </Col>
                <Col span={13}>
                    <div>
                        <InfiniteScroll
                            dataLength={postList.length}
                            next={fetchMorePost}
                            hasMore={hasMore}
                            loader={<div style={{
                                marginTop: '10px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <ClipLoader size={20} color="#468aeb" loading={true} />
                            </div>}
                            endMessage={
                                <p style={{ textAlign: 'center' }}>
                                    <b>Yay! You have seen it all</b>
                                </p>
                            }
                        >
                            {postList && postList.length > 0
                                ?
                                postList.map((item, index) => {
                                    return (
                                        <Card
                                            key={index}
                                            style={{
                                                // width: 300,
                                                marginBottom: 16,
                                                borderColor: '#d2d0d0',
                                            }}
                                            // onClick={() => {
                                            //     setPostInfo(item);
                                            // }}
                                            hoverable={true}
                                        >
                                            <Meta
                                                avatar={<Avatar size={'large'} src={item.author ? item.author.image : imgUEF} />}
                                                title={item.author ? item.author.name : 'UEF Department'}
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
                                    description='No data!'
                                />
                            }
                        </InfiniteScroll>
                    </div>
                </Col>
                <Col span={5}>
                    <Suspense fallback={<LoadingComponent />}>
                        <MostRating />
                    </Suspense>
                </Col>
            </Row >
        </ >
    )
}

export default PostOfDepartment;