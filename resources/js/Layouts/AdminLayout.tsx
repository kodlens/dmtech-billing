import { useState, PropsWithChildren } from 'react';
import { Link, router, useForm } from '@inertiajs/react';

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    FilePptOutlined,
    UserOutlined,ProfileOutlined,
    FormOutlined,
    BarsOutlined, FileJpgOutlined,
    DashOutlined,
    DashboardOutlined
  } from '@ant-design/icons';

import { Button, ConfigProvider, Layout, Menu, MenuProps } from 'antd';
import PanelSideBarLogo from '@/Components/PanelSideBarLogo';
  const { Header, Sider, Content } = Layout;

const siderStyle: React.CSSProperties = {

    background: "#084c7f",

};

export default function AdminLayout(
    { user, children }: PropsWithChildren<{ user: any}>) {
     
    const { post } = useForm();

    const [collapsed, setCollapsed] = useState(false);

    const handleLogout = () => {
        post(route('logout'));
    }

    type MenuItem = Required<MenuProps>['items'][number];

    const navigationItems = () => {

		const items:MenuItem[] = [];

		items.push({
			key: 'admin.dashboard.index',
            icon: <DashboardOutlined />,
            label: 'Dashboard',
            onClick: () => router.visit('/admin/dashboard')
		},
        
       
        {
            key: 'billings',
            icon: <FilePptOutlined />,
            label: 'Billing',
            // onClick: () => router.visit('/admin/pages')
            children: [
                {
                    key: 'admin.billings.index',
                    label: 'Billing',
                    onClick: () => router.visit('/admin/billings/billings')
                },
                
                {
                    key: 'admin.billing-payment.index',
                    label: 'Billing Payment' ,
                    onClick: ()=> router.visit('/admin/billings/billing-payments'),
                },
            ],
        },
        {
            type: 'divider',
        },
         
        {
            key: 'admin.consumers.index',
            icon: <FilePptOutlined />,
            label: 'Consumers',
            onClick: () => router.visit('/admin/consumers')
        },
        {
            type: 'divider',
        },
        
        {
            type: 'divider'
        },
        {
            key: 'admin.users.index',
            icon: <FileJpgOutlined />,
            label: 'Users',
            onClick: ()=> router.visit('/admin/users')
        });

		

		return items;
	}


    return (

        <>
            <Layout>
                <Sider trigger={null} style={siderStyle} collapsible
                    collapsed={collapsed} width={300}>
                    <PanelSideBarLogo />
                    <ConfigProvider theme={{
                        token: {
                            colorText: 'white'
                        }
                    }}>
                        <Menu
                            mode="inline"
                            style={{ background: "#084c7f",
                                color: 'white',
                            }}
                            defaultSelectedKeys={[`${route().current()}`]}
                            defaultOpenKeys={['posts']}
                            items={
                                navigationItems()
                            }
                        />

                    </ConfigProvider>
                </Sider>
                <Layout>
                    <Header
                        style={{ padding: 0, background: 'white' }}
                    >
                        <div className='flex items-center'>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }}
                            />


                            <div className='ml-auto mr-4 flex items-center gap-4'>
                                <Link href=''>{user.lname} {user.fname[0]}.</Link>
                                <Button className='' onClick={handleLogout}>Logout</Button>
                            </div>

                        </div>
                    </Header>
                    <Content
                        style={{
                            margin: 0,
                            padding: 0,
                            minHeight: '100vh',
                            background: "#dce6ec",
                            borderRadius: 0,
                        }}
                    >
                        <main className='mb-10'>{children}</main>
                    </Content>
                </Layout>
            </Layout>
        </>


    );
}
