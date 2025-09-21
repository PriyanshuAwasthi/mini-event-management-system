"use client";
import { useEffect, useState } from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function AppSidebar() {
    const [data, setData] = useState<GetEventListResponseDto | null>(null);
    
    useEffect(() => {
        fetch('http://localhost:8000/api/events')
        .then(res => res.json())
        .then((resp: GetEventListResponseDto) => setData(resp))
    }, []);

    return (
        <Sidebar>
        <SidebarHeader />
        <SidebarContent>
            <SidebarGroup />
                <SidebarGroupContent>
                    <SidebarMenu>
                        {
                            data?.events.map((item) => (
                               <SidebarMenuItem key={item.uuid}>
                                    <SidebarMenuButton asChild>
                                        {/* <a href={item.url}> */}
                                        <span>{item.name}</span>
                                        {/* </a> */}
                                    </SidebarMenuButton>
                               </SidebarMenuItem> 
                            ))
                        }
                    </SidebarMenu>
                </SidebarGroupContent>
            <SidebarGroup />
        </SidebarContent>
        <SidebarFooter />
        </Sidebar>
    )
}

type Event = {
  uuid: string;
  name: string;
  location: string;
  start_time: string;
  end_time: string;
  max_capacity: number;
};

type GetEventListResponseDto = {
  code: string;
  events: Event[];
};