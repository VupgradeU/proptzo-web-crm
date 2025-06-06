"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Components
import Sidebar from "@/components/Sidebar";

// React Icons
import { TbHomeHand } from "react-icons/tb";
import { IoIosArrowForward } from "react-icons/io";
import { CgMenuLeft } from "react-icons/cg";

const Option = ({
  icon: Icon,
  label,
  link,
  onClick,
  badge,
  textColor,
}: {
  icon?: React.ElementType;
  label?: string;
  link?: string;
  onClick?: () => void;
  badge?: boolean | string;
  textColor?: string;
}) => (
  <Link
    href={link || "#"}
    onClick={onClick}
    className={`flex items-center justify-center gap-1 cursor-pointer text-${textColor} hover:text-primary transition ease-in duration-300`}
  >
    {Icon && <Icon size={20} />}
    {label && <h6 className="text-xs font-semibold capitalize">{label}</h6>}
    {badge && (
      <div className="shadow-sm mb-4 -ml-1 px-2 py-1 rounded-full bg-primary text-white flex items-center justify-center gap-1">
        <h6 className="text-[8px] capitalize">
          {typeof badge === "string" ? badge : ""}
        </h6>
      </div>
    )}
  </Link>
);

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const pathSegments = pathname.split("/").filter(Boolean);
  const buildPath = (index: number) =>
    "/" + pathSegments.slice(0, index + 1).join("/");

  return (
    <div className="flex items-start justify-start bg-background">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setSidebarOpen}
      />
      <main className="w-full mb-16 sm:mb-0 lg:ml-72">
        <div className="flex flex-col gap-3">
          <nav
            aria-label="breadcrumb"
            className="px-6 sm:px-8 pt-6 w-full flex flex-wrap items-center justify-start gap-1 text-gray-500"
          >
            <div className="lg:hidden mr-2">
              <Option
                icon={CgMenuLeft}
                onClick={() => setSidebarOpen((prev) => !prev)}
              />
            </div>
            <div className="flex items-center gap-1 transition ease-in duration-300 hover:text-black dark:hover:text-white cursor-pointer">
              <TbHomeHand size={16} />
              <Link href="/" className="text-xs font-semibold capitalize">
                Home
              </Link>
            </div>
            <IoIosArrowForward size={14} />
            {pathSegments.map((segment, index) => {
              const isLast = index === pathSegments.length - 1;
              return (
                <div key={index} className="flex items-center gap-1">
                  {index > 0 && <IoIosArrowForward size={14} />}
                  <Link
                    href={buildPath(index)}
                    className={`text-xs font-semibold capitalize transition ease-in duration-300 ${
                      isLast
                        ? "text-primary cursor-default"
                        : "hover:text-black dark:hover:text-white"
                    }`}
                  >
                    {segment.replace(/-/g, " ")}
                  </Link>
                </div>
              );
            })}
          </nav>
          <section className="w-full min-h-screen px-6 sm:px-8 py-6">
            {children}
          </section>
        </div>
      </main>
    </div>
  );
}
