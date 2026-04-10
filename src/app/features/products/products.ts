import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit {
  currencySymbol = environment.currencySymbol;

  selectedCategory = signal('');
  selectedSort = signal('default');
  searchQuery = signal('');
  priceRange = signal(50000);
  viewMode = signal<'grid' | 'list'> ('grid');

   categories = [
    { name: 'All Categories', slug: '' },
    { name: 'Kitchenware', slug: 'kitchenware' },
    { name: 'Aluminium', slug: 'aluminium' },
    { name: 'Plastic', slug: 'plastic' },
    { name: 'Gift Items', slug: 'gift-items' },
    { name: 'Umbrellas', slug: 'umbrellas' },
    { name: 'Lighting', slug: 'lighting' },
    { name: 'General', slug: 'general' },
  ];

  sortOptions = [
    { label: 'Default', value: 'default' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Newest First', value: 'newest' },
    { label: 'Best Seller', value: 'best' },
  ];

  allProducts = [
    { id: 1, name: 'Non-Stick Frying Pan', category: 'kitchenware', price: 1850, originalPrice: 2200, badge: 'Best Seller', emoji: '🍳', rating: 4.5, reviews: 128, inStock: true },
    { id: 2, name: 'Kitchen Knife Set', category: 'kitchenware', price: 2800, originalPrice: 3200, badge: 'Best Seller', emoji: '🔪', rating: 4.8, reviews: 95, inStock: true },
    { id: 3, name: 'Cutting Board', category: 'kitchenware', price: 950, originalPrice: null, badge: null, emoji: '🪵', rating: 4.2, reviews: 64, inStock: true },
    { id: 4, name: 'Bowl Set', category: 'kitchenware', price: 1200, originalPrice: null, badge: 'New', emoji: '🥣', rating: 4.0, reviews: 32, inStock: true },
    { id: 5, name: 'Aluminium Storage Bin', category: 'aluminium', price: 2400, originalPrice: null, badge: 'New', emoji: '🪣', rating: 4.3, reviews: 47, inStock: true },
    { id: 6, name: 'Aluminium Ladder', category: 'aluminium', price: 8500, originalPrice: null, badge: 'New', emoji: '🪜', rating: 4.6, reviews: 38, inStock: true },
    { id: 7, name: 'Water Bucket', category: 'aluminium', price: 750, originalPrice: 900, badge: 'Sale', emoji: '🧺', rating: 4.1, reviews: 82, inStock: true },
    { id: 8, name: 'Storage Rack', category: 'aluminium', price: 3200, originalPrice: null, badge: null, emoji: '🗄️', rating: 4.4, reviews: 29, inStock: false },
    { id: 9, name: 'Plastic Storage Box', category: 'plastic', price: 650, originalPrice: null, badge: null, emoji: '🧴', rating: 4.0, reviews: 110, inStock: true },
    { id: 10, name: 'Plastic Containers Set', category: 'plastic', price: 1100, originalPrice: 1300, badge: 'Sale', emoji: '🫙', rating: 4.2, reviews: 76, inStock: true },
    { id: 11, name: 'Gift Hamper Set', category: 'gift-items', price: 3500, originalPrice: 4000, badge: 'Sale', emoji: '🎁', rating: 4.9, reviews: 203, inStock: true },
    { id: 12, name: 'Candle Gift Set', category: 'gift-items', price: 1800, originalPrice: 2100, badge: 'Sale', emoji: '🕯️', rating: 4.7, reviews: 89, inStock: true },
    { id: 13, name: 'Photo Frame Set', category: 'gift-items', price: 1200, originalPrice: null, badge: null, emoji: '🖼️', rating: 4.3, reviews: 54, inStock: true },
    { id: 14, name: 'Folding Umbrella', category: 'umbrellas', price: 950, originalPrice: 1100, badge: 'Sale', emoji: '☂️', rating: 4.5, reviews: 167, inStock: true },
    { id: 15, name: 'Golf Umbrella', category: 'umbrellas', price: 2200, originalPrice: null, badge: 'New', emoji: '⛱️', rating: 4.6, reviews: 43, inStock: true },
    { id: 16, name: 'LED Ceiling Light', category: 'lighting', price: 1200, originalPrice: null, badge: null, emoji: '💡', rating: 4.4, reviews: 91, inStock: true },
    { id: 17, name: 'LED Bulb Pack', category: 'lighting', price: 850, originalPrice: null, badge: null, emoji: '🔆', rating: 4.2, reviews: 145, inStock: true },
    { id: 18, name: 'Table Lamp', category: 'lighting', price: 1800, originalPrice: 2100, badge: 'Sale', emoji: '🪔', rating: 4.5, reviews: 67, inStock: true },
    { id: 19, name: 'Storage Basket', category: 'general', price: 880, originalPrice: null, badge: null, emoji: '🧺', rating: 4.1, reviews: 38, inStock: true },
    { id: 20, name: 'Cleaning Set', category: 'general', price: 1450, originalPrice: 1700, badge: 'Sale', emoji: '🧹', rating: 4.3, reviews: 72, inStock: true },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
this.route.queryParams.subscribe(params => {
  this.selectedCategory.set(params['category'] || '' );
});
  }

  get productList() {
    let products = [...this.allProducts];

    if (this.selectedCategory()) {
      products = products.filter(p => p.category === this.selectedCategory());
    }

    if (this.searchQuery()) {
      const q = this.searchQuery().toLowerCase();
      products = products.filter(p => p.name.includes(q));
    }

    products = products.filter(p => p.price <= this.priceRange());

    switch(this.selectedSort()) {
      case 'price-asc': products.sort((a,b) => a.price - b.price); break;
      case 'price-desc': products.sort((a, b) => b.price - a.price); break;
      case 'best': products.sort((a, b) => b.reviews - a.reviews); break;  
      }

       return products;
  }

  get discount() {
    return (product: any) => {
      if (!product.originalPrice) return null;
      return Math.round((1 - product.price / product.originalPrice)* 100);
    };
  }

  setCategory(slug: string) { this.selectedCategory.set(slug);
  }

  setSort(event: Event) {
    this.selectedSort.set((event.target as HTMLInputElement).value);
  }

  setSearch(event: Event) {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  setPriceRange(event: Event) {
    this.priceRange.set(+(event.target as HTMLInputElement).value);
  }

  setViewMode(mode: 'grid' | 'list') { this. viewMode.set(mode);}
  
  addToCart(product: any) {console.log('Added to cart', product)}
  
}
