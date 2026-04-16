import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Product } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';

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
  isLoading = signal(true);
  error = signal('');

  allProducts = signal<Product[]>([]);

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

  

  constructor(private route: ActivatedRoute, private ProductService: ProductService) {}

  ngOnInit() {
  this.route.queryParams.subscribe(params => {
  const category = params['category'] || '';
  this.selectedCategory.set(category);
  this.loadProducts(category);
});
  }

  loadProducts(category?:string) {
    this.isLoading.set(true);
    this.error.set('');

    const request = category ? this.ProductService.getProductsByCategory(category) : this.ProductService.getAllProducts();

    request.subscribe({
      next: (products) => {
        this.allProducts.set(products);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load products. Please try again');
        this.isLoading.set(false);
      }
    })
  }
 

  get productList() {
    let products = [...this.allProducts()];

    if (this.searchQuery()) {
      const q = this.searchQuery().toLowerCase();
      products = products.filter(p => p.name.includes(q));
    }

    products = products.filter(p => p.price <= this.priceRange());

    switch(this.selectedSort()) {
      case 'price-asc': products.sort((a,b) => a.price - b.price); break;
      case 'price-desc': products.sort((a, b) => b.price - a.price); break;
      }
       return products;
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
