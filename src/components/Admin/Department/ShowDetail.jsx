import { Drawer, Badge, Descriptions, Button, Image, Empty } from 'antd';
import React from 'react';
import moment from 'moment';
import UEFimg from '../../../assets/team_UEF.png';

const ShowDetail = (props) => {
    const { userInfo, openDetailDrawer, setOpenDetailDrawer } = props;
    console.log("check render detail");
    return (
        <Drawer
            title="User Detail"
            placement="right"
            onClose={() => setOpenDetailDrawer(false)}
            open={openDetailDrawer}
            width={'50vw'}
        // column={1}
        >
            {userInfo === null ? <Empty /> :
                <Descriptions bordered>
                    <Descriptions.Item label="Name" span={3}>{userInfo.name}</Descriptions.Item>
                    <Descriptions.Item label="Email" span={3}>{userInfo.email}</Descriptions.Item>
                    <Descriptions.Item label="Description" span={3}>{userInfo.description} </Descriptions.Item>
                    <Descriptions.Item label="Role" span={3} >
                        <Badge status="processing" text={userInfo.roleData.name} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Created At" span={2}>
                        {moment(userInfo.createdAt).format('DD-MM-YY HH:mm:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Updated At">
                        {moment(userInfo.updatedAt).format('DD-MM-YY HH:mm:ss')}
                    </Descriptions.Item>
                    {/* <Divider orientation='left'>Avatar</Divider> */}
                    <Descriptions.Item label="Image" span={3}>
                        <Image
                            width={150}
                            src={`${userInfo.image ? userInfo.image : UEFimg}`}
                        />
                    </Descriptions.Item>
                </Descriptions>
            }
        </Drawer>

    );
};

const areEqual = (prevProps, nextProps) => {
    return prevProps.openDetailDrawer === nextProps.openDetailDrawer
    // && prevProps.userInfo === nextProps.userInfo;
}

export default React.memo(ShowDetail, areEqual);