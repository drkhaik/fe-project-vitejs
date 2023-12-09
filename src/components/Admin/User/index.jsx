import React, { useEffect, useState } from 'react';
import { Button, Table, Popconfirm } from 'antd';
import moment from 'moment';
import { fetchAllUserAPI, fetchAllRole } from '../../../services/api';
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import UpdateUser from './UpdateUser';

const TableUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [allUser, setDataAllUser] = useState([]);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [userInfo, setUserInfo] = useState("");
    const [listRole, setListRole] = useState([]);

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
    }, [])

    const columns = [
        {
            title: 'Fullname',
            dataIndex: 'fullName',
            // render: (text, record, index) => {
            //     return (
            //         <>
            //             <a href='#' onClick={() => {
            //                 setOpenDetailBook(true);
            //                 setUserInfo(record);
            //             }}>
            //                 {record.mainText}
            //             </a>
            //         </>
            //     )
            // }

        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        // {
        //     title: 'RoleID',
        //     dataIndex: 'roleId',
        //     render: (text, record, index) => {
        //         console.log("check record", record);
        //         return (

        //             <>
        //                 {/* <a href='#' onClick={() => {
        //                     setOpenDetailBook(true);
        //                     setUserInfo(record);
        //                 }}>
        //                     {record.mainText}
        //                 </a> */}
        //             </>
        //         )
        //     }
        // },
        {
            title: 'Updated At',
            dataIndex: 'updatedAt',
            defaultSortOrder: 'descend',
            sorter: true,
            render: (text, record, index) => {
                return (
                    <>
                        {moment(record.updatedAt).format('DD-MM-YY HH:mm:ss')}
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
                                setUserInfo(record)
                                setOpenModalUpdate(true)
                            }}
                        />
                        <Popconfirm
                            placement="topLeft"
                            title="Are you sure to delete this book?"
                            description="Delete the book"
                            onConfirm={() => onClickDeleteBook(record._id)}
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

    useEffect(() => {
        fetchAllUser();
    }, [])

    const fetchAllUser = async () => {
        const res = await fetchAllUserAPI();
        if (res && res.data) {
            let data = res.data;
            let dataBooks = [];
            // https://stackoverflow.com/questions/51703111/each-record-in-table-should-have-a-unique-key-prop-or-set-rowkey-to-an-uniqu
            for (let index = 0; index < data.length; index++) {
                const item = data[index];
                const newItem = {
                    ...item,
                    key: index + 1,
                };
                dataBooks.push(newItem);
            }
            setDataAllUser(dataBooks);
            setIsLoading(false);
        }
    }

    return (
        <>
            <div style={{ backgroundColor: '#fff', padding: '1rem' }}>
                <p>TableUser</p>
                <Table
                    // title={"TableUser"}
                    loading={isLoading}
                    columns={columns}
                    dataSource={allUser}
                // onChange={onChange}
                // pagination={
                //     {
                //         current: current, pageSize: pageSizeNumber, showSizeChanger: true, total: total,
                //         showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} out of {total} rows</div>) }
                //     }
                // }
                />
            </div>

            <UpdateUser
                openModalUpdate={openModalUpdate}
                setOpenModalUpdate={setOpenModalUpdate}
                userInfo={userInfo}
                listRole={listRole}
                fetchAllUser={fetchAllUser}
            />

        </>
    )
}


export default TableUser;