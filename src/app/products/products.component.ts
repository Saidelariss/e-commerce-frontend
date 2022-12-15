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
    let conf=confirm("Are you sure?");
    if(conf==false) return;
    this.productService.deleteProduct(p.id).subscribe({
      next : (data) =>{
        // this.handleGetAllProducts(); au lieu d'aller vers le backend et réafficher tous on suprime une ligne dans le front end
        let index = this.products.indexOf(p);
        this.products.splice(index,1);
      },
    })
    
  }
  handleSetPromotion(p:Product){
    // let index = this.products.indexOf(p);
    // this.products[index].promotion=true;
    let promo = p.promotion;
    this.productService.setPromotion(p.id).subscribe({
      next : (data)=>{
        p.promotion=!promo;
      },
      error : err => {
        this.errorMessage=err;
      }
    })
  }


}
