import getUser from '@/lib/getUser'
import SettingsForm from './settings-form'
import { SidebarInset } from '@/components/ui/sidebar'
import { SiteHeader } from '../_components/site-header'

async function Settings() {
	const session = await getUser()
	console.log(session, 'session')

	return (
		<div>
			<SidebarInset>
				<SiteHeader title='Settings' />
			</SidebarInset>
			<div className='container mx-auto py-10'>
				<div className='max-w-3xl mx-auto'>
					<h1 className='text-3xl font-bold text-center mb-8'>
						Account Settings
					</h1>
					<SettingsForm userData={session?.currentUser} />
				</div>
			</div>
		</div>
	)
}

export default Settings
