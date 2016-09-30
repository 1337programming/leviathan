import {ProductService} from './product.service';
import {Injectable} from '@angular/core';

@Injectable()
export class CustomerService {
  
  public productService: ProductService;
  
  constructor(productService: ProductService) {
    this.productService = productService;
  }
  
  public printCustomerDetails(customerId) {
    let products = this.productService.getProductsByCustomerId(customerId).join(',');
    return 'Customer purchased: ' + products;
  }
}
