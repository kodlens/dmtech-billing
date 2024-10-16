import { useState, PropsWithChildren, ReactNode } from 'react';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    CreditCardOutlined,
    HomeOutlined, DeleteOutlined,
    FormOutlined, UserOutlined, LockOutlined
} from '@ant-design/icons';

import { Button, ConfigProvider, Layout, Menu, MenuProps } from 'antd';
import PanelSideBarLogo from '@/Components/PanelSideBarLogo';
  const { Header, Sider, Content } = Layout;


export default function Authenticated(
    { user, children }: PropsWithChildren<{ user: any, header?: ReactNode }>) {

    const { post } = useForm();

    //destruct object permissions
    const { permissions } = usePage<PageProps>().props;

    const [collapsed, setCollapsed] = useState(false);

    const handleLogout = () => {
        post(route('logout'));
    }

    type MenuItem = Required<MenuProps>['items'][number];
    const navigationItems = (paramPermissions:string[]) => {
        //dynamic rendering is disabled for the meantime :(
		const items:MenuItem[] = [];
        items.push({
            key: 'author.dashboard-index',
            icon: <HomeOutlined />,
            label: 'Dashboard',
            onClick: () => router.visit('/author/dashboard')
        },
        {
            key: 'posts.index',
            icon: <FormOutlined />,
            label: 'Posts',
            onClick: ()=> router.visit('/author/posts')
        },
        {
            key: 'posts.publish',
            icon: <CreditCardOutlined />,
            label: 'Published',
            onClick: ()=> router.visit('/author/post-publish')
        },
        {
            key: 'trashes.index',
            icon: <DeleteOutlined />,
            label: 'Trashes',
            onClick: ()=> router.visit('/author/post-trashes')

        },
        {
            type:'divider'
        },
        {
            key: 'my-account.index',
                icon: <UserOutlined />,
            label: 'My Account',
            onClick: ()=> router.visit('/my-account')

        },
        {
            key: 'change-password.index',
                icon: <LockOutlined />,
            label: 'Change Password',
            onClick: ()=> router.visit('/change-password')

        },
    );

		// if (paramPermissions.includes('sections.index')) {
		// 	items.push(
        //     {
        //         key: 'sections.index',
        //         icon: <VideoCameraOutlined />,
        //         label: 'Sections',
        //         onClick: () => router.visit('/panel/sections')

        //     });
		// }

		// if (paramPermissions.includes('author.post-index')) {
		// 	items.push({
        //         type: 'divider',
        //     },
        //     {
        //         key: 'posts.index',
        //         icon: <FormOutlined />,
        //         label: 'Posts',
        //         onClick: ()=> router.visit('/panel/posts')
        //     });
		// }

        // if (paramPermissions.includes('trashes.index')) {
		// 	items.push({
        //         key: 'trashes.index',
        //         icon: <DeleteOutlined />,
        //         label: 'Trashes',
        //         onClick: ()=> router.visit('/panel/trashes')
        //     });
		// }

		return items;
	}


    return (

        <>
            <Layout>
                <Sider trigger={null} collapsible
                    collapsed={collapsed} width={300} style={{ background: "#084c7f" }}>
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
                            items={
                                navigationItems(permissions)
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
                                <Link href=''>{user.lastname} {user.firstname[0]}.</Link>
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
                        <main className='mt-10 mb-10'>{children}</main>
                    </Content>
                </Layout>
            </Layout>
        </>


    );
}
