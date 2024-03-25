import React, { useEffect, useState } from 'react';
import { Button, Table, Popconfirm, Tabs, Modal, Form, Row, Col, message, Input, Divider } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone, EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { fetchAllFaculties, createFaculty, updateFaculty, deleteFaculty } from '../../../services/api';

const FacultyTable = () => {
    const [dataFaculties, setAllDataFaculty] = useState([]);
    const [form] = Form.useForm();
    const [isSubmit, setSubmit] = useState(false);

    const fetchDataFaculties = async () => {
        try {
            const res = await fetchAllFaculties();
            if (res && res.errCode === 0 && res.data) {
                let data = res.data;
                let dataFaculties = []
                for (let index = 0; index < data.length; index++) {
                    const item = data[index];
                    const newItem = {
                        ...item,
                        key: index + 1,
                    };
                    dataFaculties.push(newItem);
                }
                setAllDataFaculty(dataFaculties);
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchDataFaculties();
    }, []);

    const onClickDeleteFaculty = async (_id) => {
        try {
            const res = await deleteFaculty(_id);
            if (res && res.errCode === 0) {
                message.success("Success!");
                await fetchDataFaculties();
            } else {
                message.error("Oops...something went wrong...");
            }
        } catch (e) {
            console.log(e);
        }
    }

    const onFinish = async (values) => {
        try {
            const { name } = values;
            setSubmit(true);
            const res = await createFaculty({ name: name });
            if (res && res.errCode === 0) {
                message.success("Successful!");
                form.resetFields();
                await fetchDataFaculties();
            } else {
                message.error("Oops...something went wrong!");
            }
            setSubmit(false);
        } catch (e) {
            console.log(e);
        }
    }

    const [valueInput, setValueInput] = useState("");
    const [keySetting, setKeySetting] = useState("");

    const handleInputChange = (value) => {
        // console.log("check value", value);
        setValueInput(value);
    };

    const handleInputBlur = () => {
        setKeySetting("");
    };

    const handleEditingName = async (_id) => {
        try {
            const res = await updateFaculty({
                _id: _id,
                name: valueInput
            });
            if (res && res.errCode === 0) {
                message.success("Successful!");
                form.resetFields();
                await fetchDataFaculties();
            } else {
                message.error("Oops...something went wrong!");
            }
            setKeySetting("");
        } catch (e) {
            console.log(e);
        }
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text, record, index) => {
                return (
                    <>
                        {keySetting === index ?
                            <>
                                <Input
                                    key={index}
                                    style={{
                                        width: '20%',
                                    }}
                                    value={valueInput}
                                    onChange={(e) => handleInputChange(e.target.value)}
                                    // onBlur={handleInputBlur}
                                    autoFocus
                                />
                                <Divider type='vertical' />
                                <Button onClick={() => handleEditingName(record._id)}
                                >
                                    <CheckCircleTwoTone
                                        twoToneColor="#7bfa42"
                                        style={{ cursor: 'pointer', fontSize: 18 }}
                                    />
                                </Button>
                                <Divider type='vertical' />
                                <Button onClick={() => setKeySetting("")}>
                                    <CloseCircleTwoTone
                                        twoToneColor="#f02719"
                                        style={{ cursor: 'pointer', fontSize: 18 }}
                                    />
                                </Button>
                            </>
                            :
                            <label
                                key={index}
                                onDoubleClick={() => {
                                    setKeySetting(index)
                                    setValueInput(record.name)
                                }}
                            >
                                {record.name}
                            </label>
                        }
                    </>
                )
            }

        },
        {
            title: 'Action',
            width: 100,
            render: (text, record, index) => {
                return (
                    <div style={{ textAlign: 'center' }}>
                        <Popconfirm
                            placement="topLeft"
                            title="Are you sure?"
                            description="Are you sure to delete?"
                            onConfirm={() => onClickDeleteFaculty(record._id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <span style={{ cursor: 'pointer', margin: "0 20px" }}>
                                <DeleteTwoTone twoToneColor="#ff4d4f" />
                            </span>
                        </Popconfirm>
                    </div>
                )
            }
        },

    ];

    return (
        <>
            <div style={{ backgroundColor: '#fff', padding: '1rem' }}>
                <div>
                    <Form
                        name="basic"
                        style={{ maxWidth: "100%", margin: '0 auto' }}
                        onFinish={onFinish}
                        form={form}
                        autoComplete="off"
                    >
                        <Row justify={'space-between'}>
                            <Col span={21}>
                                <Form.Item
                                    // labelCol={{ span: 24 }}
                                    label="Name"
                                    name="name"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={2}>
                                <Button type="primary" htmlType="submit" loading={isSubmit}>
                                    Add
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <Table
                    columns={columns}
                    dataSource={dataFaculties}
                />
            </div>
            {/* <AddNew
                openAddNewModal={openAddNewModal}
                setOpenAddModal={setOpenAddModal}
                listRole={listRole}
                fetchDataUser={fetchDataUser}
            />

            <ShowDetail
                userInfo={userInfo}
                openDetailDrawer={openDetailDrawer}
                setOpenDetailDrawer={setOpenDetailDrawer}
            /> */}


        </>
    )
}


export default FacultyTable;