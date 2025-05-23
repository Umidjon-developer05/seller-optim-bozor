'use client'

import { login } from '@/actions/auth.action'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/hooks/use-toast'
import { loginSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const SignInPage = ({ session }: any) => {
	const [isLoading, setIsLoading] = useState(false)
	function Ontext() {
		if (!session || !session.currentUser) return null
		const { currentUser } = session
		if (currentUser) {
			return (
				<>
					{currentUser?.role == 'user' && currentUser.sotuvchi == true
						? "Tez orada siz bilan bog'lanamiz & Sotuvchi bo'limiga ruxsat beramiz 😊"
						: "Siz login qilib sotuvchi bo'limiga kiring"}
				</>
			)
		} else {
		}
	}

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: '', password: '' },
	})

	function onError(message: string) {
		setIsLoading(false)
		toast({ description: message, variant: 'destructive' })
	}

	async function onSubmit(values: z.infer<typeof loginSchema>) {
		setIsLoading(true)
		const res = await login(values)
		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError('Something went wrong')
		}
		if (res.data.failure) {
			return onError(res.data.failure)
		}
		if (res.data.user) {
			toast({ description: 'Logged in successfully' })
			signIn('credentials', {
				userId: res.data.user._id,
				callbackUrl: '/seller/dashboard',
			})
		}
	}

	return (
		<div className='flex justify-center items-center h-screen w-full'>
			<Card className='md:w-[600px] p-4'>
				<h1 className='text-xl font-bold'>Sign In</h1>
				<p className='text-muted-foreground text-sm text-red-700'>{Ontext()}</p>
				<Separator className='my-3' />
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem className='space-y-0'>
									<Label>Email</Label>
									<FormControl>
										<Input
											placeholder='example@gmial.com'
											disabled={isLoading}
											{...field}
										/>
									</FormControl>
									<FormMessage className='text-xs text-red-500' />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem className='space-y-0'>
									<Label>Password</Label>
									<FormControl>
										<Input
											placeholder='****'
											type='password'
											disabled={isLoading}
											{...field}
										/>
									</FormControl>
									<FormMessage className='text-xs text-red-500' />
								</FormItem>
							)}
						/>
						<Button type='submit' disabled={isLoading}>
							Submit {isLoading && <Loader className='animate-spin' />}
						</Button>
					</form>
				</Form>

				<div className='mt-4'>
					<div className='text-muted-foreground text-sm'>
						Don&apos;t have an account?{' '}
						<Button asChild variant={'link'} className='p-0'>
							<Link href='/sign-up'>Sign up</Link>
						</Button>
					</div>
				</div>
			</Card>
		</div>
	)
}

export default SignInPage
