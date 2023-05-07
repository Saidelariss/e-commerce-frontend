import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { PageProduct, Product } from '../model/product.model';
import { UUID } from 'angular2-uuid';
import { ValidationErrors } from '@angular/forms';
//un service utilise le décorateur @Injectable
@Injectable({
  providedIn: 'root' /* pour pouvoir utiliser un service , ce dernier doit être declaré dans la partie 
                     providers du module mais ici il est disponible depuis la racine donc je peux 
                    l'injecter ou je veux ( ce n'est pas la peine de déclarer ce service dans providers de module)*/
})
export class ProductService {
  private numberProducts : number =1;
  private products! : Array<Product>;
  constructor() { 
    this.products=[
      {id:this.numberProducts++,name :"Computer",price:4600,promotion:true},
      {id:this.numberProducts++,name :"printer",price:1200,promotion:false},
      {id:this.numberProducts++,name :"Smart phone",price:1400,promotion:false},
      ];
      for(let i = 0;i<10; i++){
        this.products.push({id:this.numberProducts++,name:"Computer",price: 6500, promotion:true});
        this.products.push({id:this.numberProducts++,name :"printer",price:1200,promotion:false});
        this.products.push({id:this.numberProducts++,name :"Smart phone",price:1400,promotion:false});
      }
   }

   public getAllProducts() : Observable<Product[]>{//programmation réactif (!impératif)
    let rnd = Math.random();
    if(rnd<0.1) return throwError(()=>new Error("Internet connexion error"));
    return of(this.products);
    
   }

   public getPageProducts(page : number, size : number) : Observable<PageProduct>{//programmation réactif (!impératif)
    let index = page*size;
    let totalPages = ~~(this.products.length/size);
    if(this.products.length % size !=0) totalPages++;
    let pageProducts = this.products.slice(index,index+size);
    return of({page:page,size:size,products:pageProducts,totalPages:totalPages});
  
   }


   public deleteProduct(id:number): Observable<boolean>{
    this.products = this.products.filter(p=>p.id!=id)
    return of(true);
   }


   public setPromotion(id : number) : Observable<boolean>{
    let product = this.products.find(p=>p.id==id);
    if(product != undefined){
      product.promotion=!product.promotion;
      return of(true);
    } else return throwError(()=>new Error("Product not found "))
   }

   public searchProducts(keyword: string,page:number , size : number): Observable<PageProduct>{
    let result = this.products.filter(p=>p.name.includes(keyword));
    let index = page*size;
    let totalPages = ~~(result.length/size);
    if(this.products.length % size !=0) totalPages++;
    let pageProducts = result.slice(index,index+size);
    return of({page:page,size:size,products:pageProducts,totalPages:totalPages});
   }

   public addNewProduct(product : Product): Observable<Product>{
    product.id=this.numberProducts++;
    this.products.push(product);
    return of(product);
   }

   public getProduct(id:number): Observable<Product>{
    console.log(id);
    let product =  this.products.find(p => p.id==id);
    if(product) return of(product);
    else return throwError(( ()=>new Error("product not found")))
   }

   getErrorMessage(fieldName:string , error: ValidationErrors){
    if(error['required']){
      return fieldName + " is Required";
    } else if(error['minlength']){
      
      return fieldName + " should have at least " + error['minlength']['requiredLength']+" Characters"
    } else return "";
  }

  public updateProduct(product : Product) : Observable<Product>{
    this.products=this.products.map(p=>(p.id==product.id)?product:p);
    return of(product);
  }

}
