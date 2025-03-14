"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { name: "Caisse", href: "/admin/orders" },
  { name: "Adhérents", href: "/admin/members" },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 sm:hidden">
        <select
          defaultValue={
            tabs.find((tab) => pathname.startsWith(tab.href))?.name ||
            tabs[0].name
          }
          onChange={(e) => {
            const tab = tabs.find((tab) => tab.name === e.target.value);
            if (tab) window.location.href = tab.href;
          }}
          aria-label="Select a tab"
          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className="pointer-events-none col-start-1 row-start-1 mr-2 h-5 w-5 self-center justify-self-end fill-gray-500"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav aria-label="Tabs" className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const isCurrent = pathname.startsWith(tab.href);
              return (
                <Link
                  key={tab.name}
                  href={tab.href}
                  aria-current={isCurrent ? "page" : undefined}
                  className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${
                    isCurrent
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  {tab.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
