import { Link, Head } from '@inertiajs/react';

export default function ApplicationLogo({className=''}) {
    return (
        <>
            <div className="flex gap-2 `${className}">
                <div className="">
                    <Link href="/">
                        <img src="/img/logo.png" alt="DM Tech" />
                    </Link>
                </div>
            </div>
        </>
    );
}
