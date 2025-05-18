'use client'
import React from 'react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { Languages } from 'lucide-react'
import Image from 'next/image'
import { lngs } from '@/constants'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useParams } from 'next/navigation'

function LanguageDropdown() {
	const { lng } = useParams()
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' size={'icon'}>
					<Languages />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				<DropdownMenuGroup>
					{lngs.map(item => (
						<Link key={item.route} href={`/${item.route}`}>
							<DropdownMenuItem
								key={item.route}
								className={cn(
									'cursor-pointer',
									item.route === lng && 'bg-secondary'
								)}
							>
								<Image
									src={`/assets/locales/${item.route}.png`}
									alt={item.label}
									width={20}
									height={20}
								/>
								<span className='font-space-grotesk ml-2 font-medium'>
									{item.label}
								</span>
							</DropdownMenuItem>
						</Link>
					))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default LanguageDropdown
