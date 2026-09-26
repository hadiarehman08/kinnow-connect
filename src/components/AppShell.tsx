import { Link, useRouterState } from "@tanstack/react-router";
import { Home, PackageOpen, ClipboardList, Sparkles, MessageCircle, UserRound, Bell, HandCoins } from "lucide-react";
import { Brand, DemoNote } from "./ui";
import { useMarketplace } from "@/lib/marketplace";
import type { ReactNode } from "react";

export function AppShell({children}:{children:ReactNode}){
  const {role,conversations,offers}=useMarketplace();
  const path=useRouterState({select:s=>s.location.pathname});
  if(!role) return <>{children}</>;
  const grower=role==="grower";
  const nav=[
    {to:"/",label:"Home",icon:Home},
    {to:"/lots",label:grower?"My Lots":"Find Lots",icon:PackageOpen},
    {to:"/requirements",label:grower?"Buyer Needs":"Requirements",icon:ClipboardList},
    {to:"/matches",label:"Matches",icon:Sparkles},
    {to:"/messages",label:"Messages",icon:MessageCircle},
    {to:"/profile",label:"Profile",icon:UserRound},
  ];
  return <div className="app-layout">
    <aside className="sidebar"><Brand/><div className={`role-chip ${role}`}>{grower?"Grower workspace":"Buyer workspace"}</div><nav>{nav.map(({to,label,icon:Icon})=><Link key={to} to={to} className={path===to?"active":""}><Icon/><span>{label}</span></Link>)}</nav><Link to="/offers" className={`offers-link ${path==="/offers"?"active":""}`}><HandCoins/><span>Offers</span><b>{offers.filter(x=>x.status==="Pending").length}</b></Link><DemoNote/></aside>
    <div className="app-main"><header className="topbar"><Brand compact/><div><Link to="/offers" aria-label="Offers"><HandCoins/></Link><button aria-label="Notifications"><Bell/>{conversations.some(c=>c.unread)&&<i/>}</button><Link to="/profile" className="avatar">RN</Link></div></header><main>{children}</main></div>
    <nav className="bottom-nav">{nav.map(({to,label,icon:Icon})=><Link key={to} to={to} className={path===to?"active":""}><Icon/><span>{label}</span></Link>)}</nav>
  </div>;
}