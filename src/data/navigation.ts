import { MegamenuItem, NavItemType } from '@/shared/Navigation/NavigationItem'
import ncNanoId from '@/utils/ncNanoId'
import { Route } from '@/routers/types'
import __megamenu from './jsons/__megamenu.json'

const megaMenuDemo: MegamenuItem[] = [
	{
		id: ncNanoId(),
		image:
			'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
		title: 'Company',
		items: __megamenu.map((i) => ({
			id: ncNanoId(),
			href: '/',
			name: i.Company,
		})),
	},
	{
		id: ncNanoId(),
		image:
			'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
		title: 'App Name',
		items: __megamenu.map((i) => ({
			id: ncNanoId(),
			href: '/',
			name: i.AppName,
		})),
	},
	{
		id: ncNanoId(),
		image:
			'https://images.pexels.com/photos/5059013/pexels-photo-5059013.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
		title: 'City',
		items: __megamenu.map((i) => ({
			id: ncNanoId(),
			href: '/',
			name: i.City,
		})),
	},
	{
		id: ncNanoId(),
		image:
			'https://images.pexels.com/photos/5159141/pexels-photo-5159141.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
		title: 'Contruction',
		items: __megamenu.map((i) => ({
			id: ncNanoId(),
			href: '/',
			name: i.Contruction,
		})),
	},
	{
		id: ncNanoId(),
		image:
			'https://images.pexels.com/photos/7473041/pexels-photo-7473041.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
		title: 'Country',
		items: __megamenu.map((i) => ({
			id: ncNanoId(),
			href: '/',
			name: i.Country,
		})),
	},
]

const demoChildMenus: NavItemType[] = [
	{
		id: ncNanoId(),
		href: '/listing-stay',
		name: 'Arunachal Pradesh',
	},
	{
		id: ncNanoId(),
		href: '/listing-stay',
		name: 'Haryana',
		// isNew: true,
	},
	{
		id: ncNanoId(),
		href: '/listing-stay',
		name: 'Himachal',
		// isNew: true,
	},
	{
		id: ncNanoId(),
		href: '/listing-stay',
		name: 'Goa',
	},
	{
		id: ncNanoId(),
		href: '/listing-stay',
		name: 'Jammu & Kashmir',
	},
	{
		id: ncNanoId(),
		href: '/listing-stay',
		name: 'Karnataka',
	},
	{
		id: ncNanoId(),
		href: '/listing-stay',
		name: 'Kerala',
	},
	{
		id: ncNanoId(),
		href: '/listing-stay',
		name: 'Maharashtra',
	},
	{
		id: ncNanoId(),
		href: '/listing-stay',
		name: 'Meghalaya',
	},
	{
		id: ncNanoId(),
		href: '/listing-stay',
		name: 'Puducherry',
	},
	{
		id: ncNanoId(),
		href: '/listing-stay',
		name: 'Punjab',
	},
	{
		id: ncNanoId(),
		href: '/listing-stay',
		name: 'Sikkim',
	},
	{
		id: ncNanoId(),
		href: '/listing-stay',
		name: 'Tamil Nadu',
	},
	{
		id: ncNanoId(),
		href: '/listing-stay',
		name: 'Uttrakhand',
	},
]

const otherPageChildMenus: NavItemType[] = [
	// { id: ncNanoId(), href: '/add-listing/1' as Route, name: '+ Add listing' },
	{ id: ncNanoId(), href: '/listing-stay', name: 'Assam' },
	{ id: ncNanoId(), href: '/listing-stay', name: 'Gujrat' },
	{ id: ncNanoId(), href: '/listing-stay', name: 'Himachal' },
	{ id: ncNanoId(), href: '/listing-stay', name: 'Karnataka' },
	{ id: ncNanoId(), href: '/listing-stay', name: 'Kerala' },
	{ id: ncNanoId(), href: '/listing-stay', name: 'Maharashtra' },
	{ id: ncNanoId(), href: '/listing-stay', name: 'Odisha' },
	{ id: ncNanoId(), href: '/listing-stay', name: 'Puhjab' },
	{ id: ncNanoId(), href: '/listing-stay', name: 'Sikkim' },
	{ id: ncNanoId(), href: '/listing-stay', name: 'Rajasthan' },
	{ id: ncNanoId(), href: '/listing-stay', name: 'Tamil Nadu' },
	{ id: ncNanoId(), href: '/listing-stay', name: 'Uttrakhand' },
	{ id: ncNanoId(), href: '/listing-stay', name: 'Uttar Pradesh' },
	{ id: ncNanoId(), href: '/listing-stay', name: 'West Bengal' },
]

