import React from 'react'
import SignUpPage from './_components/SignUpPage'
import { cookies } from 'next/headers'
import getUser from '@/lib/getUser'
import ClientToastHandler from './_components/ClientToastHandler'
async function SignUpPagePublic() {
	const token = cookies().get('next-auth.session-token')
	const session = await getUser()
	const alreadySignedUp = token?.value && session?.currentUser?.role === 'user'
	
	return (
		<div>
			{alreadySignedUp && <ClientToastHandler session={session} />}
			<SignUpPage session={session} />
		</div>
	)
}

export default SignUpPagePublic
