import { Separator } from '@/components/ui/separator'
import Filter from '@/components/shared/filter'
import CardLoader from '@/components/loaders/card.loader'

const Loading = () => {
	return (
		<>
			<div className='flex justify-between items-center w-full'></div>

			<Separator className='my-3' />

			<Filter showCategory />

			<div className='grid grid-cols-1 md:grid-cols-3 gap-3 mt-3'>
				{Array.from({ length: 6 }).map((_, i) => (
					<CardLoader key={i} isAdmin />
				))}
			</div>
		</>
	)
}

export default Loading
