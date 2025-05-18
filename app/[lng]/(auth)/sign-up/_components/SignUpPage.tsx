'use client'

import { register, sendOtp, verifyOtp } from '@/actions/auth.action'
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
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from '@/components/ui/input-otp'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import useAction from '@/hooks/use-action'
import { toast } from '@/hooks/use-toast'
import { otpSchema, registerSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const SignUpPage = ({ session }: any) => {
	const [isResend, setIsResend] = useState(false)
	const [isVerifying, setIsVerifying] = useState(false)

	const { isLoading, onError, setIsLoading } = useAction()

	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: '',
			password: '',
			fullName: '',
			phone: '',
			inn: '',
			bankName: '',
			accountNumber: '',
			mfo: '',
			sotuvchi: true,
		},
	})

	const otpForm = useForm<z.infer<typeof otpSchema>>({
		resolver: zodResolver(otpSchema),
		defaultValues: { otp: '' },
	})

	async function onSubmit(values: z.infer<typeof registerSchema>) {
		setIsLoading(true)
		const res = await sendOtp({ email: values.email })
		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError('Something went wrong')
		}
		if (res.data.failure) {
			return onError(res.data.failure)
		}
		if (res.data.status === 200) {
			toast({ description: 'OTP sent successfully' })
			setIsVerifying(true)
			setIsLoading(false)
			setIsResend(false)
		}
	}

	async function onVerify(values: z.infer<typeof otpSchema>) {
		setIsLoading(true)
		const res = await verifyOtp({
			otp: values.otp,
			email: form.getValues('email'),
		})
		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError('Something went wrong')
		}
		if (res.data.failure) {
			return onError(res.data.failure)
		}
		if (res.data.status === 301) {
			setIsResend(true)
			setIsLoading(false)
			toast({ description: 'OTP was expired. Please resend OTP' })
		}
		if (res.data.status === 200) {
			const response = await register(form.getValues())
			if (
				response?.serverError ||
				response?.validationErrors ||
				!response?.data
			) {
				return onError('Something went wrong')
			}
			if (response.data.failure) {
				return onError(response.data.failure)
			}
			if (response.data.user._id) {
				toast({ description: 'User created successfully' })
				signIn('credentials', {
					userId: response.data.user._id,
					callbackUrl: '/',
				})
			}
		}
	}

	return (
		<div className='flex min-h-screen items-center justify-center p-4 md:w-[900px]'>
			<Card className='w-full  p-6'>
				<div className='mb-6 text-center'>
					<h1 className='text-2xl font-bold'>Sign Up</h1>
					<p className='text-muted-foreground text-sm'>
						Welcome to our platform! Please sign up to create an account
					</p>
				</div>
				<Separator className='my-4' />

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
						<div className='grid w-full grid-cols-1 gap-4 md:grid-cols-2'>
							<FormField
								control={form.control}
								name='fullName'
								render={({ field }) => (
									<FormItem className='space-y-1'>
										<Label>Full Name</Label>
										<FormControl>
											<Input
												placeholder='Osman Ali'
												disabled={
													isLoading ||
													isVerifying ||
													session?.currentUser?.role === 'user'
												}
												{...field}
											/>
										</FormControl>
										<FormMessage className='text-xs' />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem className='space-y-1'>
										<Label>Email</Label>
										<FormControl>
											<Input
												placeholder='example@gmail.com'
												disabled={
													isLoading ||
													isVerifying ||
													session?.currentUser?.role === 'user'
												}
												{...field}
											/>
										</FormControl>
										<FormMessage className='text-xs' />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem className='space-y-1'>
										<Label>Password</Label>
										<FormControl>
											<Input
												placeholder='****'
												type='password'
												disabled={
													isLoading ||
													isVerifying ||
													session?.currentUser?.role === 'user'
												}
												{...field}
											/>
										</FormControl>
										<FormMessage className='text-xs' />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='phone'
								render={({ field }) => (
									<FormItem className='space-y-1'>
										<Label>Telefon raqam (Click ulangan)</Label>
										<FormControl>
											<Input
												placeholder='+998901234567'
												{...field}
												disabled={session?.currentUser?.role === 'user'}
											/>
										</FormControl>
										<FormMessage className='text-xs' />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='inn'
								render={({ field }) => (
									<FormItem className='space-y-1'>
										<Label>INN (STIR)</Label>
										<FormControl>
											<Input
												placeholder='123456789'
												{...field}
												disabled={session?.currentUser?.role === 'user'}
											/>
										</FormControl>
										<FormMessage className='text-xs' />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='bankName'
								render={({ field }) => (
									<FormItem className='space-y-1'>
										<Label>Bank nomi</Label>
										<FormControl>
											<Input
												placeholder='Xalq banki'
												{...field}
												disabled={session?.currentUser?.role === 'user'}
											/>
										</FormControl>
										<FormMessage className='text-xs' />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='accountNumber'
								render={({ field }) => (
									<FormItem className='space-y-1'>
										<Label>Hisob raqam</Label>
										<FormControl>
											<Input
												placeholder='1234567890123456'
												{...field}
												disabled={session?.currentUser?.role === 'user'}
											/>
										</FormControl>
										<FormMessage className='text-xs' />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='mfo'
								render={({ field }) => (
									<FormItem className='space-y-1'>
										<Label>MFO</Label>
										<FormControl>
											<Input
												placeholder='01162'
												{...field}
												disabled={session?.currentUser?.role === 'user'}
											/>
										</FormControl>
										<FormMessage className='text-xs' />
									</FormItem>
								)}
							/>
						</div>

						{!isVerifying && (
							<div className='flex justify-end'>
								<Button
									type='submit'
									disabled={isLoading || session?.currentUser?.role === 'user'}
									className='min-w-[200px]'
								>
									Submit{' '}
									{isLoading && <Loader className='ml-2 size-4 animate-spin' />}
								</Button>
							</div>
						)}
					</form>
				</Form>

				{isVerifying && (
					<Form {...otpForm}>
						<form
							onSubmit={otpForm.handleSubmit(onVerify)}
							className='mt-6 space-y-4'
						>
							<FormField
								control={otpForm.control}
								name='otp'
								render={({ field }) => (
									<FormItem className='space-y-2'>
										<Label className='block text-center'>Enter OTP</Label>
										<FormControl>
											<div className='flex justify-center'>
												<InputOTP maxLength={6} {...field}>
													<InputOTPGroup>
														<InputOTPSlot index={0} />
														<InputOTPSlot index={1} />
														<InputOTPSlot index={2} />
													</InputOTPGroup>
													<InputOTPSeparator />
													<InputOTPGroup>
														<InputOTPSlot index={3} />
														<InputOTPSlot index={4} />
														<InputOTPSlot index={5} />
													</InputOTPGroup>
												</InputOTP>
											</div>
										</FormControl>
										<FormMessage className='text-center text-xs' />
									</FormItem>
								)}
							/>
							<div className='flex justify-center gap-3'>
								<Button type='submit' disabled={isLoading || isResend}>
									Verify{' '}
									{isLoading && <Loader className='ml-2 size-4 animate-spin' />}
								</Button>
								{isResend && (
									<Button
										type='button'
										onClick={() => onSubmit(form.getValues())}
										disabled={isLoading}
									>
										Resend OTP{' '}
										{isLoading && (
											<Loader className='ml-2 size-4 animate-spin' />
										)}
									</Button>
								)}
							</div>
						</form>
					</Form>
				)}

				<div className='mt-6 text-center'>
					<div className='text-muted-foreground text-sm '>
						Already have an account?{' '}
						<Button asChild variant='link' className='p-0'>
							<Link href='/sign-in'>Sign in</Link>
						</Button>
					</div>
				</div>
			</Card>
		</div>
	)
}

export default SignUpPage
