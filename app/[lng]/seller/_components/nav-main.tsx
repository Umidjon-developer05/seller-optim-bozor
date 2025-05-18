'use client'

import { MailIcon, PlusCircleIcon, type LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function NavMain({
	items,
}: {
	items: {
		title: string
		url: string
		icon?: LucideIcon
	}[]
}) {
	const pathname = usePathname()

	return (
		<SidebarGroup>
			<SidebarGroupContent className='flex flex-col gap-2'>
				<SidebarMenu>
					{items.map(item => {
						const isActive = pathname.includes(`/seller/${item.url}`)
						return (
							<Link href={`/seller/${item.url}`} key={item.title}>
								<SidebarMenuItem
									className={`group relative p-2 pl-0 overflow-hidden rounded-lg transition-all duration-300 ${
										isActive
											? 'bg-sidebar-accent/20 text-sidebar-accent-foreground'
											: ''
									}`}
								>
									{/* Blue glowing border effect */}
									<span
										className={`absolute right-0 top-0 h-full w-0.5 bg-blue-500 ${
											isActive ? 'animate-glow-pulse opacity-100' : 'opacity-0'
										}`}
									></span>

									{/* Background glow effect */}
									<span
										className={`absolute right-0 top-0 h-full w-full rounded-lg transition-all duration-500 ease-in-out ${
											isActive
												? 'bg-gradient-to-r from-blue-500/10 to-transparent animate-wave-effect'
												: 'opacity-0'
										}`}
									></span>

									<SidebarMenuButton
										tooltip={item.title}
										className={`relative z-10 flex items-center gap-2 transition-all duration-300 ${
											isActive
												? 'text-blue-600 dark:text-blue-400 font-medium'
												: ''
										}`}
									>
										{item.icon && (
											<item.icon
												className={
													isActive ? 'text-blue-500 animate-subtle-bounce' : ''
												}
											/>
										)}
										<span>{item.title}</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							</Link>
						)
					})}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	)
}
