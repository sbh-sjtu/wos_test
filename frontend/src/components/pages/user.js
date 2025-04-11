import React, { useState, useEffect } from 'react';
import { Layout, Card, Avatar, Descriptions, Spin, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Header from '../header';
import Footer from '../footer';
import axios from 'axios';
import '../../styles/disciplinaryAnalysis.css'; // 共用样式

const { Content } = Layout;

function User() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);

    // 模拟从后端拉取用户数据
    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                // 示例接口
                const response = await axios.get('http://localhost:8888/main2022/userInfo');
                if (response.status === 200) {
                    setUserData(response.data);
                } else {
                    message.error('获取用户信息失败');
                }
            } catch (error) {
                console.error('获取用户信息出错:', error);
                message.error('请求失败，请稍后重试');
            }
            setLoading(false);
        };

        fetchUserData();
    }, []);

    return (
        <Layout className='disciplinary-layout'>
            <Layout.Header
                style={{
                    padding: 0,
                    backgroundColor: 'white',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    zIndex: 10,
                    position: 'sticky',
                    top: 0
                }}
            >
                <Header />
            </Layout.Header>

            <Content>
                <div className="discipline-hero-section" style={{ backgroundColor: '#b82e28', paddingTop: '40px', paddingBottom: '80px' }}>
                    <div className="container">
                        <div className="discipline-analysis-container">
                            <div className="search-title">
                                <h1>用户中心</h1>
                                <p>查看并管理您的个人信息</p>
                            </div>

                            <Spin spinning={loading}>
                                {userData ? (
                                    <Card style={{ maxWidth: 600, margin: '0 auto' }}>
                                        <Card.Meta
                                            avatar={<Avatar size={64} icon={<UserOutlined />} />}
                                            title={userData.name || '用户名'}
                                            description={userData.role || '用户角色'}
                                        />
                                        <Descriptions bordered column={1} style={{ marginTop: 24 }}>
                                            <Descriptions.Item label="用户名">{userData.username}</Descriptions.Item>
                                            <Descriptions.Item label="邮箱">{userData.email}</Descriptions.Item>
                                            <Descriptions.Item label="学院/部门">{userData.department}</Descriptions.Item>
                                            <Descriptions.Item label="身份">{userData.role}</Descriptions.Item>
                                        </Descriptions>
                                    </Card>
                                ) : (
                                    !loading && <p style={{ textAlign: 'center' }}>暂无用户数据</p>
                                )}
                            </Spin>
                        </div>
                    </div>
                </div>
            </Content>

            <Layout.Footer
                style={{
                    padding: 0,
                    backgroundColor: '#b82e28',
                }}
            >
                <Footer />
            </Layout.Footer>
        </Layout>
    );
}

export default User;
