import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { PageProps } from '@/types'
import { Head } from '@inertiajs/react'
import React from 'react'

export default function AdminDashboard({ auth }: PageProps) {
    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <Head title="Dashboard"/>
                <div className="flex min-h-screen justify-center items-center">
                    <div className="bg-white p-6 rounded-md mt-[-100px]">
                        
                        <div className="font-bold text-2xl">WELCOME {auth.user.role?.toUpperCase()}</div>
                        <div className="text-xl text-center">{auth.user.lastname?.toUpperCase()} , {auth.user.firstname}</div>

                    </div>
                </div>

            </AuthenticatedLayout>

        </>
    )
}