const workationPageChildMenus: NavItemType[] = [
	// { id: ncNanoId(), href: '/add-listing/1' as Route, name: '+ Add listing' },
	{ id: ncNanoId(), href: '/listing-stay', name: 'Assam' },
	{ id: ncNanoId(), href: '/listing-stay', name: 'Goa' },
	{ id: ncNanoId(), href: '/listing-stay', name: 'Haryana' },
	{ id: ncNanoId(), href: '/listing-stay', name: 'Himachal' },
	{ id: ncNanoId(), href: '/listing-stay', name: 'Kashmir' },
	{ id: ncNanoId(), href: '/listing-stay', name: 'Kerala' },
	{ id: ncNanoId(), href: '/listing-stay', name: 'Ladakh' },
	{ id: ncNanoId(), href: '/listing-stay', name: 'Meghalaya' },
	{ id: ncNanoId(), href: '/listing-stay', name: 'Rajasthan' },
	{ id: ncNanoId(), href: '/listing-stay', name: 'Sikkim' },
	{ id: ncNanoId(), href: '/listing-stay', name: 'Tamil Nadu' },
	{ id: ncNanoId(), href: '/listing-stay', name: 'Uttrakhand' },
	{ id: ncNanoId(), href: '/listing-stay', name: 'West Bengal' },
]

const templatesChildrenMenus: NavItemType[] = [
	{
		id: ncNanoId(),
		href: '/add-listing/1' as Route,
		name: '+ Add listing',
		type: 'dropdown',
		children: [
			{
				id: ncNanoId(),
				href: '/add-listing/1' as Route,
				name: 'Add listing 1',
			},
			{
				id: ncNanoId(),
				href: '/add-listing/2' as Route,
				name: 'Add listing 2',
			},
			{
				id: ncNanoId(),
				href: '/add-listing/3' as Route,
				name: 'Add listing 3',
			},
			{
				id: ncNanoId(),
				href: '/add-listing/4' as Route,
				name: 'Add listing 4',
			},
			{
				id: ncNanoId(),
				href: '/add-listing/5' as Route,
				name: 'Add listing 5',
			},
			{
				id: ncNanoId(),
				href: '/add-listing/6' as Route,
				name: 'Add listing 6',
			},
			{
				id: ncNanoId(),
				href: '/add-listing/7' as Route,
				name: 'Add listing 7',
			},
			{
				id: ncNanoId(),
				href: '/add-listing/8' as Route,
				name: 'Add listing 8',
			},
			{
				id: ncNanoId(),
				href: '/add-listing/9' as Route,
				name: 'Add listing 9',
			},
			{
				id: ncNanoId(),
				href: '/add-listing/10' as Route,
				name: 'Add listing 10',
			},
		],
	},
	//
	{ id: ncNanoId(), href: '/checkout', name: 'Checkout' },
	{ id: ncNanoId(), href: '/pay-done', name: 'Pay done' },
	//
	{ id: ncNanoId(), href: '/author', name: 'Author page' },
	{ id: ncNanoId(), href: '/account', name: 'Account page' },
	//
	{
		id: ncNanoId(),
		href: '/subscription',
		name: 'Subscription',
	},
]

