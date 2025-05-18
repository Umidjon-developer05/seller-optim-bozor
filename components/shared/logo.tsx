import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Logo() {
	return (
		<Link href='/' className='flex items-center gap-2'>
			<Image src='/optim-seller.png' alt='Logo' width={140} height={120} />
		</Link>
	)
}

export default Logo
