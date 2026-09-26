import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Role = "grower" | "buyer";
export type Theme = "light" | "dark" | "system";
export type Status = "Draft" | "Active" | "Paused" | "Closed";

export type Lot = {
  id: string; variety: string; quantity: number; unit: string; grade: string;
  location: string; date: string; price: number | undefined; description: string; grower: string;
  status: Status; updated: string;
};
export type Requirement = {
  id: string; variety: string; quantity: number; unit: string; grade: string;
  location: string; date: string; price: number | undefined; description: string; buyer: string;
  status: Status; updated: string;
};
export type Offer = {
  id: string; lotId: string; requirementId: string; senderRole: Role; party: string;
  quantity: number; price: number | undefined; note: string; status: "Pending" | "Accepted" | "Declined" | "Countered" | "Withdrawn"; date: string;
};
export type Conversation = { id: string; party: string; context: string; unread: boolean; messages: { id: string; mine: boolean; text: string; time: string }[] };
type Profile = { name: string; business: string; location: string; phone: string; email: string };
type State = { role: Role | null; lots: Lot[]; requirements: Requirement[]; offers: Offer[]; conversations: Conversation[]; saved: string[]; profile: Profile };

const initial: State = {
  role: null,
  lots: [
    { id:"lot-1", variety:"Kinnow", quantity:18, unit:"tonnes", grade:"A / Export", location:"Sargodha, Punjab", date:"2026-12-08", price:118000, description:"Even-sized fruit from a mature orchard. Waxing and export packing available on request.", grower:"Noor Citrus Farm", status:"Active", updated:"Today" },
    { id:"lot-2", variety:"Kinnow", quantity:9, unit:"tonnes", grade:"B / Juice", location:"Bhalwal, Punjab", date:"2026-11-26", price:undefined, description:"Juicy early harvest suitable for wholesale and processing.", grower:"Rehman Orchards", status:"Active", updated:"Yesterday" },
    { id:"lot-3", variety:"Mosambi", quantity:12, unit:"tonnes", grade:"A", location:"Multan, Punjab", date:"2026-10-18", price:96000, description:"Fresh sweet lime, field packed in reusable crates.", grower:"South Grove Produce", status:"Active", updated:"2 days ago" },
    { id:"lot-own", variety:"Kinnow", quantity:14, unit:"tonnes", grade:"A", location:"Sargodha, Punjab", date:"2026-12-12", price:114000, description:"Bright color, good juice content, crate packing available.", grower:"Naz Citrus Farms", status:"Active", updated:"Today" },
    { id:"lot-draft", variety:"Lemon", quantity:4, unit:"tonnes", grade:"B", location:"Sargodha, Punjab", date:"2026-11-05", price:undefined, description:"Final quantity to be confirmed.", grower:"Naz Citrus Farms", status:"Draft", updated:"3 days ago" },
    { id:"lot-own-2", variety:"Kinnow", quantity:6, unit:"tonnes", grade:"B / Juice", location:"Sargodha, Punjab", date:"2026-11-30", price:98000, description:"Second-picking fruit, ideal for juice processors and wholesale mandis.", grower:"Naz Citrus Farms", status:"Paused", updated:"4 days ago" },
    { id:"lot-4", variety:"Kinnow", quantity:22, unit:"tonnes", grade:"A / Export", location:"Toba Tek Singh, Punjab", date:"2026-12-15", price:122000, description:"Waxed and graded 60–80 count, packed in export cartons. Cold storage available.", grower:"Chenab Valley Growers", status:"Active", updated:"Today" },
    { id:"lot-5", variety:"Kinnow", quantity:11, unit:"tonnes", grade:"A", location:"Vehari, Punjab", date:"2026-12-05", price:112000, description:"Sweet, thin-skinned fruit from young trees. Farm-gate pickup preferred.", grower:"Green Crescent Farms", status:"Active", updated:"Yesterday" },
    { id:"lot-6", variety:"Lemon", quantity:5, unit:"tonnes", grade:"A", location:"Mandi Bahauddin, Punjab", date:"2026-11-12", price:135000, description:"Bright yellow Eureka lemons, sorted and bagged in 20 kg mesh sacks.", grower:"Kazmi Agro", status:"Active", updated:"3 days ago" },
    { id:"lot-7", variety:"Mosambi", quantity:8, unit:"tonnes", grade:"B", location:"Khanewal, Punjab", date:"2026-10-28", price:undefined, description:"Mixed-size sweet lime, suitable for juice stalls and local markets.", grower:"Sadiq Family Orchard", status:"Active", updated:"4 days ago" },
  ],
  requirements: [
    { id:"req-1", variety:"Kinnow", quantity:12, unit:"tonnes", grade:"A", location:"Lahore, Punjab", date:"2026-12-18", price:120000, description:"Retail-ready fruit; prefer 80–100 count with reusable crate delivery.", buyer:"FreshMart Lahore", status:"Active", updated:"Today" },
    { id:"req-2", variety:"Kinnow", quantity:24, unit:"tonnes", grade:"A / Export", location:"Karachi Port", date:"2026-12-22", price:125000, description:"Export consignment. Grading and wax treatment required.", buyer:"Seaway Exports", status:"Active", updated:"Yesterday" },
    { id:"req-3", variety:"Mosambi", quantity:7, unit:"tonnes", grade:"A", location:"Islamabad", date:"2026-10-24", price:undefined, description:"Weekly wholesale supply; partial quantity considered.", buyer:"Capital Fruit Co.", status:"Active", updated:"2 days ago" },
    { id:"req-own", variety:"Kinnow", quantity:10, unit:"tonnes", grade:"A", location:"Lahore, Punjab", date:"2026-12-16", price:119000, description:"Consistent sizing for retail stores. Crate delivery preferred.", buyer:"Naz Citrus Farms", status:"Active", updated:"Today" },
    { id:"req-own-2", variety:"Lemon", quantity:3, unit:"tonnes", grade:"A", location:"Lahore, Punjab", date:"2026-11-20", price:130000, description:"Restaurant supply; firm fruit in mesh sacks.", buyer:"Naz Citrus Farms", status:"Paused", updated:"5 days ago" },
    { id:"req-4", variety:"Kinnow", quantity:30, unit:"tonnes", grade:"A / Export", location:"Karachi Port", date:"2026-12-28", price:126000, description:"Gulf-bound shipment. 60–80 count, waxed, export cartons required.", buyer:"Indus Global Traders", status:"Active", updated:"Today" },
    { id:"req-5", variety:"Kinnow", quantity:15, unit:"tonnes", grade:"B / Juice", location:"Faisalabad, Punjab", date:"2026-12-10", price:100000, description:"Juice processing plant; size not important, sugar content preferred.", buyer:"PureSip Juices", status:"Active", updated:"Yesterday" },
    { id:"req-6", variety:"Lemon", quantity:4, unit:"tonnes", grade:"A", location:"Rawalpindi, Punjab", date:"2026-11-18", price:138000, description:"Weekly supermarket supply in 20 kg bags.", buyer:"Metro Greens Mart", status:"Active", updated:"2 days ago" },
  ],
  offers: [
    { id:"off-1", lotId:"lot-own", requirementId:"req-1", senderRole:"buyer", party:"FreshMart Lahore", quantity:10, price:116000, note:"Can collect from farm within 48 hours of readiness.", status:"Pending", date:"Today" },
    { id:"off-2", lotId:"lot-1", requirementId:"req-own", senderRole:"buyer", party:"Noor Citrus Farm", quantity:8, price:117500, note:"Includes standard crate packing.", status:"Countered", date:"Yesterday" },
  ],
  conversations: [
    { id:"chat-1", party:"FreshMart Lahore", context:"14t Kinnow · Lot KL-104", unread:true, messages:[{ id:"m1", mine:false, text:"Is crate packing available for this lot?", time:"10:24" }, { id:"m2", mine:true, text:"Yes, reusable crates can be arranged.", time:"10:31" }] },
    { id:"chat-2", party:"Noor Citrus Farm", context:"Kinnow requirement · KR-208", unread:false, messages:[{ id:"m3", mine:false, text:"We can offer 8 tonnes from our December harvest.", time:"Yesterday" }] },
  ],
  saved:["lot-1"],
  profile:{ name:"Rabia Naz", business:"Naz Citrus Farms", location:"Sargodha, Punjab", phone:"+92 300 000 0000", email:"rabia@example.demo" },
};

