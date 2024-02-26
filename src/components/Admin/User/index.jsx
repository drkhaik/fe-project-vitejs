import React, { useEffect, useState } from 'react';
import { Button, Table, Popconfirm, Tabs, Modal, Form, message } from 'antd';
import { ReloadOutlined, UserAddOutlined, EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import moment from 'moment';
import { fetchAllUserAPI, fetchAllRole, deleteUser } from '../../../services/api';
// import AddNew from './AddNew';
// import ShowDetail from './ShowDetail';
// import UpdateInfoDepartment from './UpdateInfo';
// import ChangePassword from './ChangePassword';
import LoadingComponent from '../../Loading/loadingComponent';
const AddNew = React.lazy(() => import('./AddNew'));
const ShowDetail = React.lazy(() => import('./ShowDetail'));
const UpdateInfoDepartment = React.lazy(() => import('./UpdateInfo'));
const ChangePassword = React.lazy(() => import('./ChangePassword'));


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
                    return { label: item.name, value: item._id }
                })
                setListRole(d);
            }
        }
        getAllRole();

    }, []);

    const onClickDeleteDepartment = async (_id) => {
        const res = await deleteUser(_id);
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
            dataIndex: 'roleID',
            render: (text, record, index) => {
                return (
                    <>
                        {record.roleID.name}
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
                            description="Are you sure to delete?"
                            onConfirm={() => onClickDeleteDepartment(record._id)}
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
                <Suspense fallback={<LoadingComponent />}>
                    <UpdateInfoDepartment
                        openUpdateModal={openUpdateModal}
                        setOpenUpdateModal={setOpenUpdateModal}
                        form={formUpdateInfo}
                        listRole={listRole}
                        userInfo={userInfo}
                        fetchDataUser={fetchDataUser}
                    />
                </Suspense>
            ,
        },
        {
            key: 'change_password',
            label: `Đổi mật khẩu`,
            children:
                <Suspense fallback={<LoadingComponent />}>
                    <ChangePassword
                        setOpenUpdateModal={setOpenUpdateModal}
                        form={formChangePassword}
                        userInfo={userInfo}
                    />
                </Suspense>,
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

            <Suspense fallback={<LoadingComponent />}>
                <AddNew
                    openAddNewModal={openAddNewModal}
                    setOpenAddModal={setOpenAddModal}
                    listRole={listRole}
                    fetchDataUser={fetchDataUser}
                />
            </Suspense>

            <Suspense fallback={<LoadingComponent />}>
                <ShowDetail
                    userInfo={userInfo}
                    openDetailDrawer={openDetailDrawer}
                    setOpenDetailDrawer={setOpenDetailDrawer}
                />
            </Suspense>

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