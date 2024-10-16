import {  PropsWithChildren, ReactNode } from 'react';

import {  Layout } from 'antd';
import AdminLayout from './AdminLayout';;

export default function AuthenticatedLayout(
    { user, header, children }: PropsWithChildren<{ user: any, header?: ReactNode}>) {
        
    return (
        
        
        <>
            <Layout>
                {user.role.toLowerCase() === 'administrator' && (
                    <AdminLayout user={user} children={children}></AdminLayout>
                )}
            </Layout>
        </>


    );
}
