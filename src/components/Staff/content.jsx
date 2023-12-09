import { useEffect, useState } from 'react';
import {
    Row, Col, Form, Divider, Button, Tag, Input, Skeleton
} from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

const { TextArea } = Input;

const ContentStaffSide = (props) => {
    console.log("check props", props);
    const { userID } = props;
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
            .then((res) => res.json())
            .then((body) => {
                setData([...data, ...body.results]);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        loadMoreData();
    }, []);

    const onFinish = async (values) => {
        // console.log('Received values of form: ', values);
        // const { fullname, email, password } = values;
        // // console.log("check", fullname, email, password);
        // setIsSubmit(true);
        // let res = await createUser(fullname, email, password);
        // setIsSubmit(false);
        // if (res) {
        //     // localStorage.setItem('access_token', res.data.access_token)
        //     // dispatch(doLoginAction(res.data.user))
        //     message.success("Successfully!");
        // } else {
        //     notification.error({
        //         message: "Something went wrong...",
        //         description: res.message ? res.message : "ok",
        //         duration: 3
        //     })
        // }
    };

    return (
        <div className='staff-body'>
            <Row>
                <Col span={24}>
                    <Divider orientation="left">
                        <Tag color="#108ee9" style={{ marginRight: 0 }}>Ho Ten SV</Tag> <Divider type="vertical" /> <Tag color="#108ee9">MSSV</Tag>
                    </Divider>
                    {/* <Button type="primary">Primary Button {props.userID}</Button> */}
                </Col>
                <Col
                    span={24}
                    id="scrollableDiv"
                    style={{
                        height: 400,
                        overflow: 'auto',
                        padding: '10px 16px',
                        border: '1px solid rgba(140, 140, 140, 0.35)',
                    }}
                >
                    <InfiniteScroll
                        style={{ marginBottom: '10px' }}
                        dataLength={3}
                        // next={loadMoreData}
                        hasMore={3 < 20}
                        scrollableTarget="scrollableDiv"
                        initialScrollY={300}
                    >
                        <Row>
                            <Col md={20} push={0} style={{ paddingBottom: '15px' }}>
                                <TextArea
                                    disabled
                                    // showCount
                                    // maxLength={100}
                                    // onChange={onChangeQuestion}
                                    value={"Câu hỏi của sinh viên?"}
                                    className='question'
                                    style={{
                                        height: 100,
                                        resize: 'none',
                                        backgroundColor: userID === 1 ? '#daeaffbf' : '#f3d6d6'
                                    }}
                                />
                            </Col>
                            <Col md={20} push={4} style={{ paddingBottom: '15px' }}>
                                <TextArea
                                    disabled
                                    // showCount
                                    // maxLength={100}
                                    // onChange={onChangeQuestion}
                                    value={"Phản hồi của phòng công tác sinh viên"}
                                    className='answer'
                                    style={{
                                        height: 'auto',
                                        resize: 'none',
                                        backgroundColor: '#f3d6d6'
                                    }}
                                />
                            </Col>
                            <Col md={20} push={0} style={{ paddingBottom: '15px' }}>
                                <TextArea
                                    disabled
                                    // showCount
                                    // maxLength={100}
                                    // onChange={onChangeQuestion}
                                    value={"Câu hỏi của sinh viên?"}
                                    className='question'
                                    style={{
                                        height: 100,
                                        resize: 'none',
                                        backgroundColor: '#daeaffbf'
                                    }}
                                />
                            </Col>
                            <Col md={20} push={4} style={{ paddingBottom: '15px' }}>
                                <TextArea
                                    disabled
                                    // showCount
                                    // maxLength={100}
                                    // onChange={onChangeQuestion}
                                    value={"Phản hồi của phòng công tác sinh viên"}
                                    className='answer'
                                    style={{
                                        height: 100,
                                        resize: 'none',
                                        backgroundColor: '#f3d6d6'
                                    }}
                                />
                            </Col>
                            <Col md={20} push={0} style={{ paddingBottom: '15px' }}>
                                <TextArea
                                    disabled
                                    // showCount
                                    // maxLength={100}
                                    // onChange={onChangeQuestion}
                                    value={"Câu hỏi của sinh viên?"}
                                    className='question'
                                    style={{
                                        height: 100,
                                        resize: 'none',
                                        backgroundColor: '#daeaffbf'
                                    }}
                                />
                            </Col>
                        </Row>

                    </InfiniteScroll>
                </Col>
                <Col span={24}>
                    <Row className="staff-container">
                        <Col md={24}>
                            <Divider orientation="left" plain>
                                Phản hồi:
                            </Divider>
                        </Col>

                        <Col md={24} className='answer-section'>
                            <Form
                                // name="basic"
                                style={{ maxWidth: "100%", margin: '0 auto' }}
                                onFinish={onFinish}
                                form={form}
                                // onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            //https://stackoverflow.com/questions/61244343/defaultvalue-of-input-not-working-correctly-on-ant-design
                            >
                                <Form.Item
                                    name="question"
                                // label="Name"
                                // style={{ width: '30%' }}
                                >
                                    <TextArea
                                        showCount
                                        // maxLength={100}
                                        // onChange={onChangeQuestion}
                                        placeholder="Nhập câu trả lời!"
                                        style={{
                                            height: 100,
                                            resize: 'none',
                                        }}

                                    />
                                </Form.Item>
                                <div style={{ display: 'flex', paddingTop: '10px', justifyContent: 'end', gap: 20 }}>
                                    <Button type="primary" danger >Cancel {props.userID}</Button>
                                    <Button type="primary" htmlType="submit" >
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default ContentStaffSide;