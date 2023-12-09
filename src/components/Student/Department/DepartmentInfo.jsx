import imgUEF from '../../../assets/team_UEF.png';
import {
    Row, Col
} from 'antd';
// import './DepartmentInfo.scss';

const DepartmentInfo = () => {
    return (
        <Row className='department-info'>
            <Col xs={0} sm={0} md={6} className='left'>
                <div className='thumbnail'>
                    <img src={imgUEF} alt="Thumbnail UEF Department" />
                    {/* <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item.thumbnail}`} alt="thumbnail book" /> */}
                </div>
            </Col>
            <Col md={18} className='right'>
                <div>
                    <div className='department-name' > Department 1 </div>
                    <div className='description'>
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </div>
                </div>
                <div className='price' style={{ color: 'red' }}>
                    asads
                </div>
            </Col>
        </Row>
    )
}

export default DepartmentInfo;