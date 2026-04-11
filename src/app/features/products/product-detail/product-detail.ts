import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail implements OnInit{
  currencySymbol = environment.currencySymbol;

  product = signal<any>(null);
  quantity = signal(1);
  selectedTab = signal('description');

allProducts = [
    { id: 1, name: 'Non-Stick Frying Pan', category: 'kitchenware', categoryName: 'Kitchenware', price: 1850, originalPrice: 2200, badge: 'Best Seller', emoji: '🍳', rating: 4.5, reviews: 128, inStock: true, description: 'Premium non-stick frying pan perfect for everyday cooking. Features a durable coating that ensures food does not stick and easy cleanup after cooking.', specs: [ { label: 'Material', value: 'Aluminium with non-stick coating' }, { label: 'Size', value: '24cm diameter' }, { label: 'Weight', value: '800g' }, { label: 'Compatible', value: 'Gas, Electric, Induction' } ] },
    { id: 2, name: 'Kitchen Knife Set', category: 'kitchenware', categoryName: 'Kitchenware', price: 2800, originalPrice: 3200, badge: 'Best Seller', emoji: '🔪', rating: 4.8, reviews: 95, inStock: true, description: 'Professional kitchen knife set including chef knife, bread knife, and paring knife. Made from high-carbon stainless steel for lasting sharpness.', specs: [ { label: 'Material', value: 'High-carbon stainless steel' }, { label: 'Pieces', value: '3 knives + block' }, { label: 'Handle', value: 'Ergonomic grip' }, { label: 'Dishwasher Safe', value: 'No — hand wash only' } ] },
    { id: 3, name: 'Cutting Board', category: 'kitchenware', categoryName: 'Kitchenware', price: 950, originalPrice: null, badge: null, emoji: '🪵', rating: 4.2, reviews: 64, inStock: true, description: 'Large wooden cutting board with juice groove around the edges. Naturally antimicrobial and gentle on knife blades.', specs: [ { label: 'Material', value: 'Solid bamboo wood' }, { label: 'Size', value: '40cm x 25cm' }, { label: 'Thickness', value: '2cm' }, { label: 'Care', value: 'Hand wash, oil regularly' } ] },
    { id: 4, name: 'Bowl Set', category: 'kitchenware', categoryName: 'Kitchenware', price: 1200, originalPrice: null, badge: 'New', emoji: '🥣', rating: 4.0, reviews: 32, inStock: true, description: 'Set of 6 mixing bowls in graduated sizes. Ideal for meal prep, baking, and serving. Stackable design saves cabinet space.', specs: [ { label: 'Material', value: 'Stainless steel' }, { label: 'Pieces', value: '6 bowls' }, { label: 'Sizes', value: '14cm to 30cm' }, { label: 'Dishwasher Safe', value: 'Yes' } ] },
    { id: 5, name: 'Aluminium Storage Bin', category: 'aluminium', categoryName: 'Aluminium', price: 2400, originalPrice: null, badge: 'New', emoji: '🪣', rating: 4.3, reviews: 47, inStock: true, description: 'Heavy duty aluminium storage bin suitable for home and industrial use. Rust resistant and easy to clean.', specs: [ { label: 'Material', value: 'Heavy gauge aluminium' }, { label: 'Capacity', value: '20 litres' }, { label: 'Dimensions', value: '30cm x 40cm' }, { label: 'Lid', value: 'Included' } ] },
    { id: 6, name: 'Aluminium Ladder', category: 'aluminium', categoryName: 'Aluminium', price: 8500, originalPrice: null, badge: 'New', emoji: '🪜', rating: 4.6, reviews: 38, inStock: true, description: 'Heavy duty aluminium step ladder with non-slip rubber feet. Lightweight yet strong enough to hold up to 150kg safely.', specs: [ { label: 'Material', value: 'Aircraft grade aluminium' }, { label: 'Steps', value: '6 steps' }, { label: 'Max Load', value: '150kg' }, { label: 'Height', value: '180cm' } ] },
    { id: 7, name: 'Water Bucket', category: 'aluminium', categoryName: 'Aluminium', price: 750, originalPrice: 900, badge: 'Sale', emoji: '🧺', rating: 4.1, reviews: 82, inStock: true, description: 'Standard aluminium water bucket for household and industrial use. Durable, lightweight, and rust resistant.', specs: [ { label: 'Material', value: 'Aluminium' }, { label: 'Capacity', value: '12 litres' }, { label: 'Handle', value: 'Steel wire handle' }, { label: 'Weight', value: '400g' } ] },
    { id: 8, name: 'Storage Rack', category: 'aluminium', categoryName: 'Aluminium', price: 3200, originalPrice: null, badge: null, emoji: '🗄️', rating: 4.4, reviews: 29, inStock: false, description: 'Multi-tier aluminium storage rack for garage, kitchen, or warehouse. Easy to assemble with no tools required.', specs: [ { label: 'Material', value: 'Aluminium frame' }, { label: 'Tiers', value: '4 shelves' }, { label: 'Max Load', value: '50kg per shelf' }, { label: 'Assembly', value: 'Tool free' } ] },
    { id: 9, name: 'Plastic Storage Box', category: 'plastic', categoryName: 'Plastic', price: 650, originalPrice: null, badge: null, emoji: '🧴', rating: 4.0, reviews: 110, inStock: true, description: 'Stackable plastic storage box with secure lid. Perfect for organising clothes, toys, documents, and household items.', specs: [ { label: 'Material', value: 'High density polyethylene' }, { label: 'Capacity', value: '30 litres' }, { label: 'Lid', value: 'Clip-on secure lid' }, { label: 'Stackable', value: 'Yes' } ] },
    { id: 10, name: 'Plastic Containers Set', category: 'plastic', categoryName: 'Plastic', price: 1100, originalPrice: 1300, badge: 'Sale', emoji: '🫙', rating: 4.2, reviews: 76, inStock: true, description: 'Set of airtight plastic food containers in various sizes. BPA free and microwave safe for safe food storage.', specs: [ { label: 'Material', value: 'BPA free plastic' }, { label: 'Pieces', value: '8 containers' }, { label: 'Microwave Safe', value: 'Yes' }, { label: 'Dishwasher Safe', value: 'Yes' } ] },
    { id: 11, name: 'Gift Hamper Set', category: 'gift-items', categoryName: 'Gift Items', price: 3500, originalPrice: 4000, badge: 'Sale', emoji: '🎁', rating: 4.9, reviews: 203, inStock: true, description: 'Beautifully curated gift hamper perfect for birthdays, weddings, and celebrations. Includes premium items presented in an elegant basket.', specs: [ { label: 'Contents', value: 'Varies by season' }, { label: 'Presentation', value: 'Wicker basket with ribbon' }, { label: 'Occasion', value: 'All occasions' }, { label: 'Customisable', value: 'Yes — contact us' } ] },
    { id: 12, name: 'Candle Gift Set', category: 'gift-items', categoryName: 'Gift Items', price: 1800, originalPrice: 2100, badge: 'Sale', emoji: '🕯️', rating: 4.7, reviews: 89, inStock: true, description: 'Elegant scented candle gift set with three candles in different fragrances. Long burning with up to 40 hours per candle.', specs: [ { label: 'Pieces', value: '3 candles' }, { label: 'Burn Time', value: '40 hours each' }, { label: 'Scents', value: 'Rose, Jasmine, Sandalwood' }, { label: 'Wax', value: 'Natural soy wax' } ] },
    { id: 13, name: 'Photo Frame Set', category: 'gift-items', categoryName: 'Gift Items', price: 1200, originalPrice: null, badge: null, emoji: '🖼️', rating: 4.3, reviews: 54, inStock: true, description: 'Set of decorative photo frames in matching design. Perfect for displaying family memories on walls or tabletops.', specs: [ { label: 'Pieces', value: '3 frames' }, { label: 'Sizes', value: '4x6, 5x7, 8x10 inches' }, { label: 'Material', value: 'Wood and glass' }, { label: 'Orientation', value: 'Portrait and landscape' } ] },
    { id: 14, name: 'Folding Umbrella', category: 'umbrellas', categoryName: 'Umbrellas', price: 950, originalPrice: 1100, badge: 'Sale', emoji: '☂️', rating: 4.5, reviews: 167, inStock: true, description: 'Compact folding umbrella with automatic open and close button. Windproof frame and UV protection coating.', specs: [ { label: 'Diameter', value: '100cm when open' }, { label: 'Weight', value: '280g' }, { label: 'UV Protection', value: 'UPF 50+' }, { label: 'Windproof', value: 'Up to 60km/h' } ] },
    { id: 15, name: 'Golf Umbrella', category: 'umbrellas', categoryName: 'Umbrellas', price: 2200, originalPrice: null, badge: 'New', emoji: '⛱️', rating: 4.6, reviews: 43, inStock: true, description: 'Extra large golf umbrella providing maximum coverage. Double canopy design allows wind to pass through preventing inversion.', specs: [ { label: 'Diameter', value: '150cm when open' }, { label: 'Frame', value: 'Fibreglass — windproof' }, { label: 'Canopy', value: 'Double layer vented' }, { label: 'Handle', value: 'Rubber grip' } ] },
    { id: 16, name: 'LED Ceiling Light', category: 'lighting', categoryName: 'Lighting', price: 1200, originalPrice: null, badge: null, emoji: '💡', rating: 4.4, reviews: 91, inStock: true, description: 'Modern LED ceiling light with warm white glow. Energy efficient and long lasting with up to 25000 hours lifespan.', specs: [ { label: 'Wattage', value: '18W' }, { label: 'Lumens', value: '1800lm' }, { label: 'Colour Temp', value: '3000K warm white' }, { label: 'Lifespan', value: '25000 hours' } ] },
    { id: 17, name: 'LED Bulb Pack', category: 'lighting', categoryName: 'Lighting', price: 850, originalPrice: null, badge: null, emoji: '🔆', rating: 4.2, reviews: 145, inStock: true, description: 'Pack of 6 LED bulbs replacing 60W incandescent bulbs while using only 9W. Instant full brightness with no warm up time.', specs: [ { label: 'Wattage', value: '9W — replaces 60W' }, { label: 'Pack', value: '6 bulbs' }, { label: 'Base', value: 'E27 screw' }, { label: 'Lifespan', value: '15000 hours' } ] },
    { id: 18, name: 'Table Lamp', category: 'lighting', categoryName: 'Lighting', price: 1800, originalPrice: 2100, badge: 'Sale', emoji: '🪔', rating: 4.5, reviews: 67, inStock: true, description: 'Elegant table lamp with adjustable brightness. Perfect for bedside, desk, or living room. Modern design complements any interior.', specs: [ { label: 'Height', value: '45cm' }, { label: 'Shade', value: 'Fabric shade' }, { label: 'Bulb', value: 'E14 — included' }, { label: 'Switch', value: 'Touch dimmer' } ] },
    { id: 19, name: 'Storage Basket', category: 'general', categoryName: 'General', price: 880, originalPrice: null, badge: null, emoji: '🧺', rating: 4.1, reviews: 38, inStock: true, description: 'Woven storage basket for organising towels, magazines, toys, and more. Natural material that looks great in any room.', specs: [ { label: 'Material', value: 'Natural seagrass' }, { label: 'Size', value: '35cm x 25cm x 20cm' }, { label: 'Handles', value: 'Yes' }, { label: 'Foldable', value: 'No' } ] },
    { id: 20, name: 'Cleaning Set', category: 'general', categoryName: 'General', price: 1450, originalPrice: 1700, badge: 'Sale', emoji: '🧹', rating: 4.3, reviews: 72, inStock: true, description: 'Complete household cleaning set including mop, broom, dustpan, and scrubbing brush. Everything you need for a clean home.', specs: [ { label: 'Pieces', value: '4 items' }, { label: 'Mop Type', value: 'Flat microfibre mop' }, { label: 'Handle', value: 'Extendable aluminium' }, { label: 'Suitable For', value: 'All floor types' } ] },
  ];

  relatedProducts: any[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(){
    this.route.params.subscribe(params => {
      const id = +params['id'];
      const found = this.allProducts.find(p => p.id === id);
      this.product.set(found || null);
      if (found) {
        this.relatedProducts = this.allProducts
        .filter(p => p.category === found.category && p.id !== found.id)
        .slice(0, 4);
      }
    });
  }

  get discountPercent() {
    const p = this.product();
    if (!p || !p.originalPrice) return null;
    return Math.round((1-p.price / p.originalPrice) * 100);
  }

  increaseQty() {
    this.quantity.set(this.quantity() + 1);
  }

  decreaseQty() {
    if(this.quantity() > 1) this.quantity.set(this.quantity() - 1);
  }

  addToCart() {
    console.log('Added to cart:', this.product(), 'Qty:', this.quantity());
  }

  setTab(tab: string) {
    this.selectedTab.set(tab);
  }
}
