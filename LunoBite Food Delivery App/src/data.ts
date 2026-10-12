export type Category =
  | "All"
  | "Burgers"
  | "Pizza"
  | "Fried chicken"
  | "Fries and sides"
  | "Sandwiches and wraps"
  | "Traditional meals"
  | "Rice and bowls"
  | "Pasta"
  | "Snacks"
  | "Cakes and desserts"
  | "Ice cream"
  | "Milkshakes and smoothies"
  | "Cold drinks and juices"
  | "Coffee and hot drinks"
  | "Healthy food"
  | "Vegetarian options"
  | "Breakfast";

export type Product = {
  id: number;
  name: string;
  category: Category;
  description: string;
  price: number;
  image: string;
  restaurant: string;
  rating: number;
  label?: string;
  options?: { name: string; price: number }[];
  extras?: { name: string; price: number }[];
};

const photos = [
  "https://cdn.pixabay.com/photo/2024/05/18/10/13/cheese-burger-8770017_1280.png",
  "https://images.unsplash.com/photo-1638425793674-32119fffb3d5?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1781332146307-8cde54158c2c?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1758157835950-ceeda86f4693?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1777333033648-fbd302136374?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1775595712043-50ae4b305124?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1695457205928-6cc9ef726af0?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1772494048070-9fd1d7aa3fde?auto=format&fit=crop&w=900&q=85",
];

export const categories: Category[] = [
  "All", "Burgers", "Pizza", "Fried chicken", "Fries and sides",
  "Sandwiches and wraps", "Traditional meals", "Rice and bowls", "Pasta",
  "Snacks", "Cakes and desserts", "Ice cream", "Milkshakes and smoothies",
  "Cold drinks and juices", "Coffee and hot drinks", "Healthy food",
  "Vegetarian options", "Breakfast",
];

const bases: (Omit<Product, "id" | "image" | "rating"> & { image?: string })[] = [
  { name: "Lunar Smash Burger", category: "Burgers", description: "Double beef, mature cheddar, pickles and moon sauce.", price: 109.9, restaurant: "Moonlight Burgers", label: "Bestseller", options: [{ name: "Single", price: 0 }, { name: "Double", price: 32 }], extras: [{ name: "Extra cheese", price: 14 }, { name: "Crispy bacon", price: 22 }] },
  { name: "Purple Heat Pizza", category: "Pizza", description: "Pepperoni, red onion, jalapeño and hot honey.", image: "https://img.magnific.com/premium-photo/pizza-with-pepperoni-mozzarella-cheese-purple-plate_856795-37403.jpg", price: 139, restaurant: "Purple Crust Pizza", label: "20% off", options: [{ name: "Medium", price: 0 }, { name: "Large", price: 45 }], extras: [{ name: "Extra mozzarella", price: 18 }, { name: "Olives", price: 12 }] },
  { name: "Cloud Crunch Box", category: "Fried chicken", description: "Three golden chicken pieces, slaw and house gravy.", image: "https://img.magnific.com/premium-photo/fried-crispy-chicken-fries_943471-3729.jpg", price: 119.9, restaurant: "Crispy Cloud Chicken", options: [{ name: "Original", price: 0 }, { name: "Hot", price: 0 }], extras: [{ name: "Extra dip", price: 10 }] },
  { name: "Loaded Orbit Fries", category: "Fries and sides", description: "Crispy fries, cheese sauce, spring onion and chilli.", image: "https://therecipe.website/wp-content/uploads/2025/12/Chili-Cheese-Fries.jpg", price: 64.9, restaurant: "Moonlight Burgers", label: "Popular" },
  { name: "Sunrise Chicken Wrap", category: "Sandwiches and wraps", description: "Grilled chicken, avocado, tomato and herb yoghurt.", image: "https://claraplate.com/wp-content/uploads/2026/04/Chicken-Wrap-.webp", price: 89.9, restaurant: "Fresh Vibe Kitchen", label: "High protein" },
  { name: "Durban Bunny Chow", category: "Traditional meals", description: "A quarter loaf filled with fragrant lamb curry.", image: "https://i.pinimg.com/originals/b7/02/fb/b702fb908abf905e91479ef8128b83d7.jpg", price: 128, restaurant: "Fresh Vibe Kitchen", label: "Local favourite" },
  { name: "Teriyaki Glow Bowl", category: "Rice and bowls", description: "Sticky chicken, edamame, sesame slaw and rice.", image:"https://img.hellofresh.com/hellofresh_s3/image/HF_Y26_R77_W05_UK_SRC47023-3_Main_high-5b12f2ad.jpg", price: 112, restaurant: "Fresh Vibe Kitchen" },
  { name: "Creamy Comet Alfredo", category: "Pasta", description: "Tagliatelle, grilled chicken, parmesan and herbs.", image:"https://img.magnific.com/premium-photo/delicious-grilled-chicken-alfredo-pasta-with-fresh-parmesan-herbs-gourmet-dining-experience_416256-50763.jpg?w=1060", price: 124.9, restaurant: "Purple Crust Pizza" },
  { name: "Crispy Halloumi Bites", category: "Snacks", description: "Golden halloumi with sweet chilli dip.", image:"https://recipekind.com/wp-content/uploads/2026/02/0_2-1772038535988.jpeg", price: 69, restaurant: "Fresh Vibe Kitchen", label: "Vegetarian" },
  { name: "Velvet Moon Slice", category: "Cakes and desserts", description: "Red velvet cake, cream cheese icing and berry crumb.", image:"https://www.cakezy.net/img.php?f=decadent-red-velvet-poke-cake-recipe_featured_401.jpg&w=1200", price: 62, restaurant: "Sweet Orbit Desserts", label: "Sweet pick" },
  { name: "Salted Caramel Scoop", category: "Ice cream", description: "Two scoops with caramel ripple and cookie crunch.", image:"https://www.loveandoliveoil.com/wp-content/uploads/2016/09/caramel-cookie-ice-creamH2.jpg", price: 54, restaurant: "Chill Scoop Ice Cream", options: [{ name: "Cup", price: 0 }, { name: "Waffle cone", price: 8 }] },
  { name: "Berry Cloud Smoothie", category: "Milkshakes and smoothies", description: "Mixed berries, banana, yoghurt and local honey.", image: "https://img.magnific.com/premium-photo/mixed-berry-smoothie-with-banana_639785-175962.jpg", price: 58, restaurant: "Fresh Vibe Kitchen", label: "Vegetarian", options: [{ name: "Regular", price: 0 }, { name: "Large", price: 14 }] },
  { name: "Pressed Citrus Glow", category: "Cold drinks and juices", description: "Orange, pineapple, lemon and fresh mint.", image:"https://i.pinimg.com/736x/1a/4e/9b/1a4e9b471009b855cad0309d9ff23e11.jpg", price: 42, restaurant: "Fresh Vibe Kitchen" },
  { name: "Lavender Oat Latte", category: "Coffee and hot drinks", description: "Espresso, oat milk and a whisper of lavender.", image: "https://www.roastycoffee.com/wp-content/uploads/cropped-Iced-Ube-Latte-Recipe-2.jpeg", price: 48, restaurant: "Sweet Orbit Desserts", options: [{ name: "Regular", price: 0 }, { name: "Large", price: 8 }], extras: [{ name: "Extra shot", price: 9 }, { name: "Vanilla syrup", price: 7 }] },
  { name: "Green Goddess Salad", category: "Healthy food", description: "Leafy greens, avocado, cucumber, quinoa and herbs.", image:"https://easyweeknightrecipes.net/wp-content/uploads/2026/02/15-minute-green-goddess-salad-recipe-with-creamy-d-2026-02-25-203919.webp", price: 96, restaurant: "Fresh Vibe Kitchen", label: "Vegan" },
  { name: "Garden Moon Burger", category: "Vegetarian options", description: "Crispy chickpea patty, slaw and tahini dressing.", image:"https://recipesbyelina.com/wp-content/uploads/2025/10/Chickpea-Burgers-with-Tahini-Sauce.jpg", price: 94, restaurant: "Moonlight Burgers", label: "Vegetarian" },
  { name: "Morning Orbit Stack", category: "Breakfast", description: "Fluffy pancakes, berries, mascarpone and maple.", image:"https://png.pngtree.com/thumb_back/fh260/background/20231103/pngtree-vertical-orientation-fluffy-berry-topped-pancakes-on-a-textured-background-image_13760563.png", price: 82, restaurant: "Sweet Orbit Desserts", label: "New" },
  { name: "Margherita Moon", category: "Pizza", description: "Tomato, fior di latte, basil and olive oil.", image: "https://pizzana.com/cdn/shop/products/Margherita1_800x.png?v=1681446045", price: 115, restaurant: "Purple Crust Pizza", label: "Vegetarian", options: [{ name: "Medium", price: 0 }, { name: "Large", price: 38 }] },
  { name: "Hot Honey Wings", category: "Fried chicken", description: "Eight sticky wings with ranch and pickled cucumber.", image: "https://www.cookingclassy.com/wp-content/uploads/2020/01/buffalo-wings-1-1033x1536.jpg", price: 98, restaurant: "Crispy Cloud Chicken", label: "New" },
  { name: "Choco Nebula Shake", category: "Milkshakes and smoothies", description: "Chocolate gelato, brownie crumb and whipped cream.", image: "https://www.recipesbydina.com/wp-content/uploads/2026/01/owcfyprgwxwodlcb7ljt.webp", price: 66, restaurant: "Chill Scoop Ice Cream" },
];