export const NAVIGATION_DEMO: NavItemType[] = [
	{
		id: ncNanoId(),
		href: '/',
		name: 'Home',
		// type: 'dropdown',
		// children: demoChildMenus,
		isNew: true,
	},
	{
		id: ncNanoId(),
		href: '/about',
		name: 'About Us',
		// type: 'dropdown',
		// children: demoChildMenus,
		isNew: true,
	},
	{
		id: ncNanoId(),
		href: '/listing-stay',
		// name: 'Listing Page',
		name: 'Homestays',
		type: 'dropdown',
		children: [
			{
				id: ncNanoId(),
				href: '/listing-stay',
				name: 'North India',
				type: 'dropdown',
				children: [
					{ id: ncNanoId(), href: '/listing-stay', name: 'Chandigarh', stayType: "Homestay", state: "Chandigarh" },
					{ id: ncNanoId(), href: '/listing-stay', name: 'Delhi', stayType: "Homestay", state: "Delhi" },
					{ id: ncNanoId(), href: '/listing-stay-detail', name: 'Haryana' },
				],
			},
			{
				id: ncNanoId(),
				href: '/listing-stay',
				name: 'South India',
				type: 'dropdown',
				children: [
					{ id: ncNanoId(), href: '/listing-stay', name: 'Andaman & Nicobar' },
					{ id: ncNanoId(), href: '/listing-stay-map', name: 'Tamil Nadu' },
					{ id: ncNanoId(), href: '/listing-stay-detail', name: 'Kerala' },
				],
			},
			{
				id: ncNanoId(),
				href: '/listing-stay',
				name: 'East India',
				type: 'dropdown',
				children: [
					{ id: ncNanoId(), href: '/listing-stay', name: 'Bihar' },
					{ id: ncNanoId(), href: '/listing-stay-map', name: 'Odisha' },
					{ id: ncNanoId(), href: '/listing-stay-detail', name: 'West Bengal' },
				],
			},
			{
				id: ncNanoId(),
				href: '/listing-stay',
				name: 'West India',
				type: 'dropdown',
				children: [
					{ id: ncNanoId(), href: '/listing-stay', name: 'Goa' },
					{ id: ncNanoId(), href: '/listing-stay-map', name: 'Gujrat' },
					{ id: ncNanoId(), href: '/listing-stay-detail', name: 'Maharashtra' },
				],
			},
			{
				id: ncNanoId(),
				href: '/listing-stay',
				name: 'North East India',
				type: 'dropdown',
				children: [
					{ id: ncNanoId(), href: '/listing-stay', name: 'Assam' },
					{ id: ncNanoId(), href: '/listing-stay-map', name: 'Arunachal Pradesh' },
					{ id: ncNanoId(), href: '/listing-stay-detail', name: 'Manipur' },
				],
			},
			{
				id: ncNanoId(),
				href: '/listing-stay',
				name: 'Central India',
				type: 'dropdown',
				children: [
					{ id: ncNanoId(), href: '/listing-stay', name: 'Chhattishgarh' },
					{ id: ncNanoId(), href: '/listing-stay-map', name: 'Madhya Pradesh' },
					{ id: ncNanoId(), href: '/listing-stay-detail', name: 'Uttar Pradesh' },
				],
			},

			//
			// {
			// 	id: ncNanoId(),
			// 	href: '/listing-experiences',
			// 	name: 'Experiences listings',
			// 	type: 'dropdown',
			// 	children: [
			// 		{
			// 			id: ncNanoId(),
			// 			href: '/listing-experiences',
			// 			name: 'Experiences page',
			// 		},
			// 		{
			// 			id: ncNanoId(),
			// 			href: '/listing-experiences-map',
			// 			name: 'Experiences page (map)',
			// 		},
			// 		{
			// 			id: ncNanoId(),
			// 			href: '/listing-experiences-detail',
			// 			name: 'Experiences Detail',
			// 		},
			// 	],
			// },

			//
			// {
			// 	id: ncNanoId(),
			// 	href: '/listing-car',
			// 	name: 'Cars listings',
			// 	type: 'dropdown',
			// 	children: [
			// 		{ id: ncNanoId(), href: '/listing-car', name: 'Cars page' },
			// 		{ id: ncNanoId(), href: '/listing-car-map', name: 'Cars page (map)' },
			// 		{ id: ncNanoId(), href: '/listing-car-detail', name: 'Car Detail' },
			// 	],
			// },

			//
			// {
			// 	id: ncNanoId(),
			// 	href: '/listing-real-estate',
			// 	name: 'Real Estate Listings',
			// 	type: 'dropdown',
			// 	children: [
			// 		{
			// 			id: ncNanoId(),
			// 			href: '/listing-real-estate',
			// 			name: 'Real Estate Listings',
			// 		},
			// 		{
			// 			id: ncNanoId(),
			// 			href: '/listing-real-estate-map',
			// 			name: 'Real Estate Maps',
			// 		},
			// 	],
			// },
			
			// {
			// 	id: ncNanoId(),
			// 	href: '/listing-flights',
			// 	name: 'Flights listings',
			// },
		],
	},
	{
		id: ncNanoId(),
		href: '/listing-stay',
		// name: 'Templates',
		name: 'Farmstay',
		type: 'dropdown',
		children: otherPageChildMenus,
	},

	{
		id: ncNanoId(),
		href: '/listing-stay',
		// name: 'Other pages',
		name: 'Second Home',
		type: 'dropdown',
		children: demoChildMenus,
		// type: 'megaMenu',
		// megaMenu: megaMenuDemo,
	},
	{
		id: ncNanoId(),
		href: '/listing-stay',
		// name: 'Other pages',
		name: 'Workation',
		type: 'dropdown',
		children: workationPageChildMenus,
	},
	{
		id: ncNanoId(),
		href: '/listing-experiences-detail',
		// name: 'Other pages',
		name: 'HOI Trips',
		// type: 'dropdown',
		// children: templatesChildrenMenus,
	},
	{
		id: ncNanoId(),
		href: '/blog',
		// name: 'Other pages',
		name: 'Blog',
		// type: 'dropdown',
		// children: otherPageChildMenus,
	},
	{
		id: ncNanoId(),
		href: '/contact',
		name: 'Contact Us',
		// type: 'megaMenu',
		// megaMenu: megaMenuDemo,
	},
]

