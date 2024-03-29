import React, { useState, useEffect, Suspense } from 'react'
import {
    Row, Col, Card, Avatar, Tooltip, Button
} from 'antd';
import { fetchDocumentBySubjectId } from '../../../services/api';
import imgStudyTogether from '../../../assets/4805841.webp';
import { UserOutlined, FileOutlined } from '@ant-design/icons';
const ModalAddDocument = React.lazy(() => import('./ModalAddDocument'));
import LoadingComponent from '../../Loading/loadingComponent';
import moment from 'moment';

const { Meta } = Card;

const DocumentContent = (props) => {
    const { subjectId } = props;
    const [documents, setDocuments] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);


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

    return (
        <>
            <div>
                <h3 className='title'>Document Sharing for Students UEF</h3>
            </div>
            <div className='button-add'>
                <Button type='primary' onClick={() => setModalOpen(true)}> Thêm tài liệu </Button>
            </div>
            <div className='document-wrapper'>
                {documents && documents.length > 0
                    ?
                    <Row gutter={16}>
                        {documents.map((item, index) => {
                            return (
                                <Col span={6} key={index}>
                                    <Card
                                        title={item.name}
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
                    // <Empty
                    //     style={{
                    //         height: 'inherit',
                    //         display: 'flex',
                    //         justifyContent: 'center',
                    //         alignItems: 'center',
                    //         flexDirection: 'column'
                    //     }}
                    //     description='No data'
                    // />
                    <div className='no-data'>
                        <img src={imgStudyTogether} alt="UEF Student" />
                    </div>
                }
            </div>

            <Suspense fallback={<LoadingComponent />}>
                <ModalAddDocument
                    isModalOpen={isModalOpen}
                    setModalOpen={setModalOpen}
                    fetchDataDocuments={fetchDataDocuments}
                />
            </Suspense>

        </>
    )
}

const areEqual = (prevProps, nextProps) => {
    return prevProps.subjectId === nextProps.subjectId
}

export default React.memo(DocumentContent, areEqual);
