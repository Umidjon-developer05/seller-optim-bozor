import { authOptions } from '@/lib/auth-options'
import { getServerSession } from 'next-auth'
import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'
import type { JsonObject } from '@uploadthing/shared' // ✅ use the correct type

const f = createUploadthing()

export const ourFileRouter = {
	imageUploader: f({
		image: { maxFileSize: '4MB', maxFileCount: 1 },
	})
		.middleware(async () => {
			const token = await getServerSession(authOptions)
			if (!token) {
				throw new UploadThingError('Unauthorized')
			}
			return { token }
		})
		.onUploadComplete(async ({ file }) => {
			return {
				...file,
			} as JsonObject // ✅ now correctly typed
		}),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
