import React, { useState, useEffect, Suspense } from 'react';
import {
    List, Row, Col
} from 'antd';
import { fetchAllSubjects, createSubject, updateSubject, deleteSubject } from '../../../services/api';
import LoadingComponent from '../../Loading/loadingComponent';
import './document.scss';
import DocumentContent from './content';

const Document = () => {
    const [dataSubjects, setAllDataSubjects] = useState([]);
    const [subjectId, setSubjectId] = useState(null);

    const fetchDataSubjects = async () => {
        try {
            const res = await fetchAllSubjects();
            if (res && res.errCode === 0 && res.data) {
                let data = res.data;
                let dataSubjects = []
                for (let index = 0; index < data.length; index++) {
                    const item = data[index];
                    const newItem = {
                        ...item,
                        key: index + 1,
                    };
                    dataSubjects.push(newItem);
                }
                setAllDataSubjects(dataSubjects);
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchDataSubjects();
    }, []);

    return (
        <div className='document-sharing-wrapper'>

            <Row>
                <Col span={24}>
                    <Row justify={'space-between'} className="homepage-container">
                        <Col span={5} className='sidebar'>
                            <div>
                                <h4 className='title-sidebar'>Môn học</h4>
                            </div>
                            <Suspense fallback={<LoadingComponent />}>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={dataSubjects}
                                    className='list-department'
                                    style={{ maxHeight: 'auto', overflow: 'auto' }}
                                    size='small'
                                    renderItem={(item, index) => (
                                        <List.Item>
                                            <List.Item.Meta
                                                title={
                                                    <a
                                                        key={index}
                                                        onClick={() => setSubjectId(item._id)}>
                                                        <span className='title-status'>
                                                            <p className='title-subject'>{item.name}</p>
                                                        </span>
                                                    </a>
                                                }
                                            />
                                        </List.Item>
                                    )}
                                />
                            </Suspense>
                        </Col>
                        <Col span={19} className='content'>
                            <DocumentContent
                                subjectId={subjectId}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row >

        </div >

    )
}

export default Document;