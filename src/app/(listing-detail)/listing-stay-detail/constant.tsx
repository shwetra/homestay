import {
	Bathtub02Icon,
	BodySoapIcon,
	CableCarIcon,
	CctvCameraIcon,
	HairDryerIcon,
	ShampooIcon,
	Speaker01Icon,
	TvSmartIcon,
	VirtualRealityVr01Icon,
	WaterEnergyIcon,
	WaterPoloIcon,
	Wifi01Icon,
} from '@/components/Icons'
import type { SVGProps, ReactElement } from "react"

import { ListingGalleryImage } from '@/components/listing-image-gallery/utils/types'

export const PHOTOS: string[] = [
	'https://images.pexels.com/photos/6129967/pexels-photo-6129967.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
	'https://images.pexels.com/photos/7163619/pexels-photo-7163619.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	'https://images.pexels.com/photos/6527036/pexels-photo-6527036.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	'https://images.pexels.com/photos/6969831/pexels-photo-6969831.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	'https://images.pexels.com/photos/6438752/pexels-photo-6438752.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	'https://images.pexels.com/photos/1320686/pexels-photo-1320686.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	'https://images.pexels.com/photos/261394/pexels-photo-261394.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	'https://images.pexels.com/photos/2861361/pexels-photo-2861361.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	'https://images.pexels.com/photos/2677398/pexels-photo-2677398.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=1600',
	'https://images.pexels.com/photos/914128/pexels-photo-914128.jpeg?auto=compress&cs=tinysrgb&w=1600',
	'https://images.pexels.com/photos/840667/pexels-photo-840667.jpeg?auto=compress&cs=tinysrgb&w=1600',
	'https://images.pexels.com/photos/732632/pexels-photo-732632.jpeg?auto=compress&cs=tinysrgb&w=1600',
	'https://images.pexels.com/photos/450062/pexels-photo-450062.jpeg?auto=compress&cs=tinysrgb&w=1600',
	'https://images.pexels.com/photos/917510/pexels-photo-917510.jpeg?auto=compress&cs=tinysrgb&w=1600',
	'https://images.pexels.com/photos/1194233/pexels-photo-1194233.jpeg?auto=compress&cs=tinysrgb&w=1600',
	'https://images.pexels.com/photos/236973/pexels-photo-236973.jpeg?auto=compress&cs=tinysrgb&w=1600',
	'https://images.pexels.com/photos/1392099/pexels-photo-1392099.jpeg?auto=compress&cs=tinysrgb&w=1600',
	'https://images.pexels.com/photos/547116/pexels-photo-547116.jpeg?auto=compress&cs=tinysrgb&w=1600',
	'https://images.pexels.com/photos/1002272/pexels-photo-1002272.jpeg?auto=compress&cs=tinysrgb&w=1600',
	'https://images.pexels.com/photos/917511/pexels-photo-917511.jpeg?auto=compress&cs=tinysrgb&w=1600',
	'https://images.pexels.com/photos/771079/pexels-photo-771079.jpeg?auto=compress&cs=tinysrgb&w=1600',
	'https://images.pexels.com/photos/13461077/pexels-photo-13461077.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
	'https://images.pexels.com/photos/9074921/pexels-photo-9074921.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
	'https://images.pexels.com/photos/9336042/pexels-photo-9336042.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
	'https://images.pexels.com/photos/5418318/pexels-photo-5418318.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
	'https://images.pexels.com/photos/4815278/pexels-photo-4815278.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
	'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=1600',
]

export const Amenities_demos: {
	name: string
	icon: (props: SVGProps<SVGSVGElement>) => ReactElement
	// icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
}[] = [
	{ name: 'Fast wifi', icon: Wifi01Icon },
	{ name: 'Bathtub', icon: Bathtub02Icon },
	{ name: 'Hair dryer', icon: HairDryerIcon },
	{ name: 'Sound system', icon: Speaker01Icon },
	{ name: 'Shampoo', icon: ShampooIcon },
	{ name: 'Body soap', icon: BodySoapIcon },
	{ name: 'Water Energy ', icon: WaterEnergyIcon },
	{ name: 'Water Polo', icon: WaterPoloIcon },
	{ name: 'Cable Car', icon: CableCarIcon },
	{ name: 'Tv Smart', icon: TvSmartIcon },
	{ name: 'Cctv Camera', icon: CctvCameraIcon },
	{ name: 'Virtual Reality Vr', icon: VirtualRealityVr01Icon },
]

export const imageGallery: ListingGalleryImage[] = [...PHOTOS].map(
	(item, index): ListingGalleryImage => {
	  return {
		id: index,
		url: {
		  image_url: item,       // convert string to expected object
		  message: '',           // optional: leave empty or add your own logic
		},
	  };
	}
  );
  


export const Activities_demos: {
	name: string
}[] = [
	{ name: 'Bird Watching'},
	{ name: 'Reading'},
	{ name: 'City/Village Walk'},
	{ name: 'Forest Walk'},
	{ name: 'Yoga & Meditation'},
	{ name: 'Adventure Sports'},
]

export const Local_attraction_demos: {
	name: string
}[] = [
	{ name: 'Ghandowaa Village (1.8km)'},
	{ name: 'Dev Barnag Temple (2.5km)'},
	{ name: 'Nau Mata Bhagwati'},
	{ name: 'Temple (14km)'},
	{ name: 'Panarsa (28km)'},
]

export const Excursions_attraction_demos: {
	name: string
}[] = [
	{ name: 'Aut (35km)'},
	{ name: 'Banjar (48km)'},
	{ name: 'Pandoh (56km)'},
	{ name: 'Jibhi (65km)'},
	{ name: 'Mandi (70km)'},
]
