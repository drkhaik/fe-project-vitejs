import React, { useState, useEffect, Suspense } from 'react'
import { AppstoreOutlined, } from '@ant-design/icons';
import { Row, Col, Empty } from 'antd';
import { fetchAllSubjects } from '../../../services/api';
import './document.scss';
import LoadingComponent from '../../Loading/loadingComponent';
const ListDocument = React.lazy(() => import('./ListDocument'));

const DocumentTable = () => {
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
        <div className='document-admin-wrapper'>
            <Row>
                <Col className='subject-section' style={{ paddingBottom: '1rem', borderBottom: '1px solid #c4c2c2' }} span={24}>
                    <h3 className='title'> Môn học </h3>
                    <div className='list-subject'>
                        {dataSubjects && dataSubjects.length > 0
                            &&
                            dataSubjects.map((item, index) => {
                                return (
                                    <span
                                        key={index}
                                        onClick={() => setSubjectId(item._id)}
                                        className={subjectId === item._id ? 'subject active' : 'subject'}
                                    >
                                        ({item.name})
                                    </span>
                                )
                            })
                        }
                    </div>
                </Col>
                <Col className='document-section' span={24}>
                    <Suspense fallback={<LoadingComponent />}>
                        <ListDocument
                            subjectId={subjectId}
                        />
                    </Suspense>
                </Col>
            </Row>
        </div>
    )
}

export default DocumentTable;
