"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

// React Icons
import { AiOutlineAppstoreAdd, AiOutlineHeart } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { LuBookmark, LuBuilding, LuUserCog } from "react-icons/lu";
import {
  MdOutlineAddHome,
  MdOutlineAddHomeWork,
  MdOutlineContactPage,
  MdOutlineInsights,
  MdOutlineLocalActivity,
  MdOutlinePayment,
} from "react-icons/md";
import {
  TbBuildingCog,
  TbFilterCog,
  TbFolderCog,
  TbHelpSquareRounded,
  TbLocationCog,
  TbMoneybag,
  TbReportSearch,
} from "react-icons/tb";
import { VscCircle } from "react-icons/vsc";

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const pathname = usePathname();

  const Option = ({
    icon: Icon,
    label,
    link,
    badge,
  }: {
    icon?: React.ElementType;
    label: string;
    link?: string;
    badge?: boolean | string;
  }) => (
    <Link
      href={link || "#"}
      onClick={() => {
        if (window.innerWidth < 1024) {
          setIsSidebarOpen(false);
        }
      }}
      className={`w-full px-6 sm:px-8 py-2 flex items-center gap-2 transition ease-in duration-300 ${
        pathname === link ? "text-primary" : "hover:bg-white/10"
      }`}
    >
      {Icon ? (
        <Icon size={20} className="shrink-0" />
      ) : (
        <VscCircle size={20} className="shrink-0" />
      )}
      <h6 className="w-full text-xs font-semibold capitalize line-clamp-1">
        {label}
      </h6>
      {badge ? (
        <div className="shrink-0 shadow-md px-2 py-1 rounded-full bg-primary text-white flex items-center justify-center gap-1">
          <h6 className="text-[8px] capitalize">
            {typeof badge === "string" ? badge : ""}
          </h6>
        </div>
      ) : (
        <>
          {pathname === link && (
            <div className="p-1 mr-1 rounded-full bg-primary shrink-0 shadow-md" />
          )}
        </>
      )}
    </Link>
  );

  const Group = ({
    icon: Icon,
    label,
    options = [],
  }: {
    icon?: React.ElementType;
    label: string;
    options: {
      icon?: React.ElementType;
      label: string;
      link?: string;
      badge?: boolean | string;
    }[];
  }) => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [userToggled, setUserToggled] = useState(false);
    useEffect(() => {
      if (!userToggled) {
        const match = options.some((option) => option.link === pathname);
        if (match) setIsOpen(true);
      }
    }, [pathname, options, userToggled]);
    const handleToggle = () => {
      setIsOpen((prev) => !prev);
      setUserToggled(true);
    };
    return (
      <>
        <div
          onClick={handleToggle}
          className="w-full px-6 sm:px-8 py-2 flex items-center gap-2 focus:outline-none cursor-pointer hover:bg-white/10 transition ease-in duration-300"
        >
          {Icon ? (
            <Icon size={20} className="shrink-0" />
          ) : (
            <VscCircle size={20} className="shrink-0" />
          )}
          <h6 className="w-full text-xs font-semibold capitalize line-clamp-1 text-left">
            {label}
          </h6>
          <IoIosArrowDown
            size={16}
            className={`shrink-0 transform transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-[999px]" : "max-h-0"
          }`}
        >
          <div className="flex flex-col">
            {options
              .sort((a, b) => a.label.localeCompare(b.label))
              .map((option, index) => {
                const OptionIcon = option.icon;
                const isActive = pathname === option.link;
                return (
                  <Link
                    href={option.link || "#"}
                    key={index}
                    onClick={() => {
                      if (window.innerWidth < 1024) {
                        setIsSidebarOpen(false);
                      }
                    }}
                    className={`w-full pr-4 sm:pr-8 pl-8 sm:pl-10 flex items-center gap-2 transition ease-in duration-300 ${
                      isActive ? "text-primary" : "hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`h-9 border shadow-md ${
                          isActive ? "border-primary" : "border-gray-400"
                        }`}
                      ></div>
                      <div
                        className={`w-6 border shadow-md ${
                          isActive ? "border-primary" : "border-gray-400"
                        }`}
                      ></div>
                      <div
                        className={`p-1 rounded-full shadow-md ${
                          isActive ? "bg-primary" : "bg-gray-400"
                        }`}
                      ></div>
                    </div>
                    {OptionIcon ? (
                      <OptionIcon size={20} className="shrink-0" />
                    ) : (
                      <VscCircle size={20} className="shrink-0" />
                    )}
                    <h6 className="w-full text-xs font-semibold capitalize line-clamp-1">
                      {option.label}
                    </h6>
                    {option.badge && (
                      <div className="shrink-0 shadow-md px-2 py-1 rounded-full bg-primary text-white flex items-center justify-center gap-1">
                        <h6 className="text-[8px] capitalize">
                          {typeof option.badge === "string" ? option.badge : ""}
                        </h6>
                      </div>
                    )}
                  </Link>
                );
              })}
          </div>
        </div>
      </>
    );
  };

  const Category = ({
    label,
    children,
  }: {
    label: string;
    children: React.ReactNode;
  }) => (
    <div className="w-full flex flex-col">
      <h5 className="text-[11px] text-gray-400 font-semibold capitalize px-6 py-2 sm:px-8">
        {label}
      </h5>
      <div className="w-full flex flex-col">{children}</div>
    </div>
  );

  return (
    <div
      className={`z-10 pb-20 sm:pb-0 fixed top-0 w-72 h-[calc(100vh-0px)] bg-[#242424] text-white lg:border-r border-white/10 shadow-lg overflow-y-scroll scrollbar-hidden py-4 shrink-0 transition-transform duration-300 transform
    ${isSidebarOpen ? "translate-x-0 border-r" : "-translate-x-full"}
    lg:translate-x-0
  `}
    >
      <Category label="general">
        <Option
          icon={AiOutlineAppstoreAdd}
          label="(CRM) dashboard"
          link="/"
        />
        <Option icon={LuUserCog} label="profile" link="/dashboard/profile" />
        <Group
          icon={TbFolderCog}
          label="preferences"
          options={[
            {
              label: "property filters",
              icon: TbBuildingCog,
            },
            {
              label: "project filters",
              icon: TbFilterCog,
              // link: "/dashboard",
            },
            {
              label: "location filters",
              icon: TbLocationCog,
            },
          ]}
        />
      </Category>
      <Category label="dashboard">
        <Option
          icon={MdOutlineInsights}
          label="insights"
          link="/dashboard/insights"
        />
        <Group
          icon={MdOutlineLocalActivity}
          label="my activities"
          options={[
            {
              label: "recent searches",
              icon: TbReportSearch,
            },
            {
              label: "wishlist",
              icon: AiOutlineHeart,
            },
            {
              label: "saved / shortlist",
              icon: LuBookmark,
            },
            {
              label: "contacted",
              icon: MdOutlineContactPage,
            },
          ]}
        />
      </Category>
      <Category label="listings">
        <Option label="my properties" icon={LuBuilding} />
        <Option
          label="add project"
          icon={MdOutlineAddHomeWork}
          link="/project/add-project"
        />
        <Option
          label="add property"
          icon={MdOutlineAddHome}
          link="/property/add-property"
        />
      </Category>
      <Category label="transactions">
        <Option label="payment history" icon={TbMoneybag} />
        <Option label="current plan" icon={MdOutlinePayment} />
        <Option label="help & support" icon={TbHelpSquareRounded} />
      </Category>
    </div>
  );
}
