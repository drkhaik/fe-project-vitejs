import React, { useEffect, useState } from 'react';
import { Upload, Modal, Form, Input, message, notification, Select, Avatar, Row, Col, Button, Divider } from 'antd';
import { LoadingOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { fetchAllFaculties, changeUserFaculty } from '../../services/api';
import { useDispatch } from 'react-redux';
import { fetchUserAccountReduxThunk } from '../../redux/account/accountSlice';


const { TextArea } = Input;
const UpdateInfoDepartment = (props) => {
    const {
        setModalAccountOpen,
        form,
        userInfo,
    } = props;
    const dispatch = useDispatch();
    const [isSubmit, setSubmit] = useState(false);
    const [options, setOptionSelect] = useState([]);
    const [showForm, setShowForm] = useState(false);

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
        try {
            const { _id, faculty, studentId } = values;
            setSubmit(true);
            const res = await changeUserFaculty({
                _id: _id,
                faculty: faculty,
                studentId: studentId
            });
            if (res && res.errCode === 0) {
                message.success("Successful!");
                form.resetFields();
            } else {
                message.error("Oops...something went wrong!");
            }
            setSubmit(false);
            setShowForm(false)
            setModalAccountOpen(false);
            dispatch(fetchUserAccountReduxThunk());
        } catch (error) {
            console.error("An error occurred: ", error);
        }
    };

    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 6,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 16,
            },
        },
    };

    return (
        <>
            <Row gutter={16}>
                <Col sm={24} md={8}>
                    <Row gutter={[30, 30]} style={{ justifyContent: 'center' }}>
                        <Col span={24}>
                            <Avatar
                                size={{ xs: 32, sm: 64, md: 80, lg: 128, xl: 160 }}
                                icon={<UserOutlined />}
                                shape='circle'
                                src={userInfo.image}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col sm={24} md={16}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0 30px 0' }}>
                        <h2 style={{ margin: 0 }}>{userInfo.name}</h2>
                        <Button
                            onClick={(event) => {
                                setShowForm(true)
                                event.preventDefault()
                            }}
                            style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}
                        >
                            Chỉnh sửa thông tin
                            <EditOutlined style={{ fontSize: 18 }} />
                        </Button>
                    </div>
                    {!showForm ?
                        <Form
                            name="update_info"
                            style={{ maxWidth: "100%", margin: '0 auto', paddingBottom: 30 }}
                            onFinish={onFinish}
                            form={form}
                            autoComplete="off"
                        // {...formItemLayout}
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                initialValue={userInfo.email}
                            >
                                <Input disabled />
                            </Form.Item>

                            <Form.Item
                                label="MSSV"
                                name="studentId"
                                initialValue={userInfo.studentId ? userInfo.studentId : ''}
                            >
                                <Input disabled />
                            </Form.Item>

                            <Form.Item
                                label="Khoa"
                                name="faculty"
                                initialValue={userInfo.faculty}
                            >
                                <Select
                                    disabled
                                    options={options}
                                />
                            </Form.Item>
                        </Form>
                        :
                        <Form
                            name="update_info"
                            style={{ maxWidth: "100%", margin: '0 auto' }}
                            onFinish={onFinish}
                            form={form}
                            autoComplete="off"
                        >
                            <Form.Item
                                hidden
                                labelCol={{ span: 24 }}
                                name="_id"
                                initialValue={userInfo._id}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                                initialValue={userInfo.email}
                            >
                                <Input disabled />
                            </Form.Item>

                            <Form.Item
                                label="MSSV"
                                name="studentId"
                                rules={[
                                    { required: true, message: 'MSSV không được để trống' },
                                    { pattern: /^[0-9]*$/, message: 'Mã số sinh viên chỉ được nhập số' },
                                    { len: 9, message: 'Mã số sinh viên cần phải có đúng 9 ký tự' },
                                ]}
                                initialValue={userInfo.studentId ? userInfo.studentId : ''}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Khoa"
                                name="faculty"
                                rules={[{ required: true, message: 'Khoa không được để trống!' }]}
                                initialValue={userInfo.faculty}
                            >
                                <Select
                                    showSearch
                                    placeholder="Chọn Khoa của bạn"
                                    filterOption={filterOption}
                                    options={options}
                                />
                            </Form.Item>
                            <div style={{ display: 'flex', paddingTop: '10px', justifyContent: 'end', gap: 20 }}>
                                <Button type="primary" htmlType="submit" loading={isSubmit}>
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    }
                </Col>
            </Row >
        </>
    )
}

const areEqual = (prevProps, nextProps) => {
    return prevProps.isModalAccountOpen === nextProps.isModalAccountOpen;
}

export default React.memo(UpdateInfoDepartment, areEqual);