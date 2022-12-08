import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  products! : Array<Product>; // la varibale doit etre initialiée , je mets la point d'exclamation pour dire au compilateur je m'en occupe 
  //autre solution  products : Array<any> | undefined ;

  errorMessage! : string;

  //pour que je puisse utiliser ce service il faut l'injecter 
  constructor(private productService : ProductService){

  }

  ngOnInit(): void {
   this.handleGetAllProducts();
    
  }

  handleGetAllProducts(){
    this.productService.getAllProducts().subscribe({
      next : (data) => { // programmation asynchrone
        this.products=data;
      },
      error : (err) => {
        this.errorMessage = err;
      }
  
     });
     
  }
  handleDeleteProduct(p:Product){
    this.productService.deleteProduct(p.id).subscribe({
      next : (data) =>{
        this.handleGetAllProducts();
      },
    })
    
  }


}
