import Filter from '@/components/shared/filter'
import { Separator } from '@/components/ui/separator'
import AddProduct from '../_components/add-product'
import ProductCard from '../_components/product.card'
import { getCategory, getProducts } from '@/actions/seller.action'
import { SearchParams } from '@/types'
import { FC } from 'react'
import Pagination from '@/components/shared/pagination'
import { SiteHeader } from '../_components/site-header'
import { SidebarInset } from '@/components/ui/sidebar'

interface Props {
	searchParams: SearchParams
}
const Page: FC<Props> = async props => {
	const searchParams = props.searchParams
	const res = await getProducts({
		searchQuery: `${searchParams.q || ''}`,
		filter: `${searchParams.filter || ''}`,
		category: `${searchParams.category || ''}`,
		subcategoryId: `${searchParams.subcategoryId || ''}`,
		page: `${searchParams.page || '1'}`,
	})

	const products = res?.data?.products
	const isNext = res?.data?.isNext || false
	const categories = await getCategory()
	console.log(res?.data?.products, 'categories')

	return (
		<>
			<SidebarInset>
				<SiteHeader title='Products' />
			</SidebarInset>
			<div className='flex justify-between items-center w-full'>
				<h1 className='text-xl font-bold '>Products</h1>
				<AddProduct categories={categories?.categories} />
			</div>

			<Separator className='my-3' />

			<Filter showCategory />

			<div className='grid grid-cols-1 md:grid-cols-3 gap-3 mt-3'>
				{products && products.length === 0 && (
					<p className='text-muted-foreground'>No products found</p>
				)}
				{products &&
					products.map(product => (
						<ProductCard key={product._id} product={product} />
					))}
			</div>

			<Pagination
				isNext={isNext}
				pageNumber={searchParams?.page ? +searchParams.page : 1}
			/>
		</>
	)
}

export default Page
