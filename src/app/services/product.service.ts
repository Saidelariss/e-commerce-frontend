import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root' // pour pouvoir utiliser un service , ce dernier doit être declaré dans la partie providers mais ici il est disponible depuis la racine donc je peux l'injecter ou je veux
})
export class ProductService {
  private products! : Array<Product>;
  constructor() {
    this.products=[
      {id:1,name :"Computer",price:4600,promotion:true},
      {id:2,name :"printer",price:1200,promotion:false},
      {id:3,name :"Smart phone",price:1400,promotion:false},
      ];
   }

   public getAllProducts() : Observable<Product[]>{//programmation réactif (!impératif)
    let rnd = Math.random();
    if(rnd<0.1) return throwError(()=>new Error("Internet connexion error"));
    return of(this.products);
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


}
