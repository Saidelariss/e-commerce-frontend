import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { PageProduct, Product } from '../model/product.model';
import { UUID } from 'angular2-uuid';
//un service utilise le décorateur @Injectable
@Injectable({
  providedIn: 'root' /* pour pouvoir utiliser un service , ce dernier doit être declaré dans la partie 
                     providers du module mais ici il est disponible depuis la racine donc je peux 
                    l'injecter ou je veux ( ce n'est pas la peine de déclarer ce service dans providers de module)*/
})
export class ProductService {
  private products! : Array<Product>;
  constructor() { 
    this.products=[
      {id:UUID.UUID(),name :"Computer",price:4600,promotion:true},
      {id:UUID.UUID(),name :"printer",price:1200,promotion:false},
      {id:UUID.UUID(),name :"Smart phone",price:1400,promotion:false},
      ];
      for(let i = 0;i<10; i++){
        this.products.push({id:UUID.UUID(),name:"Computer",price: 6500, promotion:true});
        this.products.push({id:UUID.UUID(),name :"printer",price:1200,promotion:false});
        this.products.push({id:UUID.UUID(),name :"Smart phone",price:1400,promotion:false});
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


   public deleteProduct(id:string): Observable<boolean>{
    this.products = this.products.filter(p=>p.id!=id)
    return of(true);
   }


   public setPromotion(id : string) : Observable<boolean>{
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



}
