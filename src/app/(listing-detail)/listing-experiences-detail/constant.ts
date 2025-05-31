import { ListingGalleryImage } from "@/components/listing-image-gallery/utils/types";

export const PHOTOS: string[] = [
  "https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  "https://images.pexels.com/photos/1154638/pexels-photo-1154638.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  "https://images.pexels.com/photos/3851949/pexels-photo-3851949.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/3019019/pexels-photo-3019019.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  "https://images.pexels.com/photos/6438752/pexels-photo-6438752.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/1320686/pexels-photo-1320686.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/261394/pexels-photo-261394.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/2861361/pexels-photo-2861361.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/2677398/pexels-photo-2677398.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/4348078/pexels-photo-4348078.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/4706134/pexels-photo-4706134.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/3825578/pexels-photo-3825578.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/123335/pexels-photo-123335.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/3761124/pexels-photo-3761124.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/8926846/pexels-photo-8926846.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/4706139/pexels-photo-4706139.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/7003624/pexels-photo-7003624.jpeg?auto=compress&cs=tinysrgb&w=1600",
];

export const includes_demo = [
  { name: "5 Night/6 Day Accommodation " },
  { name: "Breakfast & Dinner" },
  { name: "Private car with a trained local driver" },
  { name: "Required Permits and Permissions" },
  { name: "Applicable Taxes" },
];

export const excludes_demo = [
  { name: "Expenses incurred due to anything beyond our control like natural disaster, political insurgencies etc." },
  { name: "Monuments Entrances Fee" },
  { name: "Personal expenses like laundry, tips to the staff and driver etc. Any extra meal, soft drink or beverage ordered." },
  { name: "Anything not mentioned in inclusions" },
];

export const imageGallery: ListingGalleryImage[] = PHOTOS.map((item, index) => ({
  id: index,
  url: {
    image_url: item,
  }
}));

