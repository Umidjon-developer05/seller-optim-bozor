import { getOrders } from '@/actions/seller.action'
import Filter from '@/components/shared/filter'
import Pagination from '@/components/shared/pagination'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { SidebarInset } from '@/components/ui/sidebar'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { formatPrice } from '@/lib/utils'
import { SearchParams } from '@/types'
import { format } from 'date-fns'
import React, { FC } from 'react'
import { SiteHeader } from '../_components/site-header'
import Image from 'next/image'

interface Props {
	searchParams: SearchParams
}

const Page: FC<Props> = async props => {
	const searchParams = props.searchParams
	const res = await getOrders({
		searchQuery: `${searchParams.q || ''}`,
		filter: `${searchParams.filter || ''}`,
		page: `${searchParams.page || '1'}`,
	})

	const orders = res?.data?.orders
	const isNext = res?.data?.isNext || false
	return (
		<>
			<SidebarInset>
				<SiteHeader title='Orders' />
			</SidebarInset>
			<div className='flex justify-between items-center w-full'>
				<h1 className='text-xl font-bold'>Orders</h1>
				<Filter />
			</div>

			<Separator className='my-3' />

			<Table className='text-sm'>
				{orders && orders.length > 0 && (
					<TableCaption>A list of your recent orders.</TableCaption>
				)}
				<TableHeader>
					<TableRow>
						<TableHead>Image</TableHead>
						<TableHead>Product</TableHead>
						<TableHead>Category</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Price</TableHead>
						<TableHead>Order time</TableHead>
						<TableHead>Phone</TableHead>
						<TableHead>Location</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{orders && orders.length === 0 && (
						<TableRow>
							<TableCell colSpan={5} className='text-center'>
								No orders found.
							</TableCell>
						</TableRow>
					)}
					{orders &&
						orders.map(order => (
							<TableRow key={order._id}>
								<TableCell>
									<Image
										src={order.product.image}
										alt={order.product.title}
										className='w-20 h-20 rounded-md'
										width={20}
										height={20}
									/>
								</TableCell>
								<TableCell>{order.product.title}</TableCell>
								<TableCell>
									<Badge color='outline ' className='text-white'>
										{order.product.category?.name}
									</Badge>
								</TableCell>
								<TableCell>
									<Badge className='text-white'>{order.status}</Badge>
								</TableCell>
								<TableCell>{formatPrice(order.product.price)}</TableCell>
								<TableCell>
									{format(new Date(order.createdAt), 'dd-MMM yyyy HH:mm')}
								</TableCell>
								<TableCell>
									<a
										href={`tel:${order.user?.phone}`}
										className='text-blue-500 underline'
									>
										{order.user?.phone}
									</a>
								</TableCell>

								<TableCell>
									{order?.latitude && order?.longitude ? (
										<a
											href={`https://www.google.com/maps?q=${order?.latitude},${order?.longitude}`}
											target='_blank'
											rel='noopener noreferrer'
										>
											<button className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600'>
												Location
											</button>
										</a>
									) : (
										<span className='text-gray-400'>No location</span>
									)}
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>

			<Pagination
				isNext={isNext}
				pageNumber={searchParams?.page ? +searchParams.page : 1}
			/>
		</>
	)
}

export default Page
