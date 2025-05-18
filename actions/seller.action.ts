'use server'

import { axiosClient } from '@/http/axios'
import { authOptions } from '@/lib/auth-options'
import { generateToken } from '@/lib/generate-token'
import { actionClient } from '@/lib/safe-action'
import {
	idSchema,
	productSchema,
	searchParamsSchema,
	updateProductSchema,
	updateStatusSchema,
	updateUserSchema,
} from '@/lib/validation'
import { ReturnActionType, UserData } from '@/types'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { UTApi } from 'uploadthing/server'

const utapi = new UTApi()

export const getProducts = actionClient
	.schema(searchParamsSchema)
	.action<ReturnActionType>(async ({ parsedInput }) => {
		const session = await getServerSession(authOptions)
		const token = await generateToken(session?.currentUser?._id)
		const { data } = await axiosClient.get('/api/business/products', {
			headers: { Authorization: `Bearer ${token}` },
			params: parsedInput,
		})
		return JSON.parse(JSON.stringify(data))
	})

export const getCategory = async () => {
	const session = await getServerSession(authOptions)
	const token = await generateToken(session?.currentUser?._id)
	const { data } = await axiosClient.get('/api/business/seller-categories', {
		headers: { Authorization: `Bearer ${token}` },
	})
	return JSON.parse(JSON.stringify(data))
}

export const getCustomers = actionClient
	.schema(searchParamsSchema)
	.action<ReturnActionType>(async ({ parsedInput }) => {
		const session = await getServerSession(authOptions)
		const token = await generateToken(session?.currentUser?._id)
		const { data } = await axiosClient.get('/api/business/customers', {
			headers: { Authorization: `Bearer ${token}` },
			params: parsedInput,
		})
		return JSON.parse(JSON.stringify(data))
	})

export const getOrders = actionClient
	.schema(searchParamsSchema)
	.action<ReturnActionType>(async ({ parsedInput }) => {
		const session = await getServerSession(authOptions)
		const token = await generateToken(session?.currentUser?._id)
		const { data } = await axiosClient.get('/api/business/orders', {
			headers: { Authorization: `Bearer ${token}` },
			params: parsedInput,
		})
		console.log(data, 'orders data')

		return JSON.parse(JSON.stringify(data))
	})

export const getTransactions = actionClient
	.schema(searchParamsSchema)
	.action<ReturnActionType>(async ({ parsedInput }) => {
		const session = await getServerSession(authOptions)
		const token = await generateToken(session?.currentUser?._id)
		const { data } = await axiosClient.get('/api/business/transactions', {
			headers: { Authorization: `Bearer ${token}` },
			params: parsedInput,
		})
		return JSON.parse(JSON.stringify(data))
	})

export const createProduct = actionClient
	.schema(productSchema)
	.action<ReturnActionType>(async ({ parsedInput }) => {
		const session = await getServerSession(authOptions)
		const token = await generateToken(session?.currentUser?._id)
		const { data } = await axiosClient.post(
			'/api/business/create-product',
			{ ...parsedInput, price: parseFloat(parsedInput.price) },
			{ headers: { Authorization: `Bearer ${token}` } }
		)
		revalidatePath('/business/create-product')
		return JSON.parse(JSON.stringify(data))
	})

export const updateProduct = actionClient
	.schema(updateProductSchema)
	.action<ReturnActionType>(async ({ parsedInput }) => {
		const session = await getServerSession(authOptions)
		const token = await generateToken(session?.currentUser?._id)
		const { data } = await axiosClient.put(
			`/api/business/update-product/${parsedInput.id}`,
			{ ...parsedInput, price: parseFloat(parsedInput.price) },
			{ headers: { Authorization: `Bearer ${token}` } }
		)
		revalidatePath('/business/products')
		return JSON.parse(JSON.stringify(data))
	})
export const updateUser = async ({
	parsedInput,
}: {
	parsedInput: UserData
}) => {
	const session = await getServerSession(authOptions)
	if (!session?.currentUser)
		return { failure: 'You must be logged in to update your profile' }
	const token = await generateToken(session?.currentUser?._id)
	const { data } = await axiosClient.put(
		'/api/user/update-profile',
		parsedInput,
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	)
	return JSON.parse(JSON.stringify(data))
}
export const updateOrder = actionClient
	.schema(updateStatusSchema)
	.action<ReturnActionType>(async ({ parsedInput }) => {
		const session = await getServerSession(authOptions)
		const token = await generateToken(session?.currentUser?._id)
		const { id, status } = parsedInput
		const { data } = await axiosClient.put(
			`/api/business/update-order/${id}`,
			{ status },
			{ headers: { Authorization: `Bearer ${token}` } }
		)
		revalidatePath('/business/orders')
		return JSON.parse(JSON.stringify(data))
	})

export const deleteProduct = actionClient
	.schema(idSchema)
	.action<ReturnActionType>(async ({ parsedInput }) => {
		const session = await getServerSession(authOptions)
		const token = await generateToken(session?.currentUser?._id)
		const { data } = await axiosClient.delete(
			`/api/business/delete-product/${parsedInput.id}`,
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		)
		revalidatePath('/business/products')
		return JSON.parse(JSON.stringify(data))
	})

export const deleteFile = async (key: string) => {
	await utapi.deleteFiles(key)
}
