'use client'

import type React from 'react'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
	User,
	Upload,
	Building,
	Phone,
	Mail,
	CreditCard,
	BanknoteIcon as Bank,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { updateUser } from '@/actions/seller.action'

interface UserData {
	email?: string
	fullName?: string
	inn?: string
	phone?: string
	bankName?: string
	accountNumber?: string
	mfo?: string
	phone1?: string
}

export default function SettingsForm({ userData }: { userData?: UserData }) {
	const [formData, setFormData] = useState<UserData>(userData || {})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	}

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				type: 'spring',
				stiffness: 100,
			},
		},
	}
	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		const reader = new FileReader()

		reader.onloadend = () => {
			console.log(reader.result, 'file') // Bu yerda reader.result mavjud bo'ladi
			setFormData(prev => ({
				...prev,
				phone1: reader.result as string,
			}))
		}

		reader.readAsDataURL(file)
	}

	async function handleSubmit() {
		try {
			await updateUser({ parsedInput: formData })
		} catch (error) {
			console.log('Error updating user:', error)
		}
	}

	return (
		<motion.div
			initial='hidden'
			animate='visible'
			variants={containerVariants}
			className='space-y-8'
		>
			{/* Profile Image */}
			<motion.div
				variants={itemVariants}
				className='flex flex-col items-center justify-center'
			>
				<Avatar className='h-32 w-32 mb-4 border-4 border-primary/20'>
					<AvatarImage src={formData.phone1 || ''} alt={formData.fullName} />
					<AvatarFallback className='text-2xl bg-primary/10'>
						{formData.fullName
							?.split(' ')
							.map(name => name[0])
							.join('')
							.toUpperCase() || 'U'}
					</AvatarFallback>
				</Avatar>
				<Button
					asChild
					variant='outline'
					size='sm'
					className='flex items-center gap-2'
				>
					<label className='cursor-pointer'>
						<Upload className='h-4 w-4' />
						Upload Image
						<input
							type='file'
							accept='image/*'
							onChange={handleImageChange}
							className='hidden'
						/>
					</label>
				</Button>
			</motion.div>

			<Card>
				<CardContent className='pt-6'>
					<motion.div
						variants={containerVariants}
						className='grid gap-6 md:grid-cols-2'
					>
						{/* Full Name */}
						<motion.div variants={itemVariants} className='space-y-2'>
							<Label htmlFor='fullName' className='flex items-center gap-2'>
								<User className='h-4 w-4' />
								Full Name
							</Label>
							<Input
								id='fullName'
								name='fullName'
								value={formData.fullName || ''}
								onChange={handleChange}
								placeholder='Enter your full name'
							/>
						</motion.div>

						{/* Email */}
						<motion.div variants={itemVariants} className='space-y-2'>
							<Label htmlFor='email' className='flex items-center gap-2'>
								<Mail className='h-4 w-4' />
								Email
							</Label>
							<Input
								id='email'
								name='email'
								type='email'
								value={formData.email || ''}
								onChange={handleChange}
								placeholder='Enter your email'
							/>
						</motion.div>

						{/* Phone */}
						<motion.div variants={itemVariants} className='space-y-2'>
							<Label htmlFor='phone' className='flex items-center gap-2'>
								<Phone className='h-4 w-4' />
								Primary Phone
							</Label>
							<Input
								id='phone'
								name='phone'
								value={formData.phone || ''}
								onChange={handleChange}
								placeholder='Enter your phone number'
							/>
						</motion.div>

						{/* INN */}
						<motion.div variants={itemVariants} className='space-y-2'>
							<Label htmlFor='inn' className='flex items-center gap-2'>
								<Building className='h-4 w-4' />
								INN
							</Label>
							<Input
								id='inn'
								name='inn'
								value={formData.inn || ''}
								onChange={handleChange}
								placeholder='Enter your INN'
							/>
						</motion.div>

						{/* Sotuvchi Switch */}
					</motion.div>
				</CardContent>
			</Card>

			{/* Banking Information */}
			<motion.div variants={itemVariants}>
				<Card>
					<CardContent className='pt-6'>
						<h2 className='text-xl font-semibold mb-4'>Banking Information</h2>
						<motion.div
							variants={containerVariants}
							className='grid gap-6 md:grid-cols-2'
						>
							{/* Bank Name */}
							<motion.div variants={itemVariants} className='space-y-2'>
								<Label htmlFor='bankName' className='flex items-center gap-2'>
									<Bank className='h-4 w-4' />
									Bank Name
								</Label>
								<Input
									id='bankName'
									name='bankName'
									value={formData.bankName || ''}
									onChange={handleChange}
									placeholder='Enter your bank name'
								/>
							</motion.div>

							{/* Account Number */}
							<motion.div variants={itemVariants} className='space-y-2'>
								<Label
									htmlFor='accountNumber'
									className='flex items-center gap-2'
								>
									<CreditCard className='h-4 w-4' />
									Account Number
								</Label>
								<Input
									id='accountNumber'
									name='accountNumber'
									value={formData.accountNumber || ''}
									onChange={handleChange}
									placeholder='Enter your account number'
								/>
							</motion.div>

							{/* MFO */}
							<motion.div
								variants={itemVariants}
								className='space-y-2 md:col-span-2'
							>
								<Label htmlFor='mfo' className='flex items-center gap-2'>
									<Building className='h-4 w-4' />
									MFO
								</Label>
								<Input
									id='mfo'
									name='mfo'
									value={formData.mfo || ''}
									onChange={handleChange}
									placeholder='Enter your MFO'
								/>
							</motion.div>
						</motion.div>
					</CardContent>
				</Card>
			</motion.div>

			{/* Save Button */}
			<motion.div variants={itemVariants} className='flex justify-center'>
				<Button size='lg' className='px-8' onClick={handleSubmit}>
					Save Changes
				</Button>
			</motion.div>
		</motion.div>
	)
}
