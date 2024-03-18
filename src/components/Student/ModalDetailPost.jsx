import React, { useState, useEffect } from 'react';
import {
    Modal, Card, Typography, Avatar
} from 'antd';
const { Meta } = Card;
const { Title, Paragraph, Text, Link } = Typography;
import imgUEF from '../../assets/team_UEF.png';

const ModalDetailPost = (props) => {
    const { isModalOpen, setModalOpen, postInfo } = props;
    return (
        <Modal
            // title="Detail Post"
            open={isModalOpen}
            onCancel={() => setModalOpen(false)}
            footer={false}
            width="60vw"
            centered={true}
            closable={false}
        >
            <Card
                style={{
                    marginTop: 16,
                    // height: 300,
                    maxHeight: 'auto', overflow: 'auto'
                }}
            >
                <Meta
                    avatar={<Avatar size={'large'} src={postInfo.author ? postInfo.author.image : imgUEF} />}
                    title={postInfo.author ? postInfo.author.name : 'Anonymous'}
                    description={
                        <Typography>
                            <Title level={4}>{postInfo.title}</Title>
                            <Paragraph>
                                <div dangerouslySetInnerHTML={{ __html: postInfo.description }}></div>
                            </Paragraph>
                        </Typography>
                    }
                />
            </Card>
        </Modal>
    )
}

const areEqual = (prevProps, nextProps) => {
    return prevProps.isModalOpen === nextProps.isModalOpen
        && prevProps.postInfo === nextProps.postInfo;
}

export default React.memo(ModalDetailPost, areEqual);
