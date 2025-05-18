'use client'

import { deleteProduct } from '@/actions/seller.action'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import useAction from '@/hooks/use-action'
import { useProduct } from '@/hooks/use-product'
import { toast } from '@/hooks/use-toast'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'
import { FC } from 'react'
import NoSSR from '@/components/shared/NoSSR'
import { IProduct1 } from '@/types'
import { Trash2 } from 'lucide-react'
import CustomImage from '@/components/shared/custom-image'
interface Props {
	product: IProduct1
}
const ProductCard: FC<Props> = ({ product }) => {
	const { setOpen, setProduct } = useProduct()
	const { isLoading, onError, setIsLoading } = useAction()
	const onEdit = () => {
		setOpen(true)
		setProduct(product)
	}

	async function onDelete() {
		setIsLoading(true)
		const res = await deleteProduct({ id: product._id })
		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError('Something went wrong')
		}
		if (res.data.failure) {
			return onError(res.data.failure)
		}
		if (res.data.status === 200) {
			toast({ description: 'Product deleted successfully' })
			setIsLoading(false)
		}
	}
	const subcategories = product.category?.subcategories.find(
		item => item._id === product.subcategoryId
	)
	return (
		<div
			className={
				'border relative flex justify-between flex-col max-w-[400px] rounded-md'
			}
		>
			<div className='bg-secondary relative'>
				<div className='relative h-60 '>
					<CustomImage
						src={product.image!}
						className='mx-auto object-contain'
						alt={product.title!}
					/>
				</div>
				<Badge className='absolute top-0 left-0 text-white'>
					{product.category?.name}
					{subcategories && (
						<span className='text-xs text-muted-foreground text-white mx-2'>
							{subcategories.name}
						</span>
					)}
				</Badge>
			</div>

			<div className='p-2'>
				<div className='flex justify-between items-center text-sm'>
					<h1 className='font-bold'>
						{product.title.slice(0, 30).concat('...')}
					</h1>
					<NoSSR>
						<p className='font-medium'>{formatPrice(product.price!)}</p>
					</NoSSR>
				</div>
				<p className='text-xs text-muted-foreground leading-1 line-clamp-5'>
					{product.description.slice(0, 30)}..
				</p>
				<Separator className='my-2' />
			</div>

			<div className='grid grid-cols-2 gap-2 px-2 pb-2'>
				<Button variant={'secondary'} onClick={onEdit}>
					Edit
				</Button>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button variant={'outline'}>Delete</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>
								Siz ushbu mahsulotni o&#39;chirishni xohlaysiz?
							</AlertDialogTitle>
							<AlertDialogDescription>
								Siz ushbu mahsulotni o&#39;chirishni xohlaysizmi? Ushbu
								harakatni bekor qilish
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
							<AlertDialogAction
								className='flex bg-red-600 text-white'
								onClick={onDelete}
								disabled={isLoading}
							>
								<Trash2 />
								<p>Delete</p>
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</div>
	)
}

export default ProductCard
