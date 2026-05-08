export const recentProjects = [
  { id: "1", name: "Skyline Balcony Retreat", client: "Mehta Residence · Mumbai", status: "In Review", type: "Balcony · 120 sq ft", time: "2h ago", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80" },
  { id: "2", name: "Tropical Terrace Garden", client: "Kapoor Villa · Goa", status: "Approved", type: "Terrace · 640 sq ft", time: "Yesterday", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=80" },
  { id: "3", name: "Zen Courtyard", client: "Iyer Estate · Bengaluru", status: "Draft", type: "Garden · 880 sq ft", time: "3d ago", image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=900&q=80" },
  { id: "4", name: "Café Rooftop Lounge", client: "Brew & Bloom Co. · Pune", status: "Delivered", type: "Terrace · 1100 sq ft", time: "5d ago", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900&q=80" },
];

export const teamActivity = [
  { initials: "AS", name: "Aanya Sharma", action: "approved render for", target: "Skyline Balcony Retreat", time: "12m ago" },
  { initials: "VR", name: "Vikram Rao", action: "added 4 plants to", target: "Zen Courtyard", time: "1h ago" },
  { initials: "PN", name: "Priya Nair", action: "shared quotation for", target: "Café Rooftop Lounge", time: "3h ago" },
  { initials: "DJ", name: "Daniel Joseph", action: "uploaded site photos to", target: "Luxury Penthouse Garden", time: "Yesterday" },
];

export const stats = [
  { label: "Active projects", value: "24", delta: "+12% vs last week", icon: "layers" },
  { label: "Renders this week", value: "187", delta: "+38% vs last week", icon: "sparkles" },
  { label: "Quotations sent", value: "₹48.2L", delta: "+9% vs last week", icon: "trending" },
  { label: "Team members", value: "12", delta: "+2 vs last week", icon: "users" },
];

export const assetCategories = [
  { id: "plants", label: "Plants", icon: "🌿" },
  { id: "pots", label: "Pots", icon: "🪴" },
  { id: "pergolas", label: "Pergolas", icon: "🏛️" },
  { id: "seating", label: "Seating", icon: "🪑" },
  { id: "tables", label: "Tables", icon: "🍽️" },
  { id: "flooring", label: "Flooring", icon: "🧱" },
  { id: "railings", label: "Railings", icon: "🚧" },
  { id: "lighting", label: "Lighting", icon: "💡" },
  { id: "decor", label: "Decor", icon: "🕯️" },
  { id: "vertical", label: "Vertical Garden", icon: "🌱" },
  { id: "water", label: "Water Features", icon: "💧" },
];

export const plantAssets = [
  { name: "Areca Palm", price: "₹1,200" },
  { name: "Monstera Deliciosa", price: "₹950" },
  { name: "Snake Plant", price: "₹480" },
  { name: "Bird of Paradise", price: "₹2,400" },
  { name: "Bougainvillea", price: "₹650" },
  { name: "Jasmine Vine", price: "₹380" },
];

export const templates = [
  { name: "Petite Parisian Balcony", theme: "Minimal", size: "60–120 sq ft", price: "₹0.9L", tier: "Modern", image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=900&q=80" },
  { name: "Tuscan Terrace", theme: "Luxury", size: "400–700 sq ft", price: "₹4.8L", tier: "Luxury", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80" },
  { name: "Bali Tropical Escape", theme: "Tropical", size: "300–600 sq ft", price: "₹3.6L", tier: "Modern", image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=900&q=80" },
  { name: "Kyoto Zen Court", theme: "Zen", size: "500–900 sq ft", price: "₹4.1L", tier: "Traditional", image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=900&q=80" },
  { name: "Brooklyn Loft Patio", theme: "Contemporary", size: "150–300 sq ft", price: "₹2.2L", tier: "Modern", image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=900&q=80" },
  { name: "Cottage Wildflower", theme: "Organic", size: "200–500 sq ft", price: "₹1.8L", tier: "Traditional", image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=900&q=80" },
  { name: "Riviera Café Deck", theme: "Café-style", size: "400–800 sq ft", price: "₹5.4L", tier: "Modern", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80" },
  { name: "Skyline Penthouse", theme: "Luxury", size: "1000+ sq ft", price: "₹18.5L", tier: "Luxury", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900&q=80" },
];

export const quotationGroups = [
  { name: "Materials", total: 209600, items: [
    { label: "IPE Wood Decking (per sq ft)", qty: 120, unit: 380 },
    { label: "Teak Pergola 8×8", qty: 1, unit: 78000 },
    { label: "Modular Green Wall (panel)", qty: 4, unit: 18500 },
    { label: "Areca Palm (tall)", qty: 6, unit: 1200 },
    { label: "Festoon String 20m", qty: 2, unit: 2400 },
  ]},
  { name: "Labor", total: 44400, items: [
    { label: "Skilled installation (3 days × 4 crew)", qty: 12, unit: 2200 },
    { label: "Designer site supervision", qty: 1, unit: 18000 },
  ]},
  { name: "Transportation", total: 14500, items: [
    { label: "Material delivery & lift", qty: 1, unit: 14500 },
  ]},
  { name: "Installation", total: 22000, items: [
    { label: "Waterproofing prep", qty: 1, unit: 14000 },
    { label: "Electrical & lighting fit", qty: 1, unit: 8000 },
  ]},
  { name: "Maintenance", total: 34000, items: [
    { label: "Quarterly visit (12 months)", qty: 4, unit: 8500 },
  ]},
];
