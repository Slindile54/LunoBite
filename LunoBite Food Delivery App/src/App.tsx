import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import { Address, categories, initialAddresses, Product, products, restaurants } from "./data";

type Screen = "welcome" | "login" | "home" | "restaurants" | "restaurant" | "product" | "cart" | "checkout" | "confirmation" | "order" | "favourites" | "profile" | "location" | "contact" | "faq";
type CartItem = { key: string; product: Product; quantity: number; option: string; extras: string[]; instructions: string; unitPrice: number };
type Order = { number: string; items: CartItem[]; total: number; address: string; date: string };
type IconName = "home" | "search" | "heart" | "bag" | "user" | "pin" | "arrow" | "star" | "minus" | "plus" | "trash" | "store" | "phone" | "mail" | "clock" | "check" | "edit" | "chevron" | "sparkle" | "lock";

const money = (value: number) => `R${value.toFixed(2)}`;

function Icon({ name, size = 20, filled = false }: { name: IconName; size?: number; filled?: boolean }) {
  const paths: Record<IconName, ReactNode> = {
    home: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/>,
    bag: <><path d="M6 8h12l1 13H5L6 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    arrow: <><path d="M19 12H5"/><path d="m11 18-6-6 6-6"/></>,
    star: <path d="m12 2 3 6 6.5 1-4.7 4.6 1.1 6.4-5.9-3.1L6.1 20l1.1-6.4L2.5 9 9 8Z"/>,
    minus: <path d="M5 12h14"/>, plus: <><path d="M5 12h14"/><path d="M12 5v14"/></>,
    trash: <><path d="M4 7h16"/><path d="M9 7V4h6v3M7 7l1 14h8l1-14"/></>,
    store: <><path d="M4 10v11h16V10"/><path d="M3 10 5 3h14l2 7M9 21v-7h6v7"/></>,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5 13 13 0 0 0 2.8.7 2 2 0 0 1 1.8 2.1Z"/>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    check: <path d="m5 12 4 4L19 6"/>, edit: <><path d="m14 4 6 6L9 21H3v-6Z"/><path d="m12 6 6 6"/></>,
    chevron: <path d="m9 18 6-6-6-6"/>, sparkle: <><path d="m12 2 1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5Z"/><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7Z"/></>,
    lock: <><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function Button({ children, onClick, variant = "primary", type = "button", disabled = false, className = "" }: { children: ReactNode; onClick?: () => void; variant?: "primary" | "secondary" | "ghost" | "danger"; type?: "button" | "submit"; disabled?: boolean; className?: string }) {
  return <button className={`btn btn-${variant} ${className}`} onClick={onClick} type={type} disabled={disabled}>{children}</button>;
}
function IconButton({ icon, label, onClick, active = false }: { icon: IconName; label: string; onClick: () => void; active?: boolean }) {
  return <button className={`icon-btn ${active ? "active" : ""}`} onClick={onClick} aria-label={label}><Icon name={icon} filled={active} /></button>;
}
function Field({ label, error, ...props }: { label: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return <label className="field"><span>{label}</span><input {...props} className={error ? "error" : ""}/>{error && <small className="error-text">{error}</small>}</label>;
}
function TextArea({ label, ...props }: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <label className="field"><span>{label}</span><textarea {...props}/></label>;
}
function Header({ title, onBack, right }: { title: string; onBack?: () => void; right?: ReactNode }) {
  return <header className="page-header">{onBack ? <IconButton icon="arrow" label="Go back" onClick={onBack}/> : <Logo compact/>}<h1>{title}</h1><div className="header-action">{right}</div></header>;
}

function Logo({ compact = false, light = false }: { compact?: boolean; light?: boolean }) {
  return (
    <div className={`logo ${compact ? "logo-compact" : ""} ${light ? "light" : ""}`}>
      <div className="logo-lockup">
        <span className="logo-mascot" role="img" aria-label="Burger mascot">
          🧑🏻‍🍳
        </span>

        <div className="logo-wordmark">
          <span className="logo-name">
            Luno<span className="logo-name-accent">Bite</span>
          </span>

          {!compact && (
            <span className="logo-tagline">
              Let Us Crave With You
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
function Quantity({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return <div className="quantity"><IconButton icon="minus" label="Decrease quantity" onClick={() => onChange(Math.max(1, value - 1))}/><b>{value}</b><IconButton icon="plus" label="Increase quantity" onClick={() => onChange(value + 1)}/></div>;
}

function FoodCard({ product, onOpen, favourite, onFavourite, onAdd }: { product: Product; onOpen: () => void; favourite: boolean; onFavourite: () => void; onAdd: () => void }) {
  return <article className="food-card">
    <button className="image-button" onClick={onOpen} aria-label={`View ${product.name}`}><img src={product.image} alt={product.name}/>{product.label && <span className="pill">{product.label}</span>}</button>
    <IconButton icon="heart" label={`${favourite ? "Remove" : "Add"} ${product.name} ${favourite ? "from" : "to"} favourites`} onClick={onFavourite} active={favourite}/>
    <button className="card-copy" onClick={onOpen}><small>{product.restaurant}</small><h3>{product.name}</h3><span><Icon name="star" size={14} filled/> {product.rating} · {product.category}</span><b>{money(product.price)}</b></button>
    <IconButton icon="plus" label={`Quick add ${product.name}`} onClick={onAdd}/>
  </article>;
}

function RestaurantCard({ restaurant, favourite, onFavourite, onOpen }: { restaurant: typeof restaurants[number]; favourite: boolean; onFavourite: () => void; onOpen: () => void }) {
  return <article className="restaurant-card">
    <button className="restaurant-image" onClick={onOpen}><img src={restaurant.image} alt=""/><span>{restaurant.time}</span></button>
    <div className="restaurant-copy"><button onClick={onOpen}><h3>{restaurant.name}</h3><p>{restaurant.cuisine}</p><small><Icon name="star" size={14} filled/> {restaurant.rating} · {money(restaurant.fee)} delivery · Min. {money(restaurant.minimum)}</small></button><IconButton icon="heart" label="Toggle favourite restaurant" active={favourite} onClick={onFavourite}/></div>
  </article>;
}

function BottomNav({ screen, go, count }: { screen: Screen; go: (s: Screen) => void; count: number }) {
  const items: { screen: Screen; icon: IconName; label: string }[] = [
    { screen: "home", icon: "home", label: "Home" }, { screen: "restaurants", icon: "store", label: "Restaurants" },
    { screen: "favourites", icon: "heart", label: "Favourites" }, { screen: "cart", icon: "bag", label: "Cart" }, { screen: "profile", icon: "user", label: "Profile" },
  ];
  return <nav className="bottom-nav" aria-label="Primary navigation">{items.map(item => <button key={item.screen} className={screen === item.screen ? "active" : ""} onClick={() => go(item.screen)}><span><Icon name={item.icon} filled={screen === item.screen}/>{item.screen === "cart" && count > 0 && <i>{count}</i>}</span><small>{item.label}</small></button>)}</nav>;
}

function App() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [history, setHistory] = useState<Screen[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(restaurants[0].name);
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favourites, setFavourites] = useState<number[]>([]);
  const [favouriteRestaurants, setFavouriteRestaurants] = useState<string[]>([]);
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [selectedAddress, setSelectedAddress] = useState(1);
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [toast, setToast] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [profile, setProfile] = useState({ name: "Naledi Mokoena", email: "naledi@example.com", phone: "082 555 0168" });

  useEffect(() => { if (toast) { const id = window.setTimeout(() => setToast(""), 2600); return () => window.clearTimeout(id); } }, [toast]);
  const go = (next: Screen) => { setHistory(prev => [...prev, screen]); setScreen(next); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const back = () => { const previous = history.at(-1) ?? "home"; setHistory(prev => prev.slice(0, -1)); setScreen(previous); };
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const delivery = cart.length ? (subtotal >= 350 ? 0 : 29) : 0;
  const total = Math.max(0, subtotal + delivery - discount);
  const currentAddress = addresses.find(a => a.id === selectedAddress);

  const addCart = (product: Product, quantity = 1, option = product.options?.[0]?.name ?? "Standard", extras: string[] = [], instructions = "", unitPrice = product.price) => {
    const key = `${product.id}-${option}-${extras.sort().join(",")}-${instructions.trim()}`;
    setCart(prev => {
      const existing = prev.find(item => item.key === key);
      return existing ? prev.map(item => item.key === key ? { ...item, quantity: item.quantity + quantity } : item) : [...prev, { key, product, quantity, option, extras, instructions, unitPrice }];
    });
    setToast(`${product.name} added to your cart`);
  };
  const openProduct = (product: Product) => { setSelectedProduct(product); go("product"); };
  const toggleFavourite = (id: number) => setFavourites(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  const filtered = useMemo(() => products.filter(product => (category === "All" || product.category === category) && (!query || `${product.name} ${product.category} ${product.restaurant}`.toLowerCase().includes(query.toLowerCase()))), [category, query]);

  const appScreens = ["home", "restaurants", "favourites", "cart", "profile"];
  return <main className="app-shell">
    <div className="phone">
      {screen === "welcome" && <Welcome go={go}/>}
      {screen === "login" && <Login back={back} onLogin={() => { setToast("Welcome back to LunoBite"); go("home"); }}/>}
      {screen === "home" && <Home go={go} products={filtered} category={category} setCategory={setCategory} query={query} setQuery={setQuery} openProduct={openProduct} favourites={favourites} toggleFavourite={toggleFavourite} addCart={addCart} address={currentAddress?.line ?? "Choose a delivery address"}/>}
      {screen === "restaurants" && <Restaurants go={go} restaurantsList={restaurants} favourites={favouriteRestaurants} toggle={name => setFavouriteRestaurants(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name])} open={name => { setSelectedRestaurant(name); go("restaurant"); }}/>}
      {screen === "restaurant" && <RestaurantDetail name={selectedRestaurant} back={back} products={products.filter(p => p.restaurant === selectedRestaurant)} openProduct={openProduct} favourites={favourites} toggleFavourite={toggleFavourite} addCart={addCart}/>}
      {screen === "product" && <ProductDetail product={selectedProduct} back={back} onAdd={addCart}/>}
      {screen === "cart" && <Cart items={cart} setItems={setCart} subtotal={subtotal} delivery={delivery} discount={discount} total={total} promo={promo} setPromo={setPromo} applyPromo={() => { if (promo.trim().toUpperCase() === "LUNO10") { setDiscount(Math.min(50, subtotal * .1)); setToast("LUNO10 applied — you saved 10%"); } else { setDiscount(0); setToast("That code is not valid. Try LUNO10"); } }} go={go}/>}
      {screen === "checkout" && <Checkout back={back} items={cart} subtotal={subtotal} delivery={delivery} discount={discount} total={total} address={currentAddress} editAddress={() => go("location")} onPlace={(address) => { const newOrder = { number: `LB${String(Date.now()).slice(-6)}`, items: [...cart], total, address, date: new Date().toLocaleDateString("en-ZA") }; setOrder(newOrder); setCart([]); go("confirmation"); }}/>}
      {screen === "confirmation" && order && <Confirmation order={order} go={go}/>}
      {screen === "order" && order && <OrderDetail order={order} back={back}/>}
      {screen === "favourites" && <Favourites items={products.filter(p => favourites.includes(p.id))} openProduct={openProduct} toggleFavourite={toggleFavourite} addCart={addCart} go={go}/>}
      {screen === "location" && <Location addresses={addresses} setAddresses={setAddresses} selected={selectedAddress} setSelected={setSelectedAddress} back={back} done={() => { setToast("Delivery address updated"); back(); }}/>}
      {screen === "profile" && <Profile profile={profile} setProfile={setProfile} order={order} go={go} onLogout={() => { if (window.confirm("Log out of this demonstration session?")) { setProfile({ name: "", email: "", phone: "" }); setToast("You’ve been logged out"); go("welcome"); } }}/>}
      {screen === "contact" && <Contact back={back} go={go} toast={setToast}/>}
      {screen === "faq" && <Faq back={back}/>}
      {appScreens.includes(screen) && <BottomNav screen={screen} go={go} count={cartCount}/>}
      {toast && <div className="toast" role="status"><Icon name="check" size={18}/>{toast}</div>}
    </div>
  </main>;
}

function Welcome({ go }: { go: (s: Screen) => void }) {
  return <section className="welcome">
    <div className="welcome-top"><Logo light/><Icon name="sparkle" size={28}/></div>
    <div className="hero-photo"><img src="https://thumbs.dreamstime.com/b/sizzling-juicy-grilled-pork-rib-flaming-spices-dark-purple-background-barbecue-concept-ai-generative-sizzling-juicy-317345202.jpg?w=992" alt="Fresh burger and sides"/><span className="float-card"><b>4.9</b><small>craving score</small></span><i className="moon">●</i></div>
    <div className="welcome-copy"><span className="eyebrow">Meals that match your mood</span><h1>Your cravings,<br/>our mission!</h1><p>From your favourite comfort food to sweet little treats, your next craving is just a tap away.</p><Button onClick={() => go("home")}>Let&apos;s Get Started <Icon name="chevron"/></Button><Button variant="ghost" onClick={() => go("login")}>Already have an account? <b>Log in</b></Button></div>
  </section>;
}

function Login({ back, onLogin }: { back: () => void; onLogin: () => void }) {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const submit = (event: FormEvent) => { event.preventDefault(); const next: Record<string, string> = {}; if (!/\S+@\S+\.\S+/.test(values.email)) next.email = "Enter a valid email address"; if (!values.password) next.password = "Password is required"; setErrors(next); if (!Object.keys(next).length) onLogin(); };
  return <section className="page auth"><Header title="Welcome back" onBack={back}/><div className="auth-illustration"><Logo/><p>This is a demonstration login. No real authentication is connected.</p></div><form onSubmit={submit}><Field label="Email address" type="email" placeholder="you@example.com" value={values.email} onChange={e => setValues({ ...values, email: e.target.value })} error={errors.email}/><Field label="Password" type="password" placeholder="Enter any password" value={values.password} onChange={e => setValues({ ...values, password: e.target.value })} error={errors.password}/><Button type="submit">Log in securely <Icon name="lock"/></Button></form></section>;
}

function Home({ go, products: items, category, setCategory, query, setQuery, openProduct, favourites, toggleFavourite, addCart, address }: { go: (s: Screen) => void; products: Product[]; category: string; setCategory: (v: string) => void; query: string; setQuery: (v: string) => void; openProduct: (p: Product) => void; favourites: number[]; toggleFavourite: (id: number) => void; addCart: (p: Product) => void; address: string }) {
  return <section className="page home-page">
    <header className="home-header"><Logo/><IconButton icon="user" label="Open profile" onClick={() => go("profile")}/></header>
    <p className="greeting">Hey, foodie! <span>💜</span></p>
    <button className="location-select" onClick={() => go("location")}><Icon name="pin" size={18}/><span><small>Delivering to</small><b>{address}</b></span><Icon name="chevron" size={16}/></button>
    <label className="search"><Icon name="search"/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="What are you craving today?"/>{query && <button onClick={() => setQuery("")} aria-label="Clear search">×</button>}</label>
    {query && <div className="result-note">Showing results for <b>“{query}”</b> · {items.length} found</div>}
    {!query && <button className="promo" onClick={() => { setCategory("Burgers"); document.getElementById("catalogue")?.scrollIntoView({ behavior: "smooth" }); }}><div><span>TONIGHT&apos;S MOOD</span><h2>Good food.<br/>Good mood.</h2><p>Save 20% on selected comfort-food favourites.</p><b>Explore the deal <Icon name="chevron" size={16}/></b></div><img src="https://img.magnific.com/premium-photo/types-of-best-fast-food-list-50-b1c8553-block-1-0jpg_995407-34827.jpg?w=2000" alt="Comfort food deal"/></button>}
    <SectionTitle title="Pick your craving" action="See restaurants" onAction={() => go("restaurants")}/>
    <div className="chips">{categories.map(item => <button className={category === item ? "active" : ""} key={item} onClick={() => setCategory(item)}>{item}</button>)}</div>
    {!query && <><SectionTitle title="Popular near you" action="View all" onAction={() => go("restaurants")}/><div className="mini-restaurants">{restaurants.slice(0, 3).map(r => <button key={r.name} onClick={() => go("restaurants")}><img src={r.image} alt=""/><span><b>{r.name}</b><small><Icon name="star" size={12} filled/> {r.rating} · {r.time}</small></span></button>)}</div></>}
    <SectionTitle title={category === "All" ? "Bestsellers for you" : category} subtitle="Demo menu · prices include VAT"/>
    <div className="food-grid" id="catalogue">{items.map(product => <FoodCard key={product.id} product={product} onOpen={() => openProduct(product)} favourite={favourites.includes(product.id)} onFavourite={() => toggleFavourite(product.id)} onAdd={() => addCart(product)}/>)}</div>
    {!items.length && <Empty title="No tasty matches yet" text="Try another search or clear your filters." action="Clear filters" onAction={() => { setQuery(""); setCategory("All"); }}/>}
  </section>;
}

function SectionTitle({ title, subtitle, action, onAction }: { title: string; subtitle?: string; action?: string; onAction?: () => void }) {
  return <div className="section-title"><div><h2>{title}</h2>{subtitle && <small>{subtitle}</small>}</div>{action && <button onClick={onAction}>{action} <Icon name="chevron" size={14}/></button>}</div>;
}

function Restaurants({ go, restaurantsList, favourites, toggle, open }: { go: (s: Screen) => void; restaurantsList: typeof restaurants; favourites: string[]; toggle: (s: string) => void; open: (s: string) => void }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("Recommended");
  const list = restaurantsList.filter(r => `${r.name} ${r.cuisine}`.toLowerCase().includes(query.toLowerCase())).sort((a, b) => sort === "Top rated" ? b.rating - a.rating : sort === "Fastest" ? a.time.localeCompare(b.time) : 0);
  return <section className="page"><Header title="Restaurants"/><label className="search"><Icon name="search"/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search restaurants or cuisines"/></label><div className="filter-row">{["Recommended", "Top rated", "Fastest"].map(item => <button className={sort === item ? "active" : ""} onClick={() => setSort(item)} key={item}>{item}</button>)}</div><p className="demo-note">Fictional restaurants and menus for demonstration.</p><div className="restaurant-list">{list.map(r => <RestaurantCard key={r.name} restaurant={r} favourite={favourites.includes(r.name)} onFavourite={() => toggle(r.name)} onOpen={() => open(r.name)}/>)}</div></section>;
}

function RestaurantDetail({ name, back, products: items, openProduct, favourites, toggleFavourite, addCart }: { name: string; back: () => void; products: Product[]; openProduct: (p: Product) => void; favourites: number[]; toggleFavourite: (id: number) => void; addCart: (p: Product) => void }) {
  const restaurant = restaurants.find(r => r.name === name)!;
  return <section className="page detail-page"><Header title="" onBack={back}/><div className="restaurant-hero"><img src={restaurant.image} alt={restaurant.name}/></div><div className="restaurant-title"><h1>{restaurant.name}</h1><p>{restaurant.cuisine}</p><div><span><Icon name="star" size={15} filled/> {restaurant.rating}</span><span><Icon name="clock" size={15}/> {restaurant.time}</span><span>{money(restaurant.fee)} delivery</span></div></div><SectionTitle title="Menu" subtitle={`${items.length} delicious options`}/><div className="food-grid">{items.map(product => <FoodCard key={product.id} product={product} onOpen={() => openProduct(product)} favourite={favourites.includes(product.id)} onFavourite={() => toggleFavourite(product.id)} onAdd={() => addCart(product)}/>)}</div></section>;
}

function ProductDetail({ product, back, onAdd }: { product: Product; back: () => void; onAdd: (p: Product, q: number, o: string, e: string[], i: string, price: number) => void }) {
  const [quantity, setQuantity] = useState(1);
  const [option, setOption] = useState(product.options?.[0]?.name ?? "Standard");
  const [extras, setExtras] = useState<string[]>([]);
  const [instructions, setInstructions] = useState("");
  const optionPrice = product.options?.find(o => o.name === option)?.price ?? 0;
  const extrasPrice = product.extras?.filter(e => extras.includes(e.name)).reduce((sum, e) => sum + e.price, 0) ?? 0;
  const unitPrice = product.price + optionPrice + extrasPrice;
  return <section className="product-page">
    <div className="product-image"><img src={product.image} alt={product.name}/><IconButton icon="arrow" label="Go back" onClick={back}/><span>{product.label ?? product.category}</span></div>
    <div className="product-content"><small>{product.restaurant}</small><h1>{product.name}</h1><div className="product-meta"><span><Icon name="star" size={15} filled/> {product.rating}</span><b>{money(product.price)}</b></div><p>{product.description}</p>
    {product.options && <OptionGroup title="Choose one" options={product.options} selected={option} select={setOption}/>}
    {product.extras && <div className="option-group"><div><h2>Make it yours</h2><small>Optional</small></div>{product.extras.map(extra => <label key={extra.name}><span><b>{extra.name}</b><small>+ {money(extra.price)}</small></span><input type="checkbox" checked={extras.includes(extra.name)} onChange={() => setExtras(prev => prev.includes(extra.name) ? prev.filter(e => e !== extra.name) : [...prev, extra.name])}/></label>)}</div>}
    <TextArea label="Special instructions" placeholder="Sauce on the side, no onions…" maxLength={120} value={instructions} onChange={e => setInstructions(e.target.value)}/>
    <div className="product-buy"><Quantity value={quantity} onChange={setQuantity}/><Button onClick={() => { onAdd(product, quantity, option, extras, instructions, unitPrice); back(); }}>Add to cart · {money(unitPrice * quantity)}</Button></div></div>
  </section>;
}

function OptionGroup({ title, options, selected, select }: { title: string; options: { name: string; price: number }[]; selected: string; select: (v: string) => void }) {
  return <div className="option-group"><div><h2>{title}</h2><small>Required</small></div>{options.map(option => <label key={option.name}><span><b>{option.name}</b><small>{option.price ? `+ ${money(option.price)}` : "Included"}</small></span><input type="radio" name={title} checked={selected === option.name} onChange={() => select(option.name)}/></label>)}</div>;
}

function Cart({ items, setItems, subtotal, delivery, discount, total, promo, setPromo, applyPromo, go }: { items: CartItem[]; setItems: React.Dispatch<React.SetStateAction<CartItem[]>>; subtotal: number; delivery: number; discount: number; total: number; promo: string; setPromo: (v: string) => void; applyPromo: () => void; go: (s: Screen) => void }) {
  if (!items.length) return <section className="page"><Header title="Your cart"/><Empty title="Your cart is craving company" text="Explore the menu and add something delicious." action="Explore food" onAction={() => go("home")}/></section>;
  return <section className="page cart-page"><Header title="Your cart"/><p className="demo-note">Free delivery on orders of R350 or more. Otherwise R29.</p><div className="cart-list">{items.map(item => <article className="cart-item" key={item.key}><img src={item.product.image} alt=""/><div><h3>{item.product.name}</h3><p>{item.option}{item.extras.length ? ` · ${item.extras.join(", ")}` : ""}</p>{item.instructions && <small>“{item.instructions}”</small>}<div><Quantity value={item.quantity} onChange={value => setItems(prev => prev.map(i => i.key === item.key ? { ...i, quantity: value } : i))}/><b>{money(item.unitPrice * item.quantity)}</b></div></div><IconButton icon="trash" label={`Remove ${item.product.name}`} onClick={() => setItems(prev => prev.filter(i => i.key !== item.key))}/></article>)}</div>
    <div className="promo-code"><h2>Have a promo code?</h2><div><input value={promo} onChange={e => setPromo(e.target.value)} placeholder="Try LUNO10"/><Button variant="secondary" onClick={applyPromo}>Apply</Button></div></div>
    <PriceSummary subtotal={subtotal} delivery={delivery} discount={discount} total={total}/>
    <div className="stack-actions"><Button onClick={() => go("checkout")}>Proceed to checkout <Icon name="chevron"/></Button><Button variant="secondary" onClick={() => go("home")}>Continue shopping</Button></div>
  </section>;
}

function PriceSummary({ subtotal, delivery, discount, total }: { subtotal: number; delivery: number; discount: number; total: number }) {
  return <div className="price-summary"><div><span>Item subtotal</span><b>{money(subtotal)}</b></div><div><span>Delivery</span><b>{delivery ? money(delivery) : "FREE"}</b></div>{discount > 0 && <div className="saving"><span>Promo saving</span><b>−{money(discount)}</b></div>}<div className="total"><span>Total payable</span><b>{money(total)}</b></div></div>;
}

function Checkout({ back, items, subtotal, delivery, discount, total, address, editAddress, onPlace }: { back: () => void; items: CartItem[]; subtotal: number; delivery: number; discount: number; total: number; address?: Address; editAddress: () => void; onPlace: (address: string) => void }) {
  const [details, setDetails] = useState({ name: "Naledi Mokoena", phone: "082 555 0168", instructions: "" });
  const [payment, setPayment] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const place = () => { const next: Record<string, string> = {}; if (!address) next.address = "Choose a delivery address"; if (details.name.trim().length < 2) next.name = "Recipient name is required"; if (details.phone.replace(/\D/g, "").length < 10) next.phone = "Enter a valid phone number"; if (!payment) next.payment = "Select a demonstration payment method"; setErrors(next); if (!Object.keys(next).length && address && !submitting) { setSubmitting(true); window.setTimeout(() => onPlace(address.line), 500); } };
  return <section className="page checkout"><Header title="Checkout" onBack={back}/><div className="secure-note"><Icon name="lock" size={18}/><span><b>Safe demonstration checkout</b><small>No real payment or delivery will be processed.</small></span></div>
    <SectionTitle title="Delivery address" action="Edit" onAction={editAddress}/><button className={`address-choice ${errors.address ? "error" : ""}`} onClick={editAddress}><Icon name="pin"/><span><b>{address?.label ?? "No address selected"}</b><small>{address?.line ?? "Tap to choose an address"}</small></span><Icon name="chevron"/></button>{errors.address && <small className="error-text">{errors.address}</small>}
    <div className="form-card"><Field label="Recipient name" value={details.name} onChange={e => setDetails({ ...details, name: e.target.value })} error={errors.name}/><Field label="Phone number" type="tel" value={details.phone} onChange={e => setDetails({ ...details, phone: e.target.value })} error={errors.phone}/><TextArea label="Delivery instructions" placeholder="Gate code, landmark or drop-off note" value={details.instructions} onChange={e => setDetails({ ...details, instructions: e.target.value })}/></div>
    <SectionTitle title="Delivery option"/><label className="delivery-option"><input type="radio" checked readOnly/><span><b>Standard delivery</b><small>Estimated 30–45 minutes · {delivery ? money(delivery) : "Free"}</small></span></label>
    <SectionTitle title="Payment method" subtitle="All options are simulated"/><div className="payment-list">{[["cash", "Cash on delivery", "Pay the courier in this demonstration"], ["card", "Card payment demo", "No card details are collected"], ["eft", "Instant EFT demo", "No bank connection is made"]].map(([id, title, description]) => <label key={id}><input type="radio" name="payment" checked={payment === id} onChange={() => setPayment(id)}/><span><b>{title}</b><small>{description}</small></span></label>)}</div>{errors.payment && <small className="error-text">{errors.payment}</small>}
    <SectionTitle title="Order summary" subtitle={`${items.reduce((s, i) => s + i.quantity, 0)} items`}/><div className="compact-items">{items.map(i => <div key={i.key}><span>{i.quantity}× {i.product.name}</span><b>{money(i.unitPrice * i.quantity)}</b></div>)}</div><PriceSummary subtotal={subtotal} delivery={delivery} discount={discount} total={total}/><Button onClick={place} disabled={submitting}>{submitting ? "Creating demo order…" : `Place demo order · ${money(total)}`}</Button>
  </section>;
}

function Confirmation({ order, go }: { order: Order; go: (s: Screen) => void }) {
  return <section className="success-page"><div className="confetti">✦ <span>●</span> ✦ <i>●</i></div><div className="success-icon"><Icon name="check" size={38}/></div><span className="eyebrow">DEMO ORDER CONFIRMED</span><h1>Yay! Your cravings<br/>are on their way!</h1><p>Your simulated order has been created. No payment was processed and no real delivery was booked.</p><div className="order-ticket"><div><span>Order number</span><b>#{order.number}</b></div><div><span>Estimated delivery</span><b>30–45 minutes</b></div><div><span>Delivering to</span><b>{order.address}</b></div><div><span>Total</span><b>{money(order.total)}</b></div></div><div className="status-mini"><span className="done"><i><Icon name="check" size={14}/></i>Received</span><span><i></i>Preparing</span><span><i></i>On the way</span><span><i></i>Delivered</span></div><small className="demo-note">Status timeline is simulated, not live courier tracking.</small><Button onClick={() => go("order")}>View order</Button><Button variant="secondary" onClick={() => go("home")}>Back to home</Button></section>;
}

function OrderDetail({ order, back }: { order: Order; back: () => void }) {
  return <section className="page"><Header title="Order details" onBack={back}/><div className="order-heading"><span className="status-pill">Preparing · simulated</span><h2>#{order.number}</h2><p>Placed {order.date}</p></div><div className="timeline">{["Order received", "Preparing", "On the way", "Delivered"].map((item, index) => <div className={index < 2 ? "active" : ""} key={item}><i>{index < 2 && <Icon name="check" size={13}/>}</i><span><b>{item}</b><small>{index === 0 ? "Your demo order was created" : index === 1 ? "The kitchen is preparing your order" : "Simulated status update"}</small></span></div>)}</div><p className="demo-note">This is a demonstration timeline and does not represent live tracking.</p><SectionTitle title="Your items"/><div className="order-items">{order.items.map(item => <div key={item.key}><img src={item.product.image} alt=""/><span><b>{item.quantity}× {item.product.name}</b><small>{item.option}</small></span><b>{money(item.quantity * item.unitPrice)}</b></div>)}</div><div className="order-address"><Icon name="pin"/><span><b>Delivery address</b><small>{order.address}</small></span></div><div className="price-summary"><div className="total"><span>Total paid (demo)</span><b>{money(order.total)}</b></div></div></section>;
}

function Favourites({ items, openProduct, toggleFavourite, addCart, go }: { items: Product[]; openProduct: (p: Product) => void; toggleFavourite: (id: number) => void; addCart: (p: Product) => void; go: (s: Screen) => void }) {
  return <section className="page"><Header title="Your favourites"/>{items.length ? <><p className="demo-note">The bites you&apos;d happily order again.</p><div className="food-grid">{items.map(p => <FoodCard key={p.id} product={p} onOpen={() => openProduct(p)} favourite onFavourite={() => toggleFavourite(p.id)} onAdd={() => addCart(p)}/>)}</div></> : <Empty title="No favourites yet" text="Tap the heart on any food you love and find it here." action="Find a favourite" onAction={() => go("home")}/>}</section>;
}

function Location({ addresses, setAddresses, selected, setSelected, back, done }: { addresses: Address[]; setAddresses: React.Dispatch<React.SetStateAction<Address[]>>; selected: number; setSelected: (n: number) => void; back: () => void; done: () => void }) {
  const [query, setQuery] = useState("");
  const [adding, setAdding] = useState(false);
  const [newAddress, setNewAddress] = useState({ label: "Other", line: "" });
  const visible = addresses.filter(a => `${a.label} ${a.line}`.toLowerCase().includes(query.toLowerCase()));
  const save = () => { if (!newAddress.line.trim()) return; const address = { id: Date.now(), ...newAddress }; setAddresses(prev => [...prev, address]); setSelected(address.id); setAdding(false); setNewAddress({ label: "Other", line: "" }); };
  return <section className="page"><Header title="Delivery address" onBack={back}/><div className="map-placeholder"><div><Icon name="pin" size={28}/></div><b>Map preview</b><small>Static prototype map · GPS is not active</small></div><label className="search"><Icon name="search"/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Filter saved addresses"/></label><SectionTitle title="Saved places"/><div className="address-list">{visible.map(address => <div className={selected === address.id ? "selected" : ""} key={address.id}><button onClick={() => setSelected(address.id)}><i>{selected === address.id && <Icon name="check" size={14}/>}</i><span><b>{address.label}</b><small>{address.line}</small></span></button><IconButton icon="trash" label={`Remove ${address.label}`} onClick={() => { setAddresses(prev => prev.filter(a => a.id !== address.id)); if (selected === address.id) setSelected(0); }}/></div>)}</div>
    {adding ? <div className="form-card add-address"><div className="segmented">{["Home", "Work", "Other"].map(label => <button className={newAddress.label === label ? "active" : ""} key={label} onClick={() => setNewAddress({ ...newAddress, label })}>{label}</button>)}</div><Field label="Street address" placeholder="Building, street, suburb, city" value={newAddress.line} onChange={e => setNewAddress({ ...newAddress, line: e.target.value })}/><div><Button variant="secondary" onClick={() => setAdding(false)}>Cancel</Button><Button onClick={save} disabled={!newAddress.line.trim()}>Save address</Button></div></div> : <Button variant="secondary" onClick={() => setAdding(true)}><Icon name="plus"/> Add new address</Button>}
    <Button onClick={done} disabled={!selected}>Use selected address</Button><div className="store-address"><Icon name="store"/><span><b>LunoBite demo store</b><small>24 Lavender Lane, Umhlanga Ridge, Durban, KwaZulu-Natal, 4319</small></span></div>
  </section>;
}

function Profile({ profile, setProfile, order, go, onLogout }: { profile: { name: string; email: string; phone: string }; setProfile: (p: { name: string; email: string; phone: string }) => void; order: Order | null; go: (s: Screen) => void; onLogout: () => void }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(profile);
  return <section className="page profile-page"><Header title="Profile"/><div className="profile-hero"><div>{profile.name ? profile.name.split(" ").map(n => n[0]).join("").slice(0,2) : "LB"}</div><span><h2>{profile.name || "Guest foodie"}</h2><p>{profile.email || "Browsing in guest mode"}</p></span><IconButton icon="edit" label="Edit profile" onClick={() => setEditing(true)}/></div>
    {editing && <div className="form-card"><Field label="Name" value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })}/><Field label="Email" type="email" value={draft.email} onChange={e => setDraft({ ...draft, email: e.target.value })}/><Field label="Phone" value={draft.phone} onChange={e => setDraft({ ...draft, phone: e.target.value })}/><div className="form-actions"><Button variant="secondary" onClick={() => setEditing(false)}>Cancel</Button><Button onClick={() => { setProfile(draft); setEditing(false); }}>Save changes</Button></div></div>}
    <div className="profile-links"><ProfileLink icon="pin" title="Saved addresses" subtitle="Manage delivery locations" onClick={() => go("location")}/><ProfileLink icon="heart" title="Favourite foods" subtitle="Your saved cravings" onClick={() => go("favourites")}/><ProfileLink icon="phone" title="Contact support" subtitle="We’re here to help" onClick={() => go("contact")}/></div>
    <SectionTitle title="Order history"/>{order ? <button className="history-card" onClick={() => go("order")}><span><b>Order #{order.number}</b><small>{order.date} · {order.items.length} items</small></span><b>{money(order.total)}</b><Icon name="chevron"/></button> : <div className="no-orders">Your demonstration orders will appear here.</div>}<Button variant="ghost" onClick={onLogout}>Log out of demo session</Button>
  </section>;
}

function ProfileLink({ icon, title, subtitle, onClick }: { icon: IconName; title: string; subtitle: string; onClick: () => void }) {
  return <button onClick={onClick}><i><Icon name={icon}/></i><span><b>{title}</b><small>{subtitle}</small></span><Icon name="chevron"/></button>;
}

function Contact({ back, go, toast }: { back: () => void; go: (s: Screen) => void; toast: (s: string) => void }) {
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const submit = (e: FormEvent) => { e.preventDefault(); const next: Record<string, string> = {}; if (!values.name.trim()) next.name = "Your name is required"; if (!/\S+@\S+\.\S+/.test(values.email)) next.email = "Enter a valid email"; if (!values.subject.trim()) next.subject = "Add a subject"; if (values.message.trim().length < 10) next.message = "Tell us a little more"; setErrors(next); if (!Object.keys(next).length) { toast("Demo message saved — no email was sent"); setValues({ name: "", email: "", subject: "", message: "" }); } };
  return <section className="page contact"><Header title="Contact us" onBack={back}/><div className="contact-intro"><Logo/><h2>We&apos;re here to help</h2><p>Questions, feedback or just want to talk food? Reach out to LunoBite Food Delivery.</p><small>Sample business information for this prototype.</small></div><div className="contact-cards"><a href="tel:+27315550148"><Icon name="phone"/><span><b>Call us</b><small>+27 31 555 0148</small></span></a><a href="mailto:hello@lunobite.example"><Icon name="mail"/><span><b>Email us</b><small>hello@lunobite.example</small></span></a><a href="https://www.google.com/maps/search/?api=1&query=24+Lavender+Lane+Umhlanga+Ridge+Durban" target="_blank" rel="noreferrer"><Icon name="pin"/><span><b>Visit us</b><small>24 Lavender Lane, Umhlanga Ridge, Durban, 4319</small></span></a><div><Icon name="clock"/><span><b>Business hours</b><small>Monday–Sunday, 09:00–22:00</small></span></div></div>
    <Button variant="secondary" onClick={() => go("faq")}>Browse frequently asked questions <Icon name="chevron"/></Button><SectionTitle title="Send a demo message" subtitle="This form does not send real email."/><form onSubmit={submit}><Field label="Name" value={values.name} onChange={e => setValues({ ...values, name: e.target.value })} error={errors.name}/><Field label="Email" type="email" value={values.email} onChange={e => setValues({ ...values, email: e.target.value })} error={errors.email}/><Field label="Subject" value={values.subject} onChange={e => setValues({ ...values, subject: e.target.value })} error={errors.subject}/><label className="field"><span>Message</span><textarea value={values.message} onChange={e => setValues({ ...values, message: e.target.value })} className={errors.message ? "error" : ""}/>{errors.message && <small className="error-text">{errors.message}</small>}</label><Button type="submit">Submit demo enquiry</Button></form></section>;
}

function Faq({ back }: { back: () => void }) {
  const [open, setOpen] = useState(0);
  const faqs = [["Is LunoBite a real delivery service?", "No. This portfolio experience uses fictional restaurants, sample contact information and demonstration orders."], ["How does the delivery fee work?", "Delivery is R29 for orders below R350 and free from R350."], ["Does the app process payments?", "No. All checkout methods are clearly simulated and no financial details are collected."], ["Can I browse without an account?", "Yes. You can browse, customise food and use the full demonstration checkout as a guest."]];
  return <section className="page"><Header title="Frequently asked questions" onBack={back}/><div className="faq-list">{faqs.map(([q, a], index) => <button className={open === index ? "open" : ""} key={q} onClick={() => setOpen(open === index ? -1 : index)}><span><b>{q}</b><Icon name="chevron"/></span>{open === index && <p>{a}</p>}</button>)}</div></section>;
}

function Empty({ title, text, action, onAction }: { title: string; text: string; action: string; onAction: () => void }) {
  return <div className="empty"><div><Icon name="bag" size={42}/><i>✦</i></div><h2>{title}</h2><p>{text}</p><Button onClick={onAction}>{action}</Button></div>;
}

export default App;
