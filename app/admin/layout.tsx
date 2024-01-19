import React from "react";
import AdminNav from "../components/admin/AdminNav";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "../components/NullData";



export const metadata = {
    title : 'Matrick-Shop Admin',
    description: 'Matrick-SHop Admin Dashboard'
}


const AdminLayout = async ({children}: {children : React.ReactNode}) => {


    const currentUser = await getCurrentUser()

    if (currentUser?.role !== "ADMIN") {
        return <NullData title="Access Denied"/>
    }

    return (
        <div className="">
            <AdminNav/>
            {children}
        </div>
    )
}

export default AdminLayout;