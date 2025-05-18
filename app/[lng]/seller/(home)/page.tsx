import React from 'react'
import { SectionCards } from '../_components/section-cards'
import { ChartAreaInteractive } from '../_components/chart-area-interactive'
import { DataTable } from '../_components/data-table'
import { SiteHeader } from '../_components/site-header'
import data from './data.json'
import { SidebarInset } from '@/components/ui/sidebar'
function HomePage() {
	return (
		<div className='w-full'>
			<SidebarInset>
				<SiteHeader />
			</SidebarInset>
			<div className='flex flex-1 flex-col'>
				<div className='@container/main flex flex-1 flex-col gap-2'>
					<div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
						<SectionCards />
						<div className='px-4 lg:px-6'>
							<ChartAreaInteractive />
						</div>
						<DataTable data={data} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default HomePage
