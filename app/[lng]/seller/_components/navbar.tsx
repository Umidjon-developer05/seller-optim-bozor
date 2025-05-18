import { AppSidebar } from '../_components/app-sidebar'

import getUser from '@/lib/getUser'
export default async function Navbar() {
	const session = await getUser()
	if (!session?.currentUser) {
		return <div>User not found</div>
	}
	return (
		<div className='sticky inset-0 z-40 h-20 backdrop-blur-xl pt-24'>
			<AppSidebar variant='floating' user={session?.currentUser} />
		</div>
	)
}
