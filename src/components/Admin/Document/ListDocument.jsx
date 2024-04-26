import React, { useState, useEffect } from 'react'
import { Row, Col, Empty, Avatar, Tooltip, Card, Popconfirm, message } from 'antd';
import { UserOutlined, FileOutlined, DeleteTwoTone } from '@ant-design/icons';
import { fetchDocumentBySubjectId, deleteDocument } from '../../../services/api';
import moment from 'moment';

const { Meta } = Card;

const ListDocument = (props) => {
    const { subjectId } = props;
    const [documents, setDocuments] = useState([]);

    const fetchDataDocuments = async (subjectId) => {
        try {
            const res = await fetchDocumentBySubjectId(subjectId);
            if (res && res.errCode === 0 && res.data) {
                setDocuments(res.data);
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchDataDocuments(subjectId);
    }, [subjectId]);

    const handleDelete = async (_id) => {
        try {
            const res = await deleteDocument(_id);
            if (res && res.errCode === 0) {
                message.success("Success!");
                await fetchDataDocuments(subjectId);
            } else {
                message.error("Oops...something went wrong...");
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className='list-document'>
            {documents && documents.length > 0
                ?
                <Row gutter={16}>
                    {documents.map((item, index) => {
                        return (
                            <Col span={6} key={index}>
                                <Card
                                    title={
                                        <div className='title-card'>
                                            <span className='title'> {item.name}</span>
                                            <Popconfirm
                                                placement="topLeft"
                                                title="Are you sure?"
                                                description="Are you sure to delete?"
                                                onConfirm={() => handleDelete(item._id)}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <span style={{ cursor: 'pointer', margin: "0 20px" }}>
                                                    <DeleteTwoTone twoToneColor="#fff" />
                                                </span>
                                            </Popconfirm>
                                        </div>
                                    }
                                    hoverable={true}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className='card-document'>
                                        <a className='click-download' href={item.fileUrl} target="_blank" download>
                                            <div className='icon'>
                                                <FileOutlined />
                                            </div>
                                            <div className='info'>
                                                <Tooltip title={item.fileName} color={'#000'}>
                                                    {/* <span>Name: <p className="file-name">{item.fileName}</p></span> */}
                                                    <p><span className="file-name">{item.fileName}</span></p>
                                                </Tooltip>
                                                <div className='download-info'>
                                                    <p className='file-size'>Type: {item.fileType}</p>
                                                    <p className='file-size'>Size: {(item.fileSize / (1024 * 1024)).toFixed(2)} MB</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <Meta
                                        // style={{ borderTop: '1px solid #000' }}
                                        avatar={<Avatar src={item.author ? item.author.image : ''} size="large" icon={<UserOutlined />} />}
                                        title={item.author ? item.author.name : 'Anonymous'}
                                        description={<p className='created-at'> Created: {moment(item.updatedAt).format('DD-MM-YYYY')} </p>}
                                    />
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
                :
                <Empty
                    style={{
                        minHeight: 'inherit',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}
                    description='No data'
                />
            }
        </div>
    )
}

export default ListDocument
