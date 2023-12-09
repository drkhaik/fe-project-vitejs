import React, { useEffect, useState } from 'react';
import { Button, Table, Popconfirm, Tabs, Modal, Form, message } from 'antd';
import { ReloadOutlined, UserAddOutlined, EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import moment from 'moment';
import AddNewDepartment from './AddNew';
import { fetchAllDepartment, fetchAllRole, deleteDepartment } from '../../../services/api';
import ShowDetail from './ShowDetail';
import UpdateInfoDepartment from './UpdateInfo';
import ChangePassword from './ChangePassword';

const Department = () => {
    const [dataDepartment, setAllDataDepartment] = useState([]);
    const [listRole, setListRole] = useState([]);

    const [openAddNewModal, setOpenAddModal] = useState(false);
    const [openDetailDrawer, setOpenDetailDrawer] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [departmentInfo, setDepartmentInfo] = useState(null);

    const [formUpdateInfo] = Form.useForm();
    const [formChangePassword] = Form.useForm();

    const [isSubmitUpdateForm, setIsSubmitUpdateForm] = useState(false);

    console.log("check render parents component");

    const fetchDataDepartment = async () => {
        let res = await fetchAllDepartment();
        if (res && res.errCode === 0 && res.data) {
            let data = res.data;
            let dataDepartment = []
            for (let index = 0; index < data.length; index++) {
                const item = data[index];
                const newItem = {
                    ...item,
                    key: index + 1,
                };
                dataDepartment.push(newItem);
            }
            setAllDataDepartment(dataDepartment);
        }
    }

    useEffect(() => {
        fetchDataDepartment();
    }, []);

    useEffect(() => {
        const getAllRole = async () => {
            let res = await fetchAllRole();

            if (res && res.data) {
                let d = res.data.map(item => {
                    return { label: item.name, value: item.id }
                })
                setListRole(d);
            }
        }
        getAllRole();

    }, []);

    const onClickDeleteDepartment = async (id) => {
        const res = await deleteDepartment(id);
        if (res && res.errCode === 0) {
            message.success("Success!");
            fetchDataDepartment();
        } else {
            message.error("Oops...something went wrong...");
            // notification.error({
            //     message: 'Oops...something went wrong...',
            //     description: res.message
            // });
        }
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text, record, index) => {
                return (
                    <>
                        <a href='#' onClick={() => {
                            setOpenDetailDrawer(true);
                            setDepartmentInfo(record);
                        }}>
                            {record.name}
                        </a>
                    </>
                )
            }

        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'roleNameForDepartment',
            render: (text, record, index) => {
                return (
                    <>
                        {record.roleNameForDepartment.name}
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
                        <EditTwoTone
                            twoToneColor="#f6910b"
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                setOpenUpdateModal(true)
                                setDepartmentInfo(record)
                            }}
                        />
                        <Popconfirm
                            placement="topLeft"
                            title="Are you sure?"
                            description="Are you sure to delete this department?"
                            onConfirm={() => onClickDeleteDepartment(record.id)}
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

    const renderHeader = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Table List Department</span>
                <span style={{ display: 'flex', gap: 15 }}>
                    <Button
                        type="primary" icon={<UserAddOutlined />}
                        onClick={() => setOpenAddModal(true)}
                    >
                        Add new
                    </Button>
                    {/* <Button type='ghost' onClick={() => {
                        setFilter("")
                        setSortQuery("")
                    }}>
                        <ReloadOutlined />
                    </Button> */}
                </span>
            </div>
        )
    }

    const tabItems = [
        {
            key: 'update_info',
            label: `Cập nhật thông tin`,
            children:
                <UpdateInfoDepartment
                    openUpdateModal={openUpdateModal}
                    setOpenUpdateModal={setOpenUpdateModal}
                    form={formUpdateInfo}
                    setIsSubmitUpdateForm={setIsSubmitUpdateForm}
                    listRole={listRole}
                    departmentInfo={departmentInfo}
                    fetchDataDepartment={fetchDataDepartment}
                />,
        },
        {
            key: 'change_password',
            label: `Đổi mật khẩu`,
            children:
                <ChangePassword
                    setOpenUpdateModal={setOpenUpdateModal}
                    form={formChangePassword}
                    departmentInfo={departmentInfo}
                />,
        },
    ];

    return (
        <>
            <div style={{ backgroundColor: '#fff', padding: '1rem' }}>
                <Table
                    title={renderHeader}
                    // loading={isLoading}
                    columns={columns}
                    dataSource={dataDepartment}
                // onChange={onChange}
                // pagination={
                //     {
                //         current: current, pageSize: pageSizeNumber, showSizeChanger: true, total: total,
                //         showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} out of {total} rows</div>) }
                //     }
                // }
                />
            </div>
            <AddNewDepartment
                openAddNewModal={openAddNewModal}
                setOpenAddModal={setOpenAddModal}
                listRole={listRole}
                fetchDataDepartment={fetchDataDepartment}
            />

            <ShowDetail
                departmentInfo={departmentInfo}
                openDetailDrawer={openDetailDrawer}
                setOpenDetailDrawer={setOpenDetailDrawer}
            />

            <Modal
                title="Thông tin phòng ban"
                open={openUpdateModal}
                // onOk={setOpenUpdateModal}
                onCancel={() => {
                    setOpenUpdateModal(false)
                    formUpdateInfo.resetFields();
                }}
                confirmLoading={isSubmitUpdateForm}
                width={'50vw'}
                centered={true}
                forceRender={true}
                footer={null}
            >
                <Tabs defaultActiveKey="update_info" items={tabItems} />
            </Modal>

            {/* {showAddNew && <AddNewComponent />} */}
            {/* const AddNewComponent = React.memo(() => {
                Khi sử dụng React.memo, React sẽ tự động kiểm tra các props được truyền 
                vào component và chỉ render lại component khi các props này thay đổi.
                Tuy nhiên, điều này chỉ hữu ích khi component con chứa nội dung phức 
                tạp hoặc có hàm render demanding (nhu cầu render) cao.
            }); */}
        </>
    )
}


export default Department;