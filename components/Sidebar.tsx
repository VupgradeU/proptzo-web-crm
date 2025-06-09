"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

// Components
import Avatar from "./reusables/avatars/Avatar";

// React Icons
import {
  AiOutlineAppstoreAdd,
  AiOutlineHeart,
  AiOutlineProject,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosStats } from "react-icons/io";
import { LuBookmark, LuBuilding, LuUserCog } from "react-icons/lu";
import {
  MdDomainDisabled,
  MdFollowTheSigns,
  MdOutlineAddHome,
  MdOutlineAddHomeWork,
  MdOutlineAnalytics,
  MdOutlineAssignmentInd,
  MdOutlineContactPage,
  MdOutlineInsights,
  MdOutlineLeaderboard,
  MdOutlineLocalActivity,
  MdOutlinePayment,
  MdOutlineRecentActors,
} from "react-icons/md";
import {
  TbBuildingCog,
  TbFilterCog,
  TbFolderCog,
  TbHelpSquareRounded,
  TbLocationCog,
  TbMoneybag,
  TbPackageImport,
  TbReportSearch,
  TbSubtask,
  TbTimelineEventText,
} from "react-icons/tb";
import { VscCircle, VscFileMedia } from "react-icons/vsc";
import { SiCivicrm, SiGoogleadsense } from "react-icons/si";
import { CgPerformance } from "react-icons/cg";
import { TiGroupOutline } from "react-icons/ti";
import { BiTask } from "react-icons/bi";
import { GrSchedulePlay } from "react-icons/gr";
import { SlCalender } from "react-icons/sl";
import { PiMicrosoftTeamsLogoDuotone } from "react-icons/pi";

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

  const User = ({
    img,
    name,
    userType,
  }: {
    img?: string;
    name?: string;
    userType?: string;
  }) => (
    <div className="w-full bg-white/10 px-6 py-2 sm:px-8 flex items-center justify-start gap-2">
      <Avatar alt={name} img={img} />
      <div className="w-full flex flex-col items-start">
        <h6 className="text-sm font-semibold capitalize w-full line-clamp-1">
          {name}
        </h6>
        <h6 className="text-xs font-semibold capitalize w-full line-clamp-1 text-gray-400">
          {userType}
        </h6>
      </div>
      <h6 className="text-xs font-semibold capitalize text-primary shrink-0 underline cursor-pointer">
        sign out
      </h6>
    </div>
  );

  return (
    <div
      className={`z-10 pb-20 sm:pb-10 fixed top-0 w-72 h-[calc(100vh-0px)] bg-[#242424] text-white lg:border-r border-white/10 shadow-lg overflow-y-scroll scrollbar-hidden py-4 shrink-0 transition-transform duration-300 transform
    ${isSidebarOpen ? "translate-x-0 border-r" : "-translate-x-full"}
    lg:translate-x-0
  `}
    >
      <Category label="session info">
        <User name="gurdeep singh" userType="builder" />
      </Category>
      <Category label="general">
        <Option icon={AiOutlineAppstoreAdd} label="(CRM) dashboard" link="/" />
        <Option icon={LuUserCog} label="profile" link="/dashboard/profile" />
      </Category>
      <Category label="dashboard">
        <Option
          icon={PiMicrosoftTeamsLogoDuotone}
          label="team performance"
          link="/dashboard/insights"
        />
        <Option
          icon={MdOutlineAnalytics}
          label="project sales analytics"
          link="/dashboard/insights"
        />
        <Group
          icon={IoIosStats}
          label="qucik stats"
          options={[
            {
              label: "active projects",
              icon: AiOutlineProject,
            },
            {
              label: "leads",
              icon: MdOutlineLeaderboard,
            },
            {
              label: "follow-ups today",
              icon: MdFollowTheSigns,
            },
            {
              label: "performance graphs",
              icon: CgPerformance,
            },
          ]}
        />
        <Option label="unread inquiries" icon={TiGroupOutline} />
        <Option label="recent bookings" icon={MdOutlineRecentActors} />
        <Option label="overdue tasks" icon={TbSubtask} />
      </Category>
      <Category label="listings">
        <Group
          icon={LuBuilding}
          label="my properties"
          options={[
            {
              label: "view / edit",
            },
            {
              label: "add new property",
              icon: MdOutlineAddHome,
            },
          ]}
        />
        <Group
          label="my projects"
          icon={AiOutlineProject}
          options={[
            {
              label: "view / edit",
            },
            {
              label: "add new project",
              icon: MdOutlineAddHomeWork,
            },
          ]}
        />
        <Option label="units management" icon={MdDomainDisabled} />
        <Option label="documents & media" icon={VscFileMedia} />
      </Category>
      <Category label="leads management">
        <Option label="all leads" icon={MdOutlineLeaderboard} />
        <Option label="lead assignment" icon={MdOutlineAssignmentInd} />
        <Option label="lead activity timeline" icon={TbTimelineEventText} />
        <Option label="lead import" icon={TbPackageImport} />
      </Category>
      <Category label="follow-ups / tasks">
        <Option label="my tasks" icon={BiTask} />
        <Option label="follow-up scheduler" icon={GrSchedulePlay} />
        <Option label="calender view" icon={SlCalender} />
      </Category>
      <Category label="settings">
        <Option label="CRM branding" icon={SiCivicrm} />
      </Category>
    </div>
  );
}
