import {
	Contact,
	Home,
	Rss,
	CameraIcon,
	FileCodeIcon,
	FileTextIcon,
	HelpCircleIcon,
	LayoutDashboardIcon,
	SearchIcon,
	SettingsIcon,
	SquareChartGantt,
	BringToFront,
	Settings,
	MessageCircle,
} from 'lucide-react'

export const navLinks = [
	{ route: '', name: 'navLink1', icon: Home },
	{ route: 'blogs', name: 'navLink3', icon: Rss },
	{ route: 'contacts', name: 'navLink4', icon: Contact },
]
export const lngs = [
	{ route: 'en', label: 'English' },
	{ route: 'uz', label: "O'zbekcha" },
	{ route: 'ru', label: 'Русский' },
]

// seller

export const data = {
	user: {
		name: 'shadcn',
		email: 'm@example.com',
		avatar: '/avatars/shadcn.jpg',
	},
	navMain: [
		{
			title: 'Dashboard',
			url: 'dashboard',
			icon: LayoutDashboardIcon,
		},
		{
			title: 'Products',
			url: 'product',
			icon: SquareChartGantt,
		},
		{
			title: 'List of orders',
			url: 'list-order',
			icon: BringToFront,
		},
		{
			title: 'Posts or comments',
			url: 'comments',
			icon: MessageCircle,
		},
		{
			title: 'Settings',
			url: 'settings',
			icon: Settings,
		},
	],
	navClouds: [
		{
			title: 'Capture',
			icon: CameraIcon,
			isActive: true,
			url: '#',
			items: [
				{
					title: 'Active Proposals',
					url: '#',
				},
				{
					title: 'Archived',
					url: '#',
				},
			],
		},
		{
			title: 'Proposal',
			icon: FileTextIcon,
			url: '#',
			items: [
				{
					title: 'Active Proposals',
					url: '#',
				},
				{
					title: 'Archived',
					url: '#',
				},
			],
		},
		{
			title: 'Prompts',
			icon: FileCodeIcon,
			url: '#',
			items: [
				{
					title: 'Active Proposals',
					url: '#',
				},
				{
					title: 'Archived',
					url: '#',
				},
			],
		},
	],
}
