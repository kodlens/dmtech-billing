import { PageProps } from "@/types";
import PublisherLayout from "@/Layouts/PublisherLayout";
import { Head } from "@inertiajs/react";

import ChangePassword from "../Auth/ChangePassword";

export default function PublisherChangePassword( {auth} : PageProps ) {

    return (

        <PublisherLayout user={auth.user}>
            <Head title="Change Password"></Head>
            <Head title="My Account"></Head>
            <ChangePassword></ChangePassword>
        </PublisherLayout>
    )
}
