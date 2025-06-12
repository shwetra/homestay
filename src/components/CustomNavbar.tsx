import React, { useState } from 'react';
import { IoMdMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { IoChevronDownOutline } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import { useImages } from '@/app/contextApi/ImageContext';

interface SubSubmenu {
  id: number;
  name: string;
  url: string;
  status: number;
  parentmenuid: number;
}

interface Submenu {
  id: number;
  name: string;
  menuid: number;
  url: string;
  status: number;
  created_at: string;
  deleted_at: string;
  subsubmenus: SubSubmenu[];
}

interface MenuItem {
  id: number;
  name: string;
  url: string;
  status: number;
  created_at: string;
  deleted_at: string;
  submenu: Submenu[];
}

const CustomNavbar = ({ data }: { data: MenuItem[] }) => {
  const { isOpen, setIsOpen } = useImages();
  const [activeMenus, setActiveMenus] = useState<number[]>([]);
  const [activeSubMenus, setActiveSubMenus] = useState<number[]>([]);

  const router = useRouter()

  const toggleMenu = (id: number) => {
    if (activeMenus.includes(id)) {
      setActiveMenus(activeMenus.filter(menuId => menuId !== id));
    } else {
      setActiveMenus([...activeMenus, id]);
    }
  };

  const handlePush = (url: any) => {
    router.push(url)
  }

  const toggleSubMenu = (id: number, event: React.MouseEvent) => {
    event.preventDefault();
    if (activeSubMenus.includes(id)) {
      setActiveSubMenus(activeSubMenus.filter(menuId => menuId !== id));
    } else {
      setActiveSubMenus([...activeSubMenus, id]);
    }
  };

  const buildPath = (item: any, parentName: string): string => {
    if (item && parentName) {
      // Merge the parent menu name (remove spaces, lowercase)
      const mergedParent = parentName.toLowerCase();
      return `/listing-stay/${mergedParent}/${item.url}`;
    }
    return "/";
  };



  return (
    <nav className="bg-white w-full dark:bg-[#111827]">
      <div className="w-full mx-auto px-4">
        <div className="flex justify-center items-center">

          {/* Mobile menu button */}
          {/* <div className="md:hidden bg-white flex justify-end">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <RxCross1 size={24} /> : ""}
            </button>
          </div> */}

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center">
            {data.map((item) => (
              <div key={item.id} className="relative group">
                <div
                  className="flex items-center px-5 py-2 text-gray-700 hover:text-gray-900 cursor-pointer dark:text-white"
                  // onClick={() => { item.url && handlePush(item.url) ,toggleMenu(item.id)}}
                  onClick={() => {
                    if (item.submenu.length > 0) {
                      toggleMenu(item.id)
                    } else {
                      handlePush(item.url)
                    }
                  }
                  }
                >
                  {item.name}
                  {item.submenu.length > 0 && (
                    <IoChevronDownOutline size={16} className="ml-1" />
                  )}
                </div>

                {item.submenu.length > 0 && (
                  <div className="absolute left-0 mt-0 w-48 bg-white dark:bg-[#111827] rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 ease-in-out z-50">
                    {item.submenu.map((subItem) => (
                      <div key={subItem.id} className="relative group/sub">
                        <a
                          href={
                            subItem.subsubmenus?.length > 0 ? 'javascript:void(0)' : buildPath(subItem, item.url)
                          }
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-white dark:hover:bg-gray-800"
                        >
                          <span className="flex items-center justify-between">
                            {subItem.name}
                            {subItem.subsubmenus?.length > 0 && (
                              <IoChevronDownOutline size={14} className="ml-2 -rotate-90" />
                            )}
                          </span>
                        </a>

                        {subItem.subsubmenus?.length > 0 && (
                          <div className="absolute left-full top-0 mt-0 w-48 bg-white dark:bg-[#111827] rounded-md shadow-lg opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-150 ease-in-out">
                            {subItem.subsubmenus.map((subSubItem) => (
                              <a
                                key={subSubItem.id}
                                // href={`/${subSubItem.url}`}
                                href={buildPath(subSubItem, item.url)}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-white dark:hover:bg-gray-800"
                              >
                                {subSubItem.name}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className={`md:hidden duration-500 h-full fixed ${isOpen ? 'right-0' : 'right-[-100%]'} top-[4.6rem] w-full bg-white`}>
            <div className="md:hidden flex justify-between m-2">
              <a
                href='/add-listing/1'
                className="text-white hover:text-gray-900 focus:outline-none bg-gray-600 px-4 py-1 rounded-full"
              >
                List My Homestay
              </a>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                {isOpen ? <RxCross1 size={24} /> : ""}
              </button>
            </div>
            {data.map((item) => (
              <div key={item.id}>
                <div
                  className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer border-t"
                  // onClick={() => toggleMenu(item.id)}
                  onClick={() => {
                    if (item.submenu.length > 0) {
                      toggleMenu(item.id)
                    } else {
                      handlePush(item.url)
                      setIsOpen(false)
                    }
                  }
                  }
                >
                  <span>{item.name}</span>
                  {item.submenu.length > 0 && (
                    <IoChevronDownOutline
                      size={16}
                      className={`transform transition-transform duration-200 ${activeMenus.includes(item.id) ? 'rotate-180' : ''
                        }`}
                    />
                  )}
                </div>

                {activeMenus.includes(item.id) && item.submenu.length > 0 && (
                  <div className="bg-gray-50">
                    {item.submenu.map((subItem) => (
                      <div key={subItem.id}>
                        <div
                          className="flex items-center justify-between px-6 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                          onClick={(e) => toggleSubMenu(subItem.id, e)}
                        >
                          <a
                            href={
                              subItem.subsubmenus?.length > 0 ? 'javascript:void(0)' : buildPath(subItem, item.name)
                            }
                            // href={`/${subItem.url}`}
                            className="flex-grow"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {subItem.name}
                          </a>
                          {subItem.subsubmenus?.length > 0 && (
                            <IoChevronDownOutline
                              size={14}
                              className={`transform transition-transform duration-200 ${activeSubMenus.includes(subItem.id) ? 'rotate-180' : ''
                                }`}
                            />
                          )}
                        </div>
                        {activeSubMenus.includes(subItem.id) && subItem.subsubmenus?.length > 0 && (
                          <div className="bg-gray-100">
                            {subItem.subsubmenus.map((subSubItem) => (
                              <a
                                key={subSubItem.id}
                                href={buildPath(subSubItem, item.name)}
                                // href={`/${subSubItem.url}`}
                                className="block px-8 py-2 text-sm text-gray-700 hover:bg-gray-200"
                              >
                                {subSubItem.name}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

          </div>
        )}
      </div>
    </nav>
  );
};

export default CustomNavbar;