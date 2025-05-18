'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, BarChart3, Clock, Users } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

function HomePage() {
	// Animation variants
	const fadeIn = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
	}

	const staggerContainer = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	}

	const scaleIn = {
		hidden: { opacity: 0, scale: 0.8 },
		visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
	}

	const slideFromLeft = {
		hidden: { opacity: 0, x: -50 },
		visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
	}

	const slideFromRight = {
		hidden: { opacity: 0, x: 50 },
		visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
	}

	// Hero section refs
	const [heroRef, heroInView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	})

	// Features section refs
	const [featuresRef, featuresInView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	})

	// Benefits section refs
	const [benefitsRef, benefitsInView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	})

	// CTA section refs
	const [ctaRef, ctaInView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	})

	return (
		<div className='container mx-auto max-w-7xl'>
			<motion.section
				className='relative'
				ref={heroRef}
				initial='hidden'
				animate={heroInView ? 'visible' : 'hidden'}
				variants={staggerContainer}
			>
				<div className='absolute inset-0 opacity-90' />
				<div className='container relative grid grid-cols-1 lg:grid-cols-2 gap-8 py-24 items-center mt-24'>
					<div className='space-y-6'>
						<motion.h1
							className='text-4xl md:text-5xl font-bold tracking-tight'
							variants={fadeIn}
						>
							Sell across Uzbekistan on Optim Bozor!
						</motion.h1>
						<motion.p className='text-lg md:text-xl' variants={fadeIn}>
							Join thousands of sellers. Connect with millions of customers
							across the country.
						</motion.p>
						<motion.div
							className='grid grid-cols-3 gap-4 pt-4'
							variants={staggerContainer}
						>
							<motion.div className='space-y-2' variants={scaleIn}>
								<h3 className='text-3xl font-bold'>10M+</h3>
								<p className='text-sm'>registered buyers on Optim Bozor</p>
							</motion.div>
							<motion.div className='space-y-2' variants={scaleIn}>
								<h3 className='text-3xl font-bold'>x23</h3>
								<p className='text-sm'>
									sales growth on the marketplace in the last year
								</p>
							</motion.div>
							<motion.div className='space-y-2' variants={scaleIn}>
								<h3 className='text-3xl font-bold'>14</h3>
								<p className='text-sm'>
									days average time to first sale after registration
								</p>
							</motion.div>
						</motion.div>
						<motion.div variants={fadeIn}>
							<Button size='lg' className='mt-4'>
								Become a Seller <ArrowRight className='ml-2 h-4 w-4' />
							</Button>
						</motion.div>
					</div>
					<motion.div className='hidden lg:block' variants={slideFromRight}>
						<Image
							src='/image.png'
							alt='Seller using the platform'
							width={700}
							height={900}
							className='rounded-lg shadow-xl'
						/>
					</motion.div>
				</div>
			</motion.section>

			<motion.section
				id='features'
				className='py-20'
				ref={featuresRef}
				initial='hidden'
				animate={featuresInView ? 'visible' : 'hidden'}
				variants={staggerContainer}
			>
				<div className='container'>
					<motion.div className='text-center mb-16' variants={fadeIn}>
						<h2 className='text-3xl font-bold mb-4'>
							Why sell on Optim Bozor?
						</h2>
						<p className='text-gray-600 max-w-2xl mx-auto'>
							Our platform provides everything you need to start and grow your
							online business
						</p>
					</motion.div>
					<motion.div
						className='grid md:grid-cols-3 gap-8'
						variants={staggerContainer}
					>
						<motion.div variants={scaleIn}>
							<Card>
								<CardContent className='pt-6'>
									<Users className='h-12 w-12 mb-4' />
									<h3 className='text-xl font-bold mb-2'>Massive Audience</h3>
									<p className='text-gray-600'>
										Access to over 10 million active buyers across Uzbekistan
										looking for products like yours.
									</p>
								</CardContent>
							</Card>
						</motion.div>
						<motion.div variants={scaleIn}>
							<Card>
								<CardContent className='pt-6'>
									<BarChart3 className='h-12 w-12 mb-4' />
									<h3 className='text-xl font-bold mb-2'>Rapid Growth</h3>
									<p className='text-gray-600'>
										Sellers on our platform have seen an average of 23x growth
										in sales in the past year.
									</p>
								</CardContent>
							</Card>
						</motion.div>
						<motion.div variants={scaleIn}>
							<Card>
								<CardContent className='pt-6'>
									<Clock className='h-12 w-12 mb-4' />
									<h3 className='text-xl font-bold mb-2'>Quick Results</h3>
									<p className='text-gray-600'>
										Start selling quickly with an average of just 14 days to
										your first sale after registration.
									</p>
								</CardContent>
							</Card>
						</motion.div>
					</motion.div>
				</div>
			</motion.section>

			<motion.section
				id='benefits'
				className='py-20'
				ref={benefitsRef}
				initial='hidden'
				animate={benefitsInView ? 'visible' : 'hidden'}
				variants={staggerContainer}
			>
				<div className='container'>
					<motion.div className='text-center mb-16' variants={fadeIn}>
						<h2 className='text-3xl font-bold mb-4'>
							Benefits of our platform
						</h2>
						<p className='text-gray-600 max-w-2xl mx-auto'>
							We provide all the tools and support you need to succeed
						</p>
					</motion.div>
					<div className='grid md:grid-cols-2 gap-12'>
						<motion.div className='space-y-8' variants={slideFromLeft}>
							<div className='flex gap-4'>
								<div className='bg-primary/10 rounded-full p-3 h-fit'>
									<div className='bg-primary rounded-full w-6 h-6 flex items-center justify-center'>
										1
									</div>
								</div>
								<div>
									<h3 className='text-xl font-bold mb-2'>Easy Registration</h3>
									<p className='text-gray-600'>
										Simple and quick registration process to get you started in
										minutes.
									</p>
								</div>
							</div>
							<div className='flex gap-4'>
								<div className='bg-primary/10 rounded-full p-3 h-fit'>
									<div className='bg-primary rounded-full w-6 h-6 flex items-center justify-center'>
										2
									</div>
								</div>
								<div>
									<h3 className='text-xl font-bold mb-2'>Powerful Dashboard</h3>
									<p className='text-gray-600'>
										Comprehensive analytics and reporting to track your sales
										and growth.
									</p>
								</div>
							</div>
							<div className='flex gap-4'>
								<div className='bg-primary/10 rounded-full p-3 h-fit'>
									<div className='bg-primary rounded-full w-6 h-6 flex items-center justify-center'>
										3
									</div>
								</div>
								<div>
									<h3 className='text-xl font-bold mb-2'>Marketing Support</h3>
									<p className='text-gray-600'>
										Built-in marketing tools and promotions to help you reach
										more customers.
									</p>
								</div>
							</div>
						</motion.div>
						<motion.div className='space-y-8' variants={slideFromRight}>
							<div className='flex gap-4'>
								<div className='bg-primary/10 rounded-full p-3 h-fit'>
									<div className='bg-primary rounded-full w-6 h-6 flex items-center justify-center'>
										4
									</div>
								</div>
								<div>
									<h3 className='text-xl font-bold mb-2'>Secure Payments</h3>
									<p className='text-gray-600'>
										Reliable payment processing and timely transfers to your
										account.
									</p>
								</div>
							</div>
							<div className='flex gap-4'>
								<div className='bg-primary/10 rounded-full p-3 h-fit'>
									<div className='bg-primary rounded-full w-6 h-6 flex items-center justify-center'>
										5
									</div>
								</div>
								<div>
									<h3 className='text-xl font-bold mb-2'>Logistics Network</h3>
									<p className='text-gray-600'>
										Nationwide delivery network to get your products to
										customers quickly.
									</p>
								</div>
							</div>
							<div className='flex gap-4'>
								<div className='bg-primary/10 rounded-full p-3 h-fit'>
									<div className='bg-primary rounded-full w-6 h-6 flex items-center justify-center'>
										6
									</div>
								</div>
								<div>
									<h3 className='text-xl font-bold mb-2'>24/7 Support</h3>
									<p className='text-gray-600'>
										Dedicated support team to help you with any questions or
										issues.
									</p>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</motion.section>

			<motion.section
				id='cta'
				className='py-20'
				ref={ctaRef}
				initial='hidden'
				animate={ctaInView ? 'visible' : 'hidden'}
				variants={fadeIn}
			>
				<div className='container text-center'>
					<h2 className='text-3xl font-bold mb-6'>Ready to start selling?</h2>
					<p className='text-xl mb-8 max-w-2xl mx-auto'>
						Join thousands of successful sellers on Optim Bozor today and grow
						your business.
					</p>
					<Button size='lg' variant='secondary'>
						Register as a Seller
					</Button>
				</div>
			</motion.section>
		</div>
	)
}

export default HomePage
