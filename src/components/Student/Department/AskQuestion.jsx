import { useState, useEffect } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
    Row, Col, Divider, Input, message, notification, Form, Button
} from 'antd';
import './department.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import DepartmentInfo from '.';
import DepartmentInfo from './DepartmentInfo';
const { TextArea } = Input;

const AskQuestion = () => {
    const [form] = Form.useForm();
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const { dataBook } = props;

    const onFinish = async (values) => {
        // console.log('Received values of form: ', values);
        const { question } = values;
        console.log("check", question);
        onReset();
        notification.success({
            message: "Success",
            description: "The question has been saved in history.",
            duration: 3
        })
        // setIsSubmit(true);
        // let res = await createUser(fullname, email, password);
        // setIsSubmit(false);
        // console.log("check res", res);
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

    // const onChangeQuestion = (e) => {
    //     console.log('Change:', e.target.value);
    // };

    const onReset = () => {
        form.resetFields();
    };


    return (
        <div>
            <Row className="department-detail-container">
                <DepartmentInfo />

                <Col md={24}>
                    <Divider orientation="left" plain>
                        Câu hỏi:
                    </Divider>
                </Col>

                <Col md={24} className='question-section'>
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
                                maxLength={100}
                                // onChange={onChangeQuestion}
                                placeholder="Nhập câu hỏi vào đây!"
                                style={{
                                    height: 120,
                                    resize: 'none',
                                }}
                            />
                        </Form.Item>
                        <div style={{ display: 'flex', paddingTop: '10px', justifyContent: 'end', gap: 20 }}>
                            <Button type="primary" danger htmlType="submit">
                                Submit
                            </Button>
                            {/* <Button htmlType="button" onClick={onReset}>
                                Reset
                            </Button> */}
                        </div>
                    </Form>
                </Col>
            </Row>
        </div >
    )
}

export default AskQuestion;