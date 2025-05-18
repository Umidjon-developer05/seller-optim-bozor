'use client'

import { Search } from 'lucide-react'
import { Input } from '../ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select'
import { cn, formUrlQuery, removeUrlQuery } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import { debounce } from 'lodash'
import React, { FC, useCallback } from 'react'
import { getCategory } from '@/actions/seller.action'

interface Props {
	showCategory?: boolean
}
const Filter: FC<Props> = ({ showCategory }) => {
	const searchParams = useSearchParams()
	const router = useRouter()
	const [categories, setCategories] = React.useState<any[]>([])
	const fetchCategories = async () => {
		const res = await getCategory()
		setCategories(res?.categories)
	}
	React.useEffect(() => {
		fetchCategories()
	}, [])
	const onFilterChange = (value: string) => {
		const newUrl = formUrlQuery({
			key: 'filter',
			params: searchParams.toString(),
			value,
		})
		router.push(newUrl)
	}

	const onCategoryChange = (value: string) => {
		const newUrl = formUrlQuery({
			key: 'category',
			params: searchParams.toString(),
			value,
		})
		router.push(newUrl)
	}

	const onInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		const newUrl = formUrlQuery({
			key: 'q',
			params: searchParams.toString(),
			value,
		})
		router.push(newUrl)

		if (value === '') {
			const newUrl = removeUrlQuery({
				key: 'q',
				params: searchParams.toString(),
			})
			router.push(newUrl)
		}
	}

	const handleSearchDebounce = useCallback(debounce(onInputSearch, 300), [])

	return (
		<div
			className={cn(
				'gap-1 max-md:w-full grid',
				showCategory ? 'grid-cols-3' : 'grid-cols-2'
			)}
		>
			<div className='flex items-center bg-secondary max-md:w-1/2 border rounded-md '>
				<Input
					placeholder='Qidirish....'
					className='text-xs border-none no-underline no-focus bg-secondary'
					onChange={handleSearchDebounce}
					style={{ outline: 'none' }}
				/>
				<Search className='mr-2 cursor-pointer text-muted-foreground' />
			</div>

			<Select onValueChange={onFilterChange}>
				<SelectTrigger className='bg-secondary text-xs max-md:w-1/2'>
					<SelectValue
						placeholder='Select filter'
						className='text-muted-foreground'
					/>
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='newest'>Newest</SelectItem>
					<SelectItem value='oldest'>Oldest</SelectItem>
				</SelectContent>
			</Select>
			{showCategory && (
				<Select onValueChange={onCategoryChange}>
					<SelectTrigger className='bg-secondary text-xs max-md:w-1/2'>
						<SelectValue
							placeholder='Select category'
							className='text-muted-foreground'
						/>
					</SelectTrigger>
					<SelectContent className='h-[250px] overflow-auto '>
						<SelectItem value={'All'}>All</SelectItem>
						{categories.map(category => (
							<SelectItem value={category?.slug} key={category?.slug}>
								{category?.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			)}
		</div>
	)
}

export default Filter
