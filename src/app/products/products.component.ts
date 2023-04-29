import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  products! : Array<Product>; // la varibale doit etre initialiée , je mets la point d'exclamation pour dire au compilateur je m'en occupe 
  //autre solution  products : Array<any> | undefined ;

  errorMessage! : string;
  searchFormGroup! : FormGroup;

  currentPage : number = 0;
  pageSize : number = 5;
  totalPages : number = 0;

  currentAction: string='all';

  //généralement on utilise le constructeur que pour l'injection de dépendances 
  //pour que je puisse utiliser ce service il faut l'injecter 
  constructor(private productService : ProductService, private fb : FormBuilder, public authService : AuthenticationService,private router: Router){ }

  ngOnInit(): void {
    
  
   this.searchFormGroup=this.fb.group({
    keyword : this.fb.control(null)
   });

   //this.handleGetAllProducts();
   this.handleGetPageProducts();
  }


  handleGetPageProducts(){
    this.productService.getPageProducts(this.currentPage,this.pageSize).subscribe({
      next : (data) => { // programmation asynchrone
        this.products=data.products;
        this.totalPages=data.totalPages;
        console.log(data.totalPages);
      },
      error : (err) => {
        this.errorMessage = err;
      }
  
     });
     
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
        // this.handleGetAllProducts(); au lieu d'aller vers le back-end et réafficher tous on suprime juste une ligne dans le front end
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

  handleSearchProducts(){
    this.currentPage=0;
    this.currentAction="search";
    let keyword=this.searchFormGroup.value.keyword;
    this.productService.searchProducts(keyword,this.currentPage,this.pageSize).subscribe({
      next : (data) =>{
        this.products=data.products;
        this.totalPages=data.totalPages;

      }
    })
  }

  gotoPage(i:number){
    this.currentPage=i;
    if(this.currentAction == 'all')
      this.handleGetPageProducts();
    else 
      this.handleSearchProducts();
  }

  handleNewProduct(){
    this.router.navigateByUrl("/admin/newProduct");
  }

  handleEditProduct(p:Product){
    this.router.navigateByUrl("/admin/editProduct/"+p.id)
  }

}
