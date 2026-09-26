import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sprout, ShoppingBasket, PackageOpen, Sparkles, HandCoins, MessageCircle, type LucideIcon } from "lucide-react";
import { useMarketplace } from "@/lib/marketplace";
import { Brand, DemoNote, LinkButton, LotCard, PageHeader, RequirementCard } from "@/components/ui";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head:()=>({meta:[{title:"KinnowLink — Citrus marketplace demo"},{name:"description",content:"Explore a local demo marketplace for citrus growers and buyers."},{property:"og:title",content:"KinnowLink — Citrus marketplace demo"},{property:"og:description",content:"List produce, publish sourcing needs, and discover transparent matches."},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary_large_image"}]}),
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  const data=useMarketplace();
  if(!data.role) return <Welcome/>;
  const grower=data.role==="grower";
  const ownLots=data.lots.filter(x=>x.grower===data.profile.business);
  const ownReqs=data.requirements.filter(x=>x.buyer===data.profile.business);
  const stats: [string,number,LucideIcon][]=grower?[["Active lots",ownLots.filter(x=>x.status==="Active").length,PackageOpen],["New matches",data.requirements.filter(x=>x.status==="Active").length,Sparkles],["Incoming offers",data.offers.filter(x=>x.senderRole==="buyer"&&x.status==="Pending").length,HandCoins],["Unread",data.conversations.filter(x=>x.unread).length,MessageCircle]]:[["Saved lots",data.saved.length,PackageOpen],["Active needs",ownReqs.filter(x=>x.status==="Active").length,Sparkles],["Active offers",data.offers.filter(x=>x.status==="Pending").length,HandCoins],["Unread",data.conversations.filter(x=>x.unread).length,MessageCircle]];
  return <div className="page"><PageHeader eyebrow={`${grower?"Grower":"Buyer"} home`} title={`Good afternoon, ${data.profile.name.split(" ")[0]}`} copy={grower?"Your orchard opportunities, all in one place.":"Fresh opportunities matched to what you source."} action={<LinkButton to={grower?"/lots/new":"/lots"}>{grower?"Post a lot":"Find lots"}</LinkButton>}/><DemoNote/>
    <section className="stat-grid">{stats.map(([label,value,Icon])=><article key={String(label)}><Icon size={20}/><strong>{String(value)}</strong><span>{String(label)}</span></article>)}</section>
    <section className="dashboard-grid"><div><div className="section-heading"><div><p className="eyebrow">RECOMMENDED</p><h2>{grower?"Buyer needs for your harvest":"Fresh lots for your requirement"}</h2></div><Link to="/matches">See matches <ArrowRight/></Link></div>{grower?(data.requirements[0]?<RequirementCard item={data.requirements[0]}/>:null):(data.lots[0]?<LotCard lot={data.lots[0]}/>:null)}</div>
    <aside className="next-steps"><p className="eyebrow">YOUR NEXT STEPS</p><h2>Keep business moving</h2><Link to={grower?"/lots/new":"/requirements/new"}>{grower?"Add your next harvest lot":"Post a sourcing requirement"}<ArrowRight/></Link><Link to="/offers">Review open offers<ArrowRight/></Link><Link to="/messages">Continue conversations<ArrowRight/></Link></aside></section>
  </div>;
}

function Welcome(){const {setRole}=useMarketplace();return <div className="welcome"><div className="citrus citrus-a"/><div className="citrus citrus-b"/><div className="leaf-shape"/><main className="welcome-glass"><Brand/><p className="eyebrow">CITRUS, DIRECT FROM THE ORCHARD</p><h1>Where kinnow growers and buyers <em>find each other.</em></h1><p className="welcome-copy">List available produce or publish sourcing needs, discover relevant fits, and agree terms—all in one local demo.</p><DemoNote>This prototype uses fictional records. No action reaches a real marketplace.</DemoNote><h2>How will you use KinnowLink?</h2><div className="role-grid"><button className="role-card grower" onClick={()=>setRole("grower")}><span><Sprout/></span><div><h3>I’m a Grower</h3><p>List kinnow lots and connect with buyers.</p></div><i><ArrowRight/></i></button><button className="role-card buyer" onClick={()=>setRole("buyer")}><span><ShoppingBasket/></span><div><h3>I’m a Buyer</h3><p>Discover produce and post sourcing needs.</p></div><i><ArrowRight/></i></button></div></main></div>}
