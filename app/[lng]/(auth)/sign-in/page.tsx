import React from 'react'
import SignInPage from './_components/SignInPage'
import getUser from '@/lib/getUser'

async function SignInPagePublic() {
	const session = await getUser()

	return (
		<div>
			<SignInPage session={session} />
		</div>
	)
}

export default SignInPagePublic
