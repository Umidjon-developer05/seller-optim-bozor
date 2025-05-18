'use client'

import {
	createProduct,
	deleteFile,
	updateProduct,
} from '@/actions/seller.action'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import useAction from '@/hooks/use-action'
import { useProduct } from '@/hooks/use-product'
import { toast } from '@/hooks/use-toast'
import { UploadDropzone } from '@/lib/uploadthing'
import { formatPrice } from '@/lib/utils'
import { productSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader, PlusCircle, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// Define the category and subcategory types
interface Category {
	_id: string
	name: string
	image: string
	slug: string
	subcategories: [{ _id: string; name: string; slug: string }]
	__v: number
}

interface Subcategory {
	name: string
	slug: string
	_id: string
}

const AddProduct = ({ categories }: { categories: Category[] }) => {
	const { isLoading, onError, setIsLoading } = useAction()
	const { open, setOpen, product, setProduct } = useProduct()
	const [selectedCategory, setSelectedCategory] = useState<string>('')
	const [subcategories, setSubcategories] = useState<Subcategory[]>([])

	const form = useForm<z.infer<typeof productSchema>>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			title: '',
			description: '',
			category: '',
			subcategoryId: '',
			price: '',
			image: '',
			imageKey: '',
		},
	})

	// Update subcategories when category changes
	useEffect(() => {
		if (selectedCategory) {
			const category = categories.find(cat => cat._id === selectedCategory)
			if (category && category.subcategories) {
				setSubcategories(category.subcategories)
				// Reset subcategory when category changes
				if (!product?._id) {
					form.setValue('subcategoryId', '')
				}
			}
		} else {
			setSubcategories([])
		}
	}, [selectedCategory, categories, form, product])

	async function onSubmit(values: z.infer<typeof productSchema>) {
		if (!form.watch('image'))
			return toast({
				description: 'Please upload an image',
				variant: 'destructive',
			})
		setIsLoading(true)
		let res
		if (product?._id) {
			res = await updateProduct({ ...values, id: product._id })
		} else {
			res = await createProduct(values)
		}
		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError('Something went wrong')
		}
		if (res.data.failure) {
			return onError(res.data.failure)
		}
		if (res.data.status === 201) {
			toast({ description: 'Product created successfully' })
			setOpen(false)
			form.reset()
			setIsLoading(false)
		}
		if (res.data.status === 200) {
			toast({ description: 'Product updated successfully' })
			setOpen(false)
			form.reset()
			setIsLoading(false)
		}
	}

	function onOpen() {
		setOpen(true)
		setProduct({
			_id: '',
			title: '',
			description: '',
			category: {
				_id: '',
				name: '',
				subcategories: [{ _id: '', name: '', slug: '' }],
			},
			subcategoryId: '',
			price: 0,
			image: '',
			imageKey: '',
		})
		setSelectedCategory('')
		setSubcategories([])
	}

	function onDeleteImage() {
		deleteFile(form.getValues('imageKey'))
		form.setValue('image', '')
		form.setValue('imageKey', '')
	}

	useEffect(() => {
		if (product) {
			form.reset({
				...product,
				price: product.price.toString(),
				subcategoryId: product.subcategoryId || '',
				category: product.category._id, // extract the _id property
			})

			if (product.category) {
				setSelectedCategory(product.category._id) // also update the selectedCategory state
			}
		}
	}, [product, form])

	return (
		<>
			<Button size={'sm'} onClick={onOpen}>
				<span className='text-white'>Mahsulot Qo&apos;shish</span>
				<PlusCircle className='text-white' />
			</Button>
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Manage your product</SheetTitle>
						<SheetDescription>
							Field marked with * are required fields and must be filled.
						</SheetDescription>
					</SheetHeader>
					<Separator className='my-3' />
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
							<FormField
								control={form.control}
								name='title'
								render={({ field }) => (
									<FormItem className='space-y-0'>
										<Label className='text-xs'>Title</Label>
										<FormControl>
											<Input
												placeholder='Adidas shoes'
												className='bg-secondary'
												disabled={isLoading}
												{...field}
											/>
										</FormControl>
										<FormMessage className='text-xs text-red-500' />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='description'
								render={({ field }) => (
									<FormItem className='space-y-0'>
										<Label className='text-xs'>Description</Label>
										<FormControl>
											<Textarea
												placeholder='Adidas shoes are the best shoes in the world'
												disabled={isLoading}
												className='bg-secondary'
												{...field}
											/>
										</FormControl>
										<FormMessage className='text-xs text-red-500' />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='category'
								render={({ field }) => (
									<FormItem className='space-y-0'>
										<Label className='text-xs'>Category</Label>
										<Select
											onValueChange={value => {
												field.onChange(value)
												setSelectedCategory(value)
											}}
											value={field.value}
											disabled={isLoading}
										>
											<FormControl>
												<SelectTrigger className='bg-secondary'>
													<SelectValue placeholder='Select category' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{categories.map(category => (
													<SelectItem value={category._id} key={category._id}>
														<div className='flex items-center gap-2'>
															<span>{category.image}</span>
															<span>{category.name}</span>
														</div>
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage className='text-xs text-red-500' />
									</FormItem>
								)}
							/>

							{selectedCategory && subcategories.length > 0 && (
								<FormField
									control={form.control}
									name='subcategoryId'
									render={({ field }) => (
										<FormItem className='space-y-0'>
											<Label className='text-xs'>Subcategory</Label>
											<Select
												onValueChange={field.onChange}
												value={field.value}
												disabled={isLoading}
											>
												<FormControl>
													<SelectTrigger className='bg-secondary'>
														<SelectValue placeholder='Select subcategory' />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{subcategories.map(subcategory => (
														<SelectItem
															value={subcategory._id}
															key={subcategory._id}
														>
															{subcategory.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage className='text-xs text-red-500' />
										</FormItem>
									)}
								/>
							)}

							<FormField
								control={form.control}
								name='price'
								render={({ field }) => (
									<FormItem className='space-y-0'>
										<Label className='text-xs'>
											{!form.watch('price')
												? 'Price'
												: `Price ${formatPrice(Number(form.watch('price')))} `}
										</Label>
										<FormControl>
											<Input
												placeholder='100.000 UZS'
												type='number'
												className='bg-secondary'
												disabled={isLoading}
												{...field}
											/>
										</FormControl>
										<FormMessage className='text-xs text-red-500' />
									</FormItem>
								)}
							/>
							{form.watch('image') && (
								<div className='w-full h-[200px] bg-secondary flex justify-center items-center relative'>
									<Image
										src={form.watch('image') || '/placeholder.svg'}
										alt='product image'
										fill
										className='object-cover'
									/>
									<Button
										size={'icon'}
										variant={'destructive'}
										className='absolute right-0 top-0'
										type='button'
										onClick={onDeleteImage}
									>
										<X />
									</Button>
								</div>
							)}
							{!form.watch('image') && (
								<UploadDropzone
									endpoint={'imageUploader'}
									onClientUploadComplete={res => {
										form.setValue('image', res[0].url)
										form.setValue('imageKey', res[0].key)
									}}
									config={{ appendOnPaste: true, mode: 'auto' }}
									appearance={{ container: { height: 200, padding: 10 } }}
								/>
							)}
							<Button type='submit' className='w-full' disabled={isLoading}>
								Submit {isLoading && <Loader className='animate-spin' />}
							</Button>
						</form>
					</Form>
				</SheetContent>
			</Sheet>
		</>
	)
}

export default AddProduct
