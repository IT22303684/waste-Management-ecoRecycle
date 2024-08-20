import {
	HiOutlineViewGrid,
	HiArrowNarrowDown,
	HiOfficeBuilding ,
	HiOutlineUsers,
	HiOutlineDocumentText,
	HiTruck,
	HiOutlineLocationMarker ,
	HiOutlineQuestionMarkCircle,
	HiCube
} from 'react-icons/hi'

export const ADMIN_DASHBOARD_SIDEBAR_UPPER_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/admin',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'request',
		label: 'Request',
		path: '/admin/request',
		icon: <HiArrowNarrowDown  />
	},
	{
		key: 'route',
		label: 'Route',
		path: '/admin/route',
		icon: <HiOutlineLocationMarker   />
	},
	{
		key: 'staf',
		label: 'Staf',
		path: '/admin/staf',
		icon: <HiOutlineUsers />
	},
	{
		key: 'company',
		label: 'Company',
		path: '/admin/company',
		icon: <HiOfficeBuilding  />
	},
	{
		key: 'item',
		label: 'Item',
		path: '/admin/item',
		icon: <HiCube  />
	},
	{
		key: 'transactions',
		label: 'Transactions',
		path: '/admin/transaction',
		icon: <HiOutlineDocumentText />
	},
	{
		key: 'vehicle',
		label: 'Vehicle',
		path: '/admin/vehicle',
		icon: <HiTruck />
	}
]

export const ADMIN_DASHBOARD_SIDEBAR_BOTTOM_LINKS = [

	{
		key: 'support',
		label: 'Help & Support',
		path: '/admin/support',
		icon: <HiOutlineQuestionMarkCircle />
	}
]