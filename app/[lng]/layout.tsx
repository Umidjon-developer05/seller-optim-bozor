import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { languages } from '@/i18n/settings'
import { dir } from 'i18next'
import { ChildProps } from '@/types'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import ClientLayout from '@/components/providers/clientLayout'
import SessionProvider from '@/components/providers/session.provider'
import { ToastContainer } from 'react-toastify'
import NextTopLoader from 'nextjs-toploader'

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
})

const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
})

export const metadata: Metadata = {
	metadataBase: new URL('https://seller.optim-bozor.uz'),
	authors: [
		{ name: 'Seller Optim Bozor', url: 'https://seller.optim-bozor.uz' },
	],
	title: 'Seller Optim Bozor | Oson va Ishonchli Onlayn Savdo',
	description:
		'Optim Bozor platformasida onlayn savdo oson va xavfsiz! Keng assortimentdagi mahsulotlar, tez yetkazib berish va qulay toʻlov usullari bilan xizmatdamiz.',
	openGraph: {
		title: 'Seller Optim Bozor | Oson va Ishonchli Onlayn Savdo',
		description:
			'Optim Bozor orqali ishonchli va qulay onlayn xaridlar amalga oshiring. Eng yangi mahsulotlar, arzon narxlar, tez yetkazib berish va xavfsiz toʻlov tizimi siz uchun!',
		url: 'https://seller.optim-bozor.uz',
		locale: 'uz-UZ',
		countryName: 'Uzbekistan',
		images:
			'https://858yhjxxl1.ufs.sh/f/IyD1CkboyepaCagwTiINL7gMZGADdRF8CbnoKmPHIkr3lTuX',
		type: 'website',
		emails: 'seller@optim-bozor.uz',
	},
	twitter: {
		title: 'Seller Optim Bozor | Oson va Ishonchli Onlayn Savdo',
		description:
			'Optim Bozor – siz izlagan barcha mahsulotlar bir joyda. Endi xarid qilish oson, xavfsiz va tez! Onlayn savdo uchun ishonchli manba.',
	},
}

export async function generateStaticParams() {
	return languages.map(lng => ({ lng }))
}

interface Props extends ChildProps {
	params: {
		lng: string
	}
}

export default function RootLayout({ children, params: { lng } }: Props) {
	return (
		<SessionProvider>
			<html lang={lng} dir={dir(lng)} suppressHydrationWarning>
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
					<ThemeProvider
						attribute='class'
						defaultTheme='dark'
						enableSystem
						disableTransitionOnChange
					>
						<ClientLayout>
							<NextTopLoader showSpinner={false} />
							{children}
							<ToastContainer />
						</ClientLayout>
					</ThemeProvider>
				</body>
			</html>
		</SessionProvider>
	)
}
