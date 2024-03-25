import React, { useEffect, useState, Suspense } from 'react';
import { Table, Popconfirm, message } from 'antd';
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { fetchAllPost, deletePost } from '../../../services/api';
const UpdatePost = React.lazy(() => import('./UpdatePost'));
import LoadingComponent from '../../Loading/loadingComponent';
import moment from 'moment';

const PostTable = () => {
    const [dataPosts, setAllDataPost] = useState([]);
    const [isOpenEditModal, setOpenEditModal] = useState(false);
    const [postInfo, setPostInfo] = useState(null);

    const fetchDataPost = async () => {
        try {
            const res = await fetchAllPost();
            if (res && res.errCode === 0 && res.data) {
                let data = res.data;
                let dataPosts = []
                for (let index = 0; index < data.length; index++) {
                    const item = data[index];
                    const newItem = {
                        ...item,
                        key: index + 1,
                    };
                    dataPosts.push(newItem);
                }
                setAllDataPost(dataPosts);
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchDataPost();
    }, []);

    const onClickDeletePost = async (_id) => {
        try {
            const res = await deletePost(_id);
            if (res && res.errCode === 0) {
                message.success("Success!");
                await fetchDataPost();
            } else {
                message.error("Oops...something went wrong...");
            }
        } catch (e) {
            console.log(e);
        }
    }

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
        },
        {
            title: 'Author',
            dataIndex: 'author',
            render: (text, record, index) => {
                return (
                    <>
                        {record ? record.author.name : 'Anonymous'}
                    </>
                )
            }
        },
        {
            title: 'Created at',
            dataIndex: 'createdAt',
            render: (text, record, index) => {
                return (
                    <>
                        {moment(record.createdAt).format('DD-MM-YYYY')}
                    </>
                )
            }
        },
        {
            title: 'Last modified',
            dataIndex: 'createdAt',
            render: (text, record, index) => {
                return (
                    <>
                        {moment(record.updatedAt).format('DD-MM-YYYY')}
                    </>
                )
            }
        },
        {
            title: 'Action',
            width: 100,
            render: (text, record, index) => {
                return (
                    <div style={{ textAlign: 'center' }}>
                        <EditTwoTone
                            twoToneColor="#f6910b"
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                setOpenEditModal(true)
                                setPostInfo(record)
                            }}
                        />
                        <Popconfirm
                            placement="topLeft"
                            title="Are you sure?"
                            description="Are you sure to delete?"
                            onConfirm={() => onClickDeletePost(record._id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <span style={{ cursor: 'pointer', margin: "0 20px" }}>
                                <DeleteTwoTone twoToneColor="#ff4d4f" />
                            </span>
                        </Popconfirm>
                    </div>
                )
            }
        },
    ];

    return (
        <>
            <div style={{ backgroundColor: '#fff', padding: '1rem' }}>
                <Table
                    columns={columns}
                    dataSource={dataPosts}
                />
            </div>

            <Suspense fallback={<LoadingComponent />}>
                <UpdatePost
                    postInfo={postInfo}
                    isOpenEditModal={isOpenEditModal}
                    setOpenEditModal={setOpenEditModal}
                    fetchDataPost={fetchDataPost}
                />
            </Suspense>
        </>
    )
}


export default PostTable;