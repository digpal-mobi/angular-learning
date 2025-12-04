// src/app/components/navbar/navbar.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCartCount } from '../../store/cart/cart.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  count = 0;
  bump = false;
  private sub!: Subscription;

  constructor(private store: Store) {}

  ngOnInit() {
    let prev = 0;
    this.sub = this.store.select(selectCartCount).subscribe(c => {
      const newCount = c ?? 0;
      this.count = newCount;

      if (newCount !== prev) {
        this.triggerBump();
        prev = newCount;
      }
    });
  }

  private triggerBump() {
    this.bump = true;
    setTimeout(() => (this.bump = false), 350);
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
