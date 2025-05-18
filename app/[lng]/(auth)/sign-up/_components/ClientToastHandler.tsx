'use client'

import { useEffect, useRef } from 'react'
import { toast } from 'react-toastify'

export default function ClientToastHandler({ session }: any) {
	const hasShown = useRef(false)

	useEffect(() => {
		if (!hasShown.current) {
			toast.success(
				`Siz allaqachon ro'yxatdan o'tgansiz. Iltimos, login qiling ${session?.currentUser?.fullName}`
			)
			hasShown.current = true
		}
	}, [])

	return null
}
