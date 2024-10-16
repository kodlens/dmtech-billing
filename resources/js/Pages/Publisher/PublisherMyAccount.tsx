import { PageProps } from "@/types";
import PublisherLayout from "@/Layouts/PublisherLayout";
import { Head } from "@inertiajs/react";
import MyAccount from "../Auth/MyAccount";

export default function PublisherMyAccount( {auth} : PageProps ) {

    return (

        <PublisherLayout user={auth.user}>
            <Head title="My Account"></Head>
            <MyAccount auth={auth} categories={[]} permissions={[]} statuses={[]}></MyAccount>
        </PublisherLayout>
    )
}
