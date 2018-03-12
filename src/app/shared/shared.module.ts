import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { DataTableModule } from 'angular5-data-table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductCardComponent } from 'app/shared/components/product-card/product-card.component';
import { ProductQuantityComponent } from 'app/shared/components/product-quantity/product-quantity.component';
import { AuthGuard } from 'app/shared/services/auth-guard.service';
import { AuthService } from 'app/shared/services/auth.service';
import { CategoryService } from 'app/shared/services/category.service';
import { OrderService } from 'app/shared/services/order.service';
import { ProductService } from 'app/shared/services/product.service';
import { ShoppingCartService } from 'app/shared/services/shopping-cart.service';
import { UserService } from 'app/shared/services/user.service';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot()
  ],
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
    CommonModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot().ngModule

  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ]
})
export class SharedModule { }
