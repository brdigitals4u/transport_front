import React, { useEffect, useState } from "react";
import { useSidebar } from "../context/SidebarContext";
import { ChevronDownIcon } from "../icons";
import { getItem } from "../utils/storage";
import { Menus } from "../menu/menu";
import { Link, useLocation } from "react-router";

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation(); // Get current route
  const [dropdownNumber, setDropdownNumber] = useState<number | null>(null);
  const [menusItems, setMenusItems] = useState<any[]>([]);
  const user = getItem("user");

  useEffect(() => {
    if (user) {
      const userrole = user?.user?.role;
      const getMenus = Menus.filter((item) => item.role.includes(userrole));
      setMenusItems(getMenus);
    }
  }, []);

  const handleDrop = (index: number) => {
    setDropdownNumber((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".dropdown-container")) {
        setDropdownNumber(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-indigo-50 dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
              ? "w-[290px]"
              : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-4 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <img
                className="dark:hidden"
                src="/images/logo/tms-light.svg"
                alt="Logo"
                width={106}
                height={40}
              />
              <img
                className="hidden dark:block"
                src="/images/logo/tms-dark.svg"
                alt="Logo"
                width={106}
                height={40}
              />
            </>
          ) : (
            <img
              src="/images/logo/tms-icon.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>

      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="mb-4 text-xs uppercase flex leading-[20px] text-gray-400">
                Menu
              </h2>
              <ul className="flex flex-col gap-4">
                {menusItems.map((items, index) => {
                  const { name, path, icon: Icon, subItems } = items;
                  const isActiveParent =
                    location.pathname.startsWith(path) ||
                    dropdownNumber === index;

                  return (
                    <li key={index} className="dropdown-container relative">
                      {subItems && subItems.length > 0 ? (
                        <>
                          <button
                            className={`menu-item group ${
                              isActiveParent ? "bg-indigo-500 text-white" : ""
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDrop(index);
                            }}
                          >
                            <span>
                              <Icon />
                            </span>
                            <span className="menu-item-text">{name}</span>
                            <ChevronDownIcon
                              className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                                isActiveParent ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          {dropdownNumber === index && (
                            <div className="overflow-hidden transition-all duration-300">
                              <ul className="mt-2 space-y-1 ml-9">
                                {subItems.map(
                                  (subItem: any, subIndex: number) => {
                                    const isActiveSub =
                                      location.pathname === subItem.path;

                                    return (
                                      <li key={subIndex}>
                                        <Link
                                          to={subItem.path}
                                          className={`menu-dropdown-item ${
                                            isActiveSub
                                              ? "text-indigo-500 font-semibold"
                                              : ""
                                          }`}
                                        >
                                          {subItem.name}
                                        </Link>
                                      </li>
                                    );
                                  },
                                )}
                              </ul>
                            </div>
                          )}
                        </>
                      ) : (
                        <Link
                          to={path}
                          className={`menu-item group ${
                            location.pathname === path
                              ? "bg-indigo-500 text-white"
                              : ""
                          }`}
                        >
                          <span className="menu-item-icon-inactive">
                            <Icon />
                          </span>
                          <span>{name}</span>
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
