import React from "react";
import AdminNav from "../components/admin/AdminNav";



export const metadata = {
    title : 'Matrick-Shop Admin',
    description: 'Matrick-SHop Admin Dashboard'
}


const AdminLayout = ({children}: {children : React.ReactNode}) => {
    return (
        <div className="">
            <AdminNav/>
            {children}
        </div>
    )
}

export default AdminLayout;