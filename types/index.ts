export interface ChildProps {
	children: React.ReactNode
}

export type SearchParams = { [key: string]: string | string[] | undefined }
export type Params = {
	productId: string
	userId: {
		_id: string
		email: string
		fullName: string
		createdAt: Date
		phone: string
	}
}
export interface UserData {
	email?: string
	fullName?: string
	inn?: string
	phone?: string
	bankName?: string
	accountNumber?: string
	mfo?: string
	phone1?: string
}
export interface QueryProps {
	params: string
	key: string
	value?: string | null
}
export interface CartProps {
	productId: string
	quantity: number
	selleronId: string
}
export interface ReturnActionType {
	user: IUser
	failure: string
	checkoutUrl: string
	status: number
	isNext: boolean
	products: IProduct[]
	product: IProduct
	customers: IUser[]
	subcategoryId: string
	orders: IOrder[]
	transactions: ITransaction[]

	statistics: {
		totalOrders: number
		totalTransactions: number
		totalFavourites: number
	}
	cart: {
		products: IProduct[]
	}
}

export interface IProduct {
	title: string
	category: {
		_id: string
		name: string
		subcategories: [{ _id: string; name: string; slug: string }]
	}
	price: number
	image: string
	description: string
	imageKey: string
	subcategoryId: string
	_id: string
	userId: {
		_id: string
		email: string
		fullName: string
	}
}
export interface IProduct1 {
	title: string
	category: {
		_id: string
		name: string
		subcategories: [{ _id: string; name: string; slug: string }]
	}
	price: number
	image: string
	description: string
	imageKey: string
	subcategoryId: string
	_id: string
}

export interface IUser {
	email: string
	fullName: string
	password: string
	_id: string
	phone: string
	role: string
	orderCount: number
	totalPrice: number
	avatar: string
	avatarKey: string
	isDeleted: boolean
	deletedAt: Date
	favorites: IProduct[]
	createdAt: string
	sotuvchi: boolean
	image: string | null | undefined
}

export interface IOrder {
	_id: string
	user: IUser
	product: IProduct
	createdAt: Date
	price: number
	status: string
	updatedAt: Date
	latitude: string
	longitude: string
}

export interface ITransaction {
	_id: string
	id: string
	user: IUser
	product: IProduct
	state: number
	amount: number
	create_time: number
	perform_time: number
	cancel_time: number
	reason: number
	provider: string
}
