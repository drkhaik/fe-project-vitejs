import React, { useState, useEffect } from 'react';
import {
    Modal, Select, Form, Row, Col, Input, message
} from 'antd';
import { fetchAllFaculties, changeDepartmentFaculty } from '../../services/api';
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
    }

    useEffect(() => {
        fetchDataFaculties();
    }, []);

    const onFinish = async (values) => {
        const { faculty } = values;
        setSubmit(true);
        const res = await changeDepartmentFaculty({
            _id: userId,
            faculty: faculty,
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
            maskClosable={false}
            closable={false}
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
                </Row>
            </Form>
        </Modal>
    )
}

const areEqual = (prevProps, nextProps) => {
    return prevProps.isModalOpen === nextProps.isModalOpen
        && prevProps.userId === nextProps.userId;
}

export default React.memo(ModalChooseFaculty, areEqual);
