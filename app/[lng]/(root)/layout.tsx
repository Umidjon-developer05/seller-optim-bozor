import { ChildProps } from '@/types'
import React from 'react'
import Navbar from './_components/navbar'
import getUser from '@/lib/getUser'
import { redirect } from 'next/navigation'

async function layout({ children }: ChildProps) {
	const session = await getUser()
	if (session) {
		redirect('/seller/dashboard')
	}
	return (
		<div>
			<Navbar />
			<main>{children}</main>
		</div>
	)
}

export default layout
