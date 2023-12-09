import React, { useEffect, useState } from 'react';
import { Button, Table, Popconfirm, message, Space, notification } from 'antd';
import moment from 'moment';

const History = () => {
    const [isLoading, setIsLoading] = useState(false);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'mainText',
            render: (text, record, index) => {
                return (
                    <>
                        <a href='#' onClick={() => {
                            setOpenDetailBook(true);
                            setBookInfo(record);
                        }}>
                            {record.mainText}
                        </a>
                    </>
                )
            }

        },
        {
            title: 'Category',
            dataIndex: 'category',
        },
        {
            title: 'Author',
            dataIndex: 'author',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            // defaultSortOrder: 'descend',
            sorter: true,

        },
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
                                setBookInfo(record)
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
    return (
        <>
            <div style={{ backgroundColor: '#fff', padding: '1rem' }}>

                <p>History</p>
                <Table
                    // title={"History"}
                    loading={isLoading}
                    columns={columns}
                // dataSource={allDataBooks}
                // onChange={onChange}
                // pagination={
                //     {
                //         current: current, pageSize: pageSizeNumber, showSizeChanger: true, total: total,
                //         showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} out of {total} rows</div>) }
                //     }
                // }
                />
            </div>

        </>
    )
}


export default History;