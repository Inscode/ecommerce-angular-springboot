import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { single } from 'rxjs';
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';

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
  relatedProducts = signal<Product[]>([])
  quantity = signal(1);
  selectedTab = signal('description');
  isLoading = signal(true);
  error = signal('');


  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(){
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadProduct(id);
    });
  }

  loadProduct(id: number) {
    this.isLoading.set(true);
    this.error.set('');

    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.product.set(product);
        this.isLoading.set(false);
        this.loadRelated(product.categorySlug, id);
      },
      error: () => {
        this.error.set('Product not found');
        this.isLoading.set(false);
      }
    });
  }

  loadRelated(slug: string, currentId: number) {
    this.productService.getProductsByCategory(slug).subscribe({
      next: (products) => {
        this.relatedProducts.set(
          products.filter(p => p.id !== currentId).slice(0,4)
        );
      },
      error: () => {}
    });
  }

  // get discountPercent() {
  //   const p = this.product();
  //   if (!p || !p.originalPrice) return null;
  //   return Math.round((1-p.price / p.originalPrice) * 100);
  // }

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