export const NAVIGATION_DEMO_2: NavItemType[] = [
	{
		id: ncNanoId(),
		href: '/',
		name: 'Home',
		type: 'dropdown',
		children: demoChildMenus,
		isNew: true,
	},

	//
	{
		id: ncNanoId(),
		href: '/listing-stay',
		name: 'Listing pages',
		children: [
			{ id: ncNanoId(), href: '/listing-stay', name: 'Stay listings' },
			{
				id: ncNanoId(),
				href: '/listing-stay-map',
				name: 'Stay listings (map)',
			},
			{ id: ncNanoId(), href: '/listing-stay-detail', name: 'Stay detail' },

			//
			{
				id: ncNanoId(),
				href: '/listing-experiences',
				name: 'Experiences listings',
			},
			{
				id: ncNanoId(),
				href: '/listing-experiences-map',
				name: 'Experiences (map)',
			},
			{
				id: ncNanoId(),
				href: '/listing-experiences-detail',
				name: 'Experiences detail',
			},
		],
	},
	{
		id: ncNanoId(),
		href: '/listing-car',
		name: 'Listing pages',
		children: [
			{ id: ncNanoId(), href: '/listing-car', name: 'Cars listings' },
			{ id: ncNanoId(), href: '/listing-car-map', name: 'Cars listings (map)' },
			{ id: ncNanoId(), href: '/listing-car-detail', name: 'Car detail' },

			//
			{
				id: ncNanoId(),
				href: '/listing-real-estate',
				name: 'Real estate listings',
			},
			{
				id: ncNanoId(),
				href: '/listing-real-estate-map',
				name: 'Real estate (map)',
			},
			//
			{
				id: ncNanoId(),
				href: '/listing-flights',
				name: 'Flights listings',
			},
		],
	},

	//
	{
		id: ncNanoId(),
		href: '/author',
		name: 'Templates',
		type: 'dropdown',
		children: templatesChildrenMenus,
	},

	//
	{
		id: ncNanoId(),
		href: '/blog',
		name: 'Other pages',
		type: 'dropdown',
		children: otherPageChildMenus,
	},
]
