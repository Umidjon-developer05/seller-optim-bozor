'use client'
import Logo from '@/components/shared/logo'
import ModeToggle from '@/components/shared/mode-toggle'
import { Button } from '@/components/ui/button'
import { navLinks } from '@/constants'
import Link from 'next/link'
import React from 'react'
import LanguageDropdown from '@/components/shared/language-dropdown'
import useTranslate from '@/hooks/use-translate'

const Navbar = () => {
	const t = useTranslate()

	return (
		<div className='fixed inset-0 z-40 h-20 backdrop-blur-xl '>
			<div className='container mx-auto flex h-full max-w-7xl items-center justify-between border-b'>
				<div className='flex items-center gap-4'>
					<Logo />
					<div className='hidden items-center gap-3 border-l pl-2 md:flex'>
						{navLinks.map(link => (
							<Link
								key={link.route}
								href={link.route}
								className='font-medium transition-all hover:text-blue-500 hover:underline'
							>
								{t(link.name)}
							</Link>
						))}
					</div>
				</div>
				<div className='flex items-center gap-2'>
					<div className='flex items-center gap-2 md:border-r md:pr-3'>
						<div className='hidden md:flex'>
							<LanguageDropdown />
						</div>
						<ModeToggle />
					</div>
					<Link href={'/sign-in'}>
						<Button
							size={'lg'}
							className='hidden md:flex rounded-full'
							variant={'ghost'}
						>
							Log in
						</Button>
					</Link>
					<Link href={'/sign-up'}>
						<Button className='rounded-full' size={'lg'}>
							Sign up
						</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Navbar
