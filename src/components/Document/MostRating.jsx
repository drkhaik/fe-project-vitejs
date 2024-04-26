import React, { useState, useEffect, Suspense } from 'react'
import {
    Row, Col, Card, Empty, Tooltip, Rate
} from 'antd';
import { fetchDocumentMostRating } from '../../services/api';
import { UserOutlined, FileOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import './mostRating.scss';

const { Meta } = Card;

const MostRating = () => {
    const user = useSelector(state => state.account.user);
    const [documents, setDocuments] = useState([]);

    const fetchDocumentMostRatingTest = async () => {
        try {
            const res = await fetchDocumentMostRating();
            if (res && res.errCode === 0 && res.data) {
                let data = res.data;
                for (let i = 0; i < data.length; i++) {
                    // define whether user has rated this document
                    let isRated = data[i].ratings && data[i].ratings.some(userId => userId.toString() === user._id);                    if (isRated) {
                        data[i].rated = 1;
                    }
                }
                setDocuments(data);
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchDocumentMostRatingTest();
    }, []);

    return (
        <>
            <div className='document-most-rating'>
                <h4 className='title'>Document has the most ratings</h4>
           
                {documents && documents.length > 0
                    ?
                    <Row className='document-wrapper'>
                        {documents.map((item, index) => {
                            return (
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{marginBottom: '0.4rem'}} key={index}>
                                    <Card
                                        title={
                                            <div className='title-card'>
                                                <span className='title'>{item.name}</span>
                                                <span className='rate-number'>
                                                    <Rate
                                                        count={1}
                                                        value={item.rated ? 1 : 0}
                                                        tooltips={['Useful']}
                                                        style={{ marginRight: '0.3rem' }}
                                                        disabled
                                                    />
                                                    <span style={{ color: '#990000' }}>{item.ratings ? item.ratings.length : 0}</span>
                                                </span>
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
                                        {/* <Meta
                                            // style={{ borderTop: '1px solid #000' }}
                                            avatar={<Avatar src={item.author ? item.author.image : ''} size="large" icon={<UserOutlined />} />}
                                            title={item.author ? item.author.name : 'Anonymous'}
                                            description={<p className='created-at'> Created: {moment(item.updatedAt).format('DD-MM-YYYY')} </p>}
                                        /> */}
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row>
                    :
                    <Empty
                        style={{
                            height: 'inherit',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column'
                        }}
                        description='No data'
                    />
                }
            </div>

        </>
    )
}

export default MostRating;
