import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader } from '@/components/ui/sidebar'
import Link from 'next/link'
import React from 'react'
import SidebarButton from './SidebarButton'

function AdminSidebar() {
  return (
    <Sidebar>
        <SidebarHeader className={'text-center font-bold text-4xl'}>
            <Link href={'/'} className=''>MyBlog</Link>
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>
                    User Manager
                </SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarButton link={"/admin/ban-user"} title={"Ban/Unban User"}/>
                    <SidebarButton link={"/admin/user-role"} title={"User Role"}/>
                    <SidebarButton link={"/admin/user-permissions"} title={"User Permissions"}/>
                    <SidebarButton link={"/admin/delete-user"} title={"Delete User"}/>
                </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
                <SidebarGroupLabel>
                    Blog Manager
                </SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarButton link={"/admin/delete-blog"} title={"Delete Blog"}/>
                </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
                <SidebarGroupLabel>
                    Role & Permission Manager
                </SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarButton link={"/admin/role"} title={"Create Role"}/>
                    <SidebarButton link={"/admin/role-permissions"} title={"Role Permissions"}/>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    </Sidebar>
  )
}

export default AdminSidebar