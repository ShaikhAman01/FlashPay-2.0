import { ArrowsRightLeftIcon, ArrowUpRightIcon, ClockIcon, HomeIcon, HomeModernIcon } from "@heroicons/react/24/solid";
import { SidebarItem } from "../../components/SidebarItem";

export default function Layout({
    children,
  }: {
    children: React.ReactNode;
  }): JSX.Element {
    return (
      <div className="flex">
          <div className="w-72 border-r border-slate-300 min-h-screen mr-4 pt-28">
              <div>
                  <SidebarItem href={"/dashboard"} icon={<HomeIcon className="h-6 w-6"/>} title="Home" />
                  <SidebarItem href={"/transfer"} icon={<ArrowsRightLeftIcon className="h-6 w-6" />} title="Transfer" />
                  <SidebarItem href={"/transactions"} icon={<ClockIcon className="h-6 w-6" />} title="Transactions" />
                  <SidebarItem href={"/p2p"} icon={<ArrowUpRightIcon className="h-6 w-6" />} title="P2P Transfer" />
              </div>
          </div>
              {children}
      </div>
    );
  }