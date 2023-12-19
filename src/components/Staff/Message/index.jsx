import { useEffect, useState } from 'react';
import {
    Row, Col, Form, Divider, Button, Tag, Input, Drawer, Upload, message
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
const { Dragger } = Upload;
const { TextArea } = Input;

const Message = (props) => {
    console.log("check props", props);

    const { userID, isOpenDrawer, setOpenDrawer } = props;
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

    const beforeUpload = async (file) => {
        if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg') {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error('Ảnh phải nhỏ hơn 2MB!');
            }
            return isLt2M;
        } else if (file.type === 'application/pdf' || file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isLt5M) {
                message.error('Tập tin PDF hoặc Excel phải nhỏ hơn 5MB!');
            }
            return isLt5M;
        } else {
            message.error('Bạn chỉ có thể tải lên file JPG/PNG, PDF hoặc Excel!');
            return false;
        }
    }
    const handleChange = (info) => {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    const handleUploadFile = async ({ file, onSuccess, onError }) => {
        // const res = await callUploadFileAPI(file, public_id);
        // if (res && res.data && res.errCode === 0) {
        //     let public_id = res.data.public_id;
        //     let url = res.data.url;
        //     setPublic_id(public_id);
        //     setUrlImage(url);
        //     onSuccess('ok');
        // } else {
        //     onError('Upload file failed!');
        // }
        onSuccess('ok');

    };

    return (
        <div>
            <Drawer
                title={
                    <>
                        <Tag color="#108ee9" style={{ marginRight: 0 }}>Ho Ten SV</Tag> <Tag color="#108ee9">MSSV</Tag>
                    </>
                }
                placement="right"
                onClose={() => setOpenDrawer(false)}
                open={isOpenDrawer}
                width={'50vw'}
            >
                <Row>
                    {/* <Col span={24}>
                        <Divider orientation="left">
                            <Tag color="#108ee9" style={{ marginRight: 0 }}>Ho Ten SV</Tag> <Divider type="vertical" /> <Tag color="#108ee9">MSSV</Tag>
                        </Divider>
                    </Col> */}
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
                            initialScrollY={10}
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
                                    <Upload
                                        customRequest={handleUploadFile}
                                        beforeUpload={beforeUpload}
                                        onChange={handleChange}
                                        accept=".pdf,.xls,.xlsx,image/*"
                                        maxCount={5}
                                        multiple={true}
                                    >
                                        <Button icon={<UploadOutlined />}>Tải lên PDF hoặc Excel</Button>
                                    </Upload>
                                    <Form.Item
                                        name="question"
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
                                        <Button type="primary" danger >Cancel {userID}</Button>
                                        <Button type="primary" htmlType="submit" >
                                            Submit
                                        </Button>
                                    </div>
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Drawer>
        </div>
    )
}

export default Message;