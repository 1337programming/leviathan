import {
  async,
  inject,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';
import {CustomerService} from '../service-with-dependencies/customer.service';
import {ProductService} from '../service-with-dependencies/product.service';


class ProductServiceMock {
  public getProductsByCustomerId() {
    return ['Hamburger', 'Fries'];
  }
}

describe('CustomerService Mock Dependencies', () => {
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: ProductService, useClass: ProductServiceMock}, CustomerService]
    });
  });
  
  it('should get customer details', inject([CustomerService], (customerService) => {
    let customerDetails = customerService.printCustomerDetails(1);
    expect(customerDetails).toBe('Customer purchased: Hamburger,Fries');
  }));
});
