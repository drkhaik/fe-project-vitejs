import React, { useState, useEffect } from 'react';
import {
    Modal, Select, Form, Row, Col, Input, message
} from 'antd';
import { fetchAllFaculties, changeUserFaculty } from '../../services/api';
import { useDispatch } from 'react-redux';
import { fetchUserAccountReduxThunk } from '../../redux/account/accountSlice';

const ModalChooseFaculty = (props) => {
    const { isModalOpen, setModalOpen, userId } = props;
    const dispatch = useDispatch();
    const [options, setOptionSelect] = useState([]);
    const [form] = Form.useForm();
    const [isSubmit, setSubmit] = useState(false);

    const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const fetchDataFaculties = async () => {
        try {
            const res = await fetchAllFaculties();
            if (res && res.errCode === 0 && res.data) {
                let data = res.data;
                let dataFaculties = []
                for (let index = 0; index < data.length; index++) {
                    const item = data[index];
                    const newItem = {
                        label: item.name,
                        value: item._id,
                    };
                    dataFaculties.push(newItem);
                }
                setOptionSelect(dataFaculties);
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchDataFaculties();
    }, []);

    const onFinish = async (values) => {
        // console.log("check value", values);
        try {
            const { faculty, studentId } = values;
            setSubmit(true);
            const res = await changeUserFaculty({
                _id: userId,
                faculty: faculty,
                studentId: studentId
            });
            if (res && res.errCode === 0) {
                message.success("Successful!");
                form.resetFields();
                dispatch(fetchUserAccountReduxThunk());
            } else {
                message.error("Oops...something went wrong!");
            }
            setSubmit(false);
            setModalOpen(false);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Modal
            // title="Detail Post"
            open={isModalOpen}
            onCancel={() => setModalOpen(false)}
            onOk={() => form.submit()}
            okText="Submit"
            width="30vw"
            centered={true}
            confirmLoading={isSubmit}
        >
            <Form
                name="basic"
                style={{ maxWidth: "100%", margin: '0 auto' }}
                onFinish={onFinish}
                form={form}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
            //https://stackoverflow.com/questions/61244343/defaultvalue-of-input-not-working-correctly-on-ant-design
            >
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            label="Khoa"
                            name="faculty"
                            rules={[{ required: true, message: 'Khoa không được để trống!' }]}
                        >
                            <Select
                                showSearch
                                placeholder="Chọn Khoa của bạn"
                                optionFilterProp="children"
                                filterOption={filterOption}
                                options={options}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            label="Mã số sinh viên"
                            name="studentId"
                            rules={[
                                { required: true, message: 'MSSV không được để trống' },
                                { pattern: /^[0-9]*$/, message: 'Mã số sinh viên chỉ được nhập số' },
                                { len: 9, message: 'Mã số sinh viên cần phải có đúng 9 ký tự' },
                            ]}
                        >
                            <Input placeholder="Nhập mã số sinh viên" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

const areEqual = (prevProps, nextProps) => {
    return prevProps.isModalOpen === nextProps.isModalOpen
        && prevProps.postInfo === nextProps.postInfo;
}

export default React.memo(ModalChooseFaculty, areEqual);
