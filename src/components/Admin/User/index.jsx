import React, { useEffect, useState } from 'react';
import { Button, Table, Popconfirm, Tabs, Modal, Form, message } from 'antd';
import { ReloadOutlined, UserAddOutlined, EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import moment from 'moment';
import { fetchAllUserAPI, fetchAllRole, deleteUser } from '../../../services/api';
import AddNew from './AddNew';
import ShowDetail from './ShowDetail';
import UpdateInfoDepartment from './UpdateInfo';
import ChangePassword from './ChangePassword';

const User = () => {
    const [dataUsers, setAllDataUser] = useState([]);
    const [listRole, setListRole] = useState([]);

    const [openAddNewModal, setOpenAddModal] = useState(false);
    const [openDetailDrawer, setOpenDetailDrawer] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    const [formUpdateInfo] = Form.useForm();
    const [formChangePassword] = Form.useForm();

    const fetchDataUser = async () => {
        let res = await fetchAllUserAPI();
        if (res && res.errCode === 0 && res.data) {
            let data = res.data;
            let dataUsers = []
            for (let index = 0; index < data.length; index++) {
                const item = data[index];
                const newItem = {
                    ...item,
                    key: index + 1,
                };
                dataUsers.push(newItem);
            }
            setAllDataUser(dataUsers);
        }
    }

    useEffect(() => {
        fetchDataUser();
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
        const res = await deleteUser(id);
        if (res && res.errCode === 0) {
            message.success("Success!");
            fetchDataUser();
        } else {
            message.error("Oops...something went wrong...");
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
                            setUserInfo(record);
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
            dataIndex: 'roleData',
            render: (text, record, index) => {
                return (
                    <>
                        {record.roleData.name}
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
                                setUserInfo(record)
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
                <span>Table List User</span>
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
                    listRole={listRole}
                    userInfo={userInfo}
                    fetchDataUser={fetchDataUser}
                />,
        },
        {
            key: 'change_password',
            label: `Đổi mật khẩu`,
            children:
                <ChangePassword
                    setOpenUpdateModal={setOpenUpdateModal}
                    form={formChangePassword}
                    userInfo={userInfo}
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
                    dataSource={dataUsers}
                // onChange={onChange}
                // pagination={
                //     {
                //         current: current, pageSize: pageSizeNumber, showSizeChanger: true, total: total,
                //         showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} out of {total} rows</div>) }
                //     }
                // }
                />
            </div>
            <AddNew
                openAddNewModal={openAddNewModal}
                setOpenAddModal={setOpenAddModal}
                listRole={listRole}
                fetchDataUser={fetchDataUser}
            />

            <ShowDetail
                userInfo={userInfo}
                openDetailDrawer={openDetailDrawer}
                setOpenDetailDrawer={setOpenDetailDrawer}
            />

            <Modal
                title="Cập nhật thông tin"
                open={openUpdateModal}
                // onOk={setOpenUpdateModal}
                onCancel={() => {
                    setOpenUpdateModal(false)
                    formUpdateInfo.resetFields();
                }}
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


export default User;