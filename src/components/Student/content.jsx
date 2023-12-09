import { fetchAllUserAPI, createUser } from '../../services/api';
import {
    Row, Col, Divider
} from 'antd';
import imgUEF from '../../assets/team_UEF.png';
import { useNavigate } from 'react-router-dom';

const Content = (props) => {
    const navigate = useNavigate();

    const handleRedirectAskQuestion = () => {
        navigate('/department');
    }

    return (
        <Row>
            <Col xs={24} sm={24} md={0}>
                {/* <div className="" onClick={() => { setOpenDrawer(true) }}>
                            <FilterTwoTone style={{ fontSize: '18px' }} /> Lọc
                        </div> */}
                <Divider style={{ margin: "10px 0" }} />
            </Col>
            <Row className='customize-row'>
                <>
                    <div className="column" onClick={() => navigate('/department')}>
                        <div className='thumbnail' style={{ marginTop: '15px' }}>
                            <img src={imgUEF} alt="Thumbnail UEF Department" />

                        </div>
                        <div className='info'>
                            <div>
                                <div className='department-name' > Department 1 </div>
                                <div className='description'>
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                </div>
                            </div>
                            <div className='abc'>
                                asads
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className='thumbnail' style={{ marginTop: '15px' }}>
                            <img src={imgUEF} alt="Thumbnail UEF Department" />

                        </div>
                        <div className='info'>
                            <div>
                                <div className='department-name' > Department 1 </div>
                                <div className='description'>
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                </div>
                            </div>
                            <div className='abc'>
                                asads
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className='thumbnail' style={{ marginTop: '15px' }}>
                            <img src={imgUEF} alt="Thumbnail UEF Department" />

                        </div>
                        <div className='info'>
                            <div>
                                <div className='department-name' > Department 1 </div>
                                <div className='description'>
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                </div>
                            </div>
                            <div className='abc'>
                                asads
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className='thumbnail' style={{ marginTop: '15px' }}>
                            <img src={imgUEF} alt="Thumbnail UEF Department" />

                        </div>
                        <div className='info'>
                            <div>
                                <div className='department-name' > Department 1 </div>
                                <div className='description'>
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                </div>
                            </div>
                            <div className='abc'>
                                asads
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className='thumbnail' style={{ marginTop: '15px' }}>
                            <img src={imgUEF} alt="Thumbnail UEF Department" />

                        </div>
                        <div className='info'>
                            <div>
                                <div className='department-name' > Department 1 </div>
                                <div className='description'>
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                </div>
                            </div>
                            <div className='abc'>
                                asads
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className='thumbnail' style={{ marginTop: '15px' }}>
                            <img src={imgUEF} alt="Thumbnail UEF Department" />

                        </div>
                        <div className='info'>
                            <div>
                                <div className='department-name' > Department 1 </div>
                                <div className='description'>
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                </div>
                            </div>
                            <div className='abc'>
                                asads
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className='thumbnail' style={{ marginTop: '15px' }}>
                            <img src={imgUEF} alt="Thumbnail UEF Department" />

                        </div>
                        <div className='info'>
                            <div>
                                <div className='department-name' > Department 1 </div>
                                <div className='description'>
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                </div>
                            </div>
                            <div className='abc'>
                                asads
                            </div>
                        </div>
                    </div>
                </>
            </Row>
        </Row>
    )
}

export default Content;