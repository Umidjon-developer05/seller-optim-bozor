'use client'

import * as React from 'react'
import { NavMain } from './nav-main'
import { NavUser } from './nav-user'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar'
import { data } from '@/constants'
import Image from 'next/image'

interface SidebarProps extends React.ComponentProps<typeof Sidebar> {
	user: {
		fullName: string
		email: string
	}
}

export function AppSidebar({ ...props }: SidebarProps) {
	return (
		<Sidebar collapsible='icon' {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem className='flex justify-start'>
						<Image
							src='/optim-seller.png'
							alt='Logo'
							width={150}
							height={100}
						/>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={props?.user} />
			</SidebarFooter>
		</Sidebar>
	)
}
