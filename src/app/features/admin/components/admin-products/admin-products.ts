import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-products.html',
  styleUrl: './admin-products.scss',
})
export class AdminProducts {
  showAddForm = signal(false);
  searchQuery = signal('');
  selectedCategory = signal('');

    categories = [
    'Kitchenware', 'Aluminium', 'Plastic',
    'Gift Items', 'Umbrellas', 'Lighting', 'General'
  ];

    products = signal([
    { id: 1, name: 'Non-Stick Frying Pan', category: 'Kitchenware', retailPrice: 1850, wholesalePrice: 1400, stock: 45, status: 'Active', emoji: '🍳' },
    { id: 2, name: 'Kitchen Knife Set', category: 'Kitchenware', retailPrice: 2800, wholesalePrice: 2100, stock: 32, status: 'Active', emoji: '🔪' },
    { id: 3, name: 'Aluminium Storage Bin', category: 'Aluminium', retailPrice: 2400, wholesalePrice: 1800, stock: 28, status: 'Active', emoji: '🪣' },
    { id: 4, name: 'Aluminium Ladder', category: 'Aluminium', retailPrice: 8500, wholesalePrice: 6500, stock: 12, status: 'Active', emoji: '🪜' },
    { id: 5, name: 'Plastic Storage Box', category: 'Plastic', retailPrice: 650, wholesalePrice: 480, stock: 0, status: 'Out of Stock', emoji: '🧴' },
    { id: 6, name: 'Gift Hamper Set', category: 'Gift Items', retailPrice: 3500, wholesalePrice: 2700, stock: 18, status: 'Active', emoji: '🎁' },
    { id: 7, name: 'Folding Umbrella', category: 'Umbrellas', retailPrice: 950, wholesalePrice: 720, stock: 65, status: 'Active', emoji: '☂️' },
    { id: 8, name: 'LED Ceiling Light', category: 'Lighting', retailPrice: 1200, wholesalePrice: 900, stock: 5, status: 'Low Stock', emoji: '💡' },
  ]);

  newProduct = signal({
    name: '', category: '', retailPrice: 0,
    wholesalePrice: 0, stock: 0, emoji: '📦'
  });

  get filteredProducts() {
    return this.products().filter(p=> {
      const matchSearch = p.name.toLowerCase().includes(this.searchQuery().toLowerCase());
      const matchcat = !this.selectedCategory() || p.category === this.selectedCategory();
      return matchSearch && matchcat;
    })
  }

  onSearchInput(event: Event) {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  onCategoryFilter(event: Event) {
    this.selectedCategory.set((event.target as HTMLSelectElement).value);
  }

 
  onFieldInput(field: string, event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.newProduct.update(p => ({ ...p, [field]: field.includes('Price') || field === 'stock' ? +value : value }));
  }

  addProduct() {
    const p = this.newProduct();
    if (!p.name || !p.category || !p.retailPrice) return;
    this.products.update(list => [...list, {
      id: list.length + 1,
      ...p,
      status: p.stock === 0 ? 'Out of Stock' : p.stock < 10 ? 'Low Stock' : 'Active'
    }]);
    this.showAddForm.set(false);
    this.newProduct.set({ name: '', category: '', retailPrice: 0, wholesalePrice: 0, stock: 0, emoji: '📦' });
  }

  deleteProduct(id: number) {
    this.products.update(list => list.filter(p => p.id !== id));
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'Active': return 'status--active';
      case 'Out of Stock': return 'status--out';
      case 'Low Stock': return 'status--low';
      default: return '';
    }
  }
}