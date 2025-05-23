import {
	Banknote,
	Barcode,
	Heart,
	Settings2,
	Shuffle,
	User,
	UserRound,
} from 'lucide-react'

export const categories = [
	'All',
	'Shoes',
	'T-Shirts',
	'Clothes',
	'Books',
	'Accessories',
	'Universal',
]

export const dashboardSidebar = [
	{ name: 'Personal Information', route: '/dashboard', icon: User },
	{ name: 'Orders', route: '/dashboard/orders', icon: Shuffle },
	{ name: 'Payments', route: '/dashboard/payments', icon: Banknote },
	{ name: 'Watch list', route: '/dashboard/watch-list', icon: Heart },
	{ name: 'Settings', route: '/dashboard/settings', icon: Settings2 },
]

export const adminSidebar = [
	{ name: 'Customers', icon: User, route: '/admin' },
	{ name: 'Products', icon: Barcode, route: '/admin/products' },
	{ name: 'Orders', icon: Shuffle, route: '/admin/orders' },
	{ name: 'Payments', icon: Banknote, route: '/admin/payments' },
]
export const sellerSidebar = [
	{ name: 'Dashboard', icon: UserRound, route: '/business/dashboard' },
	{ name: 'Products', icon: Barcode, route: '/business/products' },
	{ name: 'Orders', icon: Shuffle, route: '/business/orders' },
	{ name: 'Payments', icon: Banknote, route: '/business/payments' },
	{ name: 'Profile', icon: User, route: '/business/profile' },
]

export const TransactionState = {
	Paid: 2,
	Pending: 1,
	PendingCanceled: -1,
	PaidCanceled: -2,
}
