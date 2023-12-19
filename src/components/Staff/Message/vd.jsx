<Row>
    <Col span={24}>
        <Divider orientation="left">
            <Tag color="#108ee9" style={{ marginRight: 0 }}>Ho Ten SV</Tag> <Divider type="vertical" /> <Tag color="#108ee9">MSSV</Tag>
        </Divider>
        {/* <Button type="primary">Primary Button {props.userID}</Button> */}
    </Col>
    <Col
        span={24}
        id="scrollableDiv"
        style={{
            height: 400,
            overflow: 'auto',
            padding: '10px 16px',
            border: '1px solid rgba(140, 140, 140, 0.35)',
        }}
    >
        <InfiniteScroll
            style={{ marginBottom: '10px' }}
            dataLength={3}
            // next={loadMoreData}
            hasMore={3 < 20}
            scrollableTarget="scrollableDiv"
            initialScrollY={300}
        >
            <Row>
                <Col md={20} push={0} style={{ paddingBottom: '15px' }}>
                    <TextArea
                        disabled
                        // showCount
                        // maxLength={100}
                        // onChange={onChangeQuestion}
                        value={"Câu hỏi của sinh viên?"}
                        className='question'
                        style={{
                            height: 100,
                            resize: 'none',
                            backgroundColor: userID === 1 ? '#daeaffbf' : '#f3d6d6'
                        }}
                    />
                </Col>
                <Col md={20} push={4} style={{ paddingBottom: '15px' }}>
                    <TextArea
                        disabled
                        // showCount
                        // maxLength={100}
                        // onChange={onChangeQuestion}
                        value={"Phản hồi của phòng công tác sinh viên"}
                        className='answer'
                        style={{
                            height: 'auto',
                            resize: 'none',
                            backgroundColor: '#f3d6d6'
                        }}
                    />
                </Col>
                <Col md={20} push={0} style={{ paddingBottom: '15px' }}>
                    <TextArea
                        disabled
                        // showCount
                        // maxLength={100}
                        // onChange={onChangeQuestion}
                        value={"Câu hỏi của sinh viên?"}
                        className='question'
                        style={{
                            height: 100,
                            resize: 'none',
                            backgroundColor: '#daeaffbf'
                        }}
                    />
                </Col>
                <Col md={20} push={4} style={{ paddingBottom: '15px' }}>
                    <TextArea
                        disabled
                        // showCount
                        // maxLength={100}
                        // onChange={onChangeQuestion}
                        value={"Phản hồi của phòng công tác sinh viên"}
                        className='answer'
                        style={{
                            height: 100,
                            resize: 'none',
                            backgroundColor: '#f3d6d6'
                        }}
                    />
                </Col>
                <Col md={20} push={0} style={{ paddingBottom: '15px' }}>
                    <TextArea
                        disabled
                        // showCount
                        // maxLength={100}
                        // onChange={onChangeQuestion}
                        value={"Câu hỏi của sinh viên?"}
                        className='question'
                        style={{
                            height: 100,
                            resize: 'none',
                            backgroundColor: '#daeaffbf'
                        }}
                    />
                </Col>
            </Row>

        </InfiniteScroll>
    </Col>
    <Col span={24}>
        <Row className="staff-container">
            <Col md={24}>
                <Divider orientation="left" plain>
                    Phản hồi:
                </Divider>
            </Col>

            <Col md={24} className='answer-section'>
                <Form
                    // name="basic"
                    style={{ maxWidth: "100%", margin: '0 auto' }}
                    onFinish={onFinish}
                    form={form}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                //https://stackoverflow.com/questions/61244343/defaultvalue-of-input-not-working-correctly-on-ant-design
                >
                    <Form.Item
                        name="question"
                    // label="Name"
                    // style={{ width: '30%' }}
                    >
                        <TextArea
                            showCount
                            // maxLength={100}
                            // onChange={onChangeQuestion}
                            placeholder="Nhập câu trả lời!"
                            style={{
                                height: 100,
                                resize: 'none',
                            }}

                        />
                    </Form.Item>
                    <div style={{ display: 'flex', paddingTop: '10px', justifyContent: 'end', gap: 20 }}>
                        <Button type="primary" danger >Cancel {props.userID}</Button>
                        <Button type="primary" htmlType="submit" >
                            Submit
                        </Button>
                    </div>
                </Form>
            </Col>
        </Row>
    </Col>
</Row>