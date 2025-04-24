"use client";

import {useParams} from 'next/navigation';
import {useEffect, useState} from "react";
import {read} from "@/lib/read";

export default function RedirectPage() {
    const urlRoute = useParams().urlPath;
    // localhost.../example => example
    // localhost.../example/com => [example, com] => example/com
    let urlPath;
    if (Array.isArray(urlRoute)) {
        urlPath = urlRoute.join('/');
    } else {
        urlPath = urlRoute;
    }
    // const url =  Url.findOne({ urlPath });

    const [orginalUrl, setOrginalUrl] = useState<string | null | undefined>(null);
    useEffect(() => {
        if (urlPath === undefined) return;
        read(urlPath).then(setOrginalUrl);

    }, [urlPath]);
    return orginalUrl === undefined ? <h1>404 - Not Found</h1> : orginalUrl === null ?
        <h1>Loading...</h1> : window.location.replace(orginalUrl);

}