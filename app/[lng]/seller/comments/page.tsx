import { SidebarInset } from '@/components/ui/sidebar'
import React from 'react'
import { SiteHeader } from '../_components/site-header'

function Comment() {
	return (
		<div className='w-full'>
			<SidebarInset>
				<SiteHeader title='Comments' />
			</SidebarInset>
		</div>
	)
}

export default Comment