export const products: Product[] = bases.map((item, index) => ({
  ...item,
  id: index + 1,
  image: (item as { image?: string }).image || photos[index % photos.length],
  rating: [4.8, 4.7, 4.9, 4.6][index % 4],
}));

export type Restaurant = {
  name: string;
  cuisine: string;
  rating: number;
  time: string;
  fee: number;
  minimum: number;
  image: string;
};

export const restaurants: Restaurant[] = [
  { name: "Moonlight Burgers", cuisine: "Smash burgers · American", rating: 4.8, time: "25–35 min", fee: 24, minimum: 80, image: photos[0] },
  { name: "Purple Crust Pizza", cuisine: "Pizza · Italian", rating: 4.7, time: "30–40 min", fee: 19, minimum: 100, image: photos[1] },
  { name: "Crispy Cloud Chicken", cuisine: "Fried chicken · Wings", rating: 4.9, time: "20–30 min", fee: 22, minimum: 70, image: photos[2] },
  { name: "Sweet Orbit Desserts", cuisine: "Desserts · Coffee", rating: 4.8, time: "20–25 min", fee: 18, minimum: 60, image: photos[4] },
  { name: "Chill Scoop Ice Cream", cuisine: "Ice cream · Shakes", rating: 4.6, time: "15–25 min", fee: 20, minimum: 50, image: photos[5] },
  { name: "Fresh Vibe Kitchen", cuisine: "Healthy · Local", rating: 4.9, time: "25–35 min", fee: 16, minimum: 80, image: photos[7] },
];

export type Address = { id: number; label: string; line: string };

export const initialAddresses: Address[] = [
  { id: 1, label: "Home", line: "18 Palm View, Umhlanga Ridge, Durban" },
  { id: 2, label: "Work", line: "6 Meridian Drive, Umhlanga Ridge, Durban" },
];