type ContextValue = State & {
  theme: Theme; setTheme:(theme:Theme)=>void; setRole:(role:Role|null)=>void;
  addLot:(lot:Omit<Lot,"id"|"grower"|"status"|"updated">)=>void;
  addRequirement:(item:Omit<Requirement,"id"|"buyer"|"status"|"updated">)=>void;
  setLotStatus:(id:string,status:Status)=>void; setRequirementStatus:(id:string,status:Status)=>void;
  toggleSaved:(id:string)=>void; updateOffer:(id:string,status:Offer["status"])=>void;
  createOffer:(lotId:string,requirementId:string,quantity:number,price:number|undefined,note:string)=>void;
  sendMessage:(id:string,text:string)=>void; markRead:(id:string)=>void; updateProfile:(profile:Profile)=>void; reset:()=>void;
};
const MarketplaceContext = createContext<ContextValue | null>(null);
const STORAGE = "kinnowlink-demo-v1";
const THEME = "kinnowlink-theme";

export function MarketplaceProvider({children}:{children:ReactNode}) {
  const [state,setState] = useState<State>(initial);
  const [theme,setThemeState] = useState<Theme>("system");
  const [hydrated,setHydrated] = useState(false);
  useEffect(()=>{ try { const saved=localStorage.getItem(STORAGE); if(saved) setState(JSON.parse(saved)); const t=localStorage.getItem(THEME) as Theme|null; if(t) setThemeState(t); } catch {} finally { setHydrated(true); } },[]);
  useEffect(()=>{ if(hydrated) localStorage.setItem(STORAGE,JSON.stringify(state)); },[state,hydrated]);
  useEffect(()=>{
    if(!hydrated) return;
    localStorage.setItem(THEME,theme);
    const query=window.matchMedia("(prefers-color-scheme: dark)");
    const apply=()=>document.documentElement.classList.toggle("dark",theme==="dark"||(theme==="system"&&query.matches));
    apply(); query.addEventListener("change",apply); return()=>query.removeEventListener("change",apply);
  },[theme,hydrated]);
  const value=useMemo<ContextValue>(()=>({...state,theme,setTheme:setThemeState,
    setRole:(role)=>setState(s=>({...s,role})),
    addLot:(lot)=>setState(s=>({...s,lots:[{...lot,id:`lot-${Date.now()}`,grower:s.profile.business,status:"Active",updated:"Just now"},...s.lots]})),
    addRequirement:(item)=>setState(s=>({...s,requirements:[{...item,id:`req-${Date.now()}`,buyer:s.profile.business,status:"Active",updated:"Just now"},...s.requirements]})),
    setLotStatus:(id,status)=>setState(s=>({...s,lots:s.lots.map(x=>x.id===id?{...x,status,updated:"Just now"}:x)})),
    setRequirementStatus:(id,status)=>setState(s=>({...s,requirements:s.requirements.map(x=>x.id===id?{...x,status,updated:"Just now"}:x)})),
    toggleSaved:(id)=>setState(s=>({...s,saved:s.saved.includes(id)?s.saved.filter(x=>x!==id):[...s.saved,id]})),
    updateOffer:(id,status)=>setState(s=>({...s,offers:s.offers.map(x=>x.id===id?{...x,status}:x)})),
    createOffer:(lotId,requirementId,quantity,price,note)=>setState(s=>({...s,offers:[{id:`off-${Date.now()}`,lotId,requirementId,senderRole:s.role??"buyer",party:s.profile.business,quantity,price,note,status:"Pending",date:"Just now"},...s.offers]})),
    sendMessage:(id,text)=>setState(s=>({...s,conversations:s.conversations.map(c=>c.id===id?{...c,unread:false,messages:[...c.messages,{id:`m-${Date.now()}`,mine:true,text,time:"Just now"}]}:c)})),
    markRead:(id)=>setState(s=>({...s,conversations:s.conversations.map(c=>c.id===id?{...c,unread:false}:c)})),
    updateProfile:(profile)=>setState(s=>({...s,profile})), reset:()=>setState(initial)
  }),[state,theme]);
  return <MarketplaceContext.Provider value={value}>{children}</MarketplaceContext.Provider>;
}
export function useMarketplace(){ const value=useContext(MarketplaceContext); if(!value) throw new Error("MarketplaceProvider missing"); return value; }

export function matchReasons(lot:Lot,req:Requirement){
  if(lot.variety.toLowerCase()!==req.variety.toLowerCase()||lot.status!=="Active"||req.status!=="Active") return [];
  const reasons=[`${lot.variety} variety matches`];
  reasons.push(lot.quantity>=req.quantity?`Full ${req.quantity} ${req.unit} quantity fit`:`Partial fit: ${lot.quantity} of ${req.quantity} ${req.unit}`);
  const requestedGrade=req.grade.split(" ")[0] ?? req.grade;
  reasons.push(lot.grade.includes(requestedGrade)?`Requested ${req.grade} grade aligns`:`Grade needs confirmation (${lot.grade} vs ${req.grade})`);
  reasons.push(lot.date<=req.date?"Ready before the needed-by date":"Timing needs discussion");
  reasons.push(lot.location.split(",").at(-1)===req.location.split(",").at(-1)?"Both locations are in Punjab":"Transport feasibility needs confirmation");
  if(lot.price&&req.price) reasons.push(lot.price<=req.price?"Asking price is within target":"Price is above target and may need negotiation");
  return reasons;
}