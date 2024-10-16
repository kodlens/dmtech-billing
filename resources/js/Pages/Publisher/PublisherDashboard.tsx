import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PropsWithChildren, ReactNode } from "react";

export default function PublisherDashboard( { auth }: PropsWithChildren<{ auth: any, header?: ReactNode }>) {

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard"/>

            
            <div className="flex min-h-screen justify-center items-center">
                <div className="bg-white p-6 rounded-md mt-[-100px]">
                    
                    <div className="font-bold text-2xl">WELCOME {auth.user.role?.toUpperCase()}</div>
                    <div className="text-xl text-center">{auth.user.lastname?.toUpperCase()} , {auth.user.firstname}</div>

                </div>
            </div>

        </AuthenticatedLayout>
    );
}
