import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataTableModule } from 'angular5-data-table';
import { AdminOrdersComponent } from 'app/admin/components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from 'app/admin/components/admin-products/admin-products.component';
import { ProductFormComponent } from 'app/admin/components/product-form/product-form.component';
import { AdminGuard } from 'app/admin/services/admin-guard.service';

import { AuthGuard } from './../shared/services/auth-guard.service';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: 'admin/products/new',
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'admin/products/:id',
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'admin/products',
        component: AdminProductsComponent,
        canActivate: [AuthGuard, AdminGuard]
      },

      { path: 'admin/orders',
        component: AdminOrdersComponent,
        canActivate: [AuthGuard, AdminGuard]
      }
    ])
  ],
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
  ],
  providers: [
    AdminGuard
  ]
})
export class AdminModule { }
