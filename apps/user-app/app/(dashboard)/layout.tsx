import { ArrowsRightLeftIcon, ClockIcon, HomeIcon } from "@heroicons/react/16/solid";
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
                  <SidebarItem href={"/dashboard"} icon={<HomeIcon/>} title="Home" />
                  <SidebarItem href={"/transfer"} icon={<ArrowsRightLeftIcon />} title="Transfer" />
                  <SidebarItem href={"/transactions"} icon={<ClockIcon />} title="Transactions" />
              </div>
          </div>
              {children}
      </div>
    );
  }