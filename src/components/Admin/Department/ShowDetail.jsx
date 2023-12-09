import { Drawer, Badge, Descriptions, Button, Image, Empty } from 'antd';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

const ShowDetail = (props) => {
    const { departmentInfo, openDetailDrawer, setOpenDetailDrawer } = props;
    console.log("check render detail");
    return (
        <Drawer
            title="Department Detail"
            placement="right"
            onClose={() => setOpenDetailDrawer(false)}
            open={openDetailDrawer}
            width={'50vw'}
        // column={1}
        >
            {departmentInfo === null ? <Empty /> :
                <Descriptions bordered>
                    <Descriptions.Item label="Name" span={3}>{departmentInfo.name}</Descriptions.Item>
                    <Descriptions.Item label="Email" span={3}>{departmentInfo.email}</Descriptions.Item>
                    <Descriptions.Item label="Description" span={3}>{departmentInfo.description} </Descriptions.Item>
                    <Descriptions.Item label="Role" span={3} >
                        <Badge status="processing" text={departmentInfo.roleNameForDepartment.name} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Created At" span={2}>
                        {moment(departmentInfo.createdAt).format('DD-MM-YY HH:mm:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Updated At">
                        {moment(departmentInfo.updatedAt).format('DD-MM-YY HH:mm:ss')}
                    </Descriptions.Item>
                    {/* <Divider orientation='left'>Avatar</Divider> */}
                    <Descriptions.Item label="Image" span={3}>
                        <Image
                            width={150}
                            src={`${departmentInfo.image}`}
                        />
                    </Descriptions.Item>
                </Descriptions>
            }
        </Drawer>

    );
};

const areEqual = (prevProps, nextProps) => {
    return prevProps.openDetailDrawer === nextProps.openDetailDrawer
    // && prevProps.departmentInfo === nextProps.departmentInfo;
}

export default React.memo(ShowDetail, areEqual);