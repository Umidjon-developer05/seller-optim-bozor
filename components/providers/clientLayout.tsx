'use client'

import { ChildProps } from '@/types'
import { CookiesProvider } from 'react-cookie'

export default function ClientLayout({ children }: ChildProps) {
	return <CookiesProvider>{children}</CookiesProvider>
}
