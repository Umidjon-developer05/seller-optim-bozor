// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { rateLimiter } from './lib/rate-limiter'
import createMiddleware from 'next-intl/middleware'
import { getToken } from 'next-auth/jwt'

const intlMiddleware = createMiddleware({
	locales: ['en', 'ru', 'uz'],
	defaultLocale: 'uz',
})

const getClientIp = (req: NextRequest): string => {
	const forwarded = req.headers.get('x-forwarded-for')
	return forwarded?.split(',')[0]?.trim() || 'unknown'
}

export async function middleware(req: NextRequest) {
	const ip = getClientIp(req)

	if (!rateLimiter(ip)) {
		return NextResponse.json(
			{ message: 'Too many requests, please try again later.' },
			{ status: 429 }
		)
	}

	// First run intlMiddleware to handle locale detection
	const response = intlMiddleware(req)

	return response
}

// Matcher for both rate limiting and i18n
export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/(api|trpc)(.*)'],
}
