import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root' // pour pouvoir utiliser un service , ce dernier doit declaré dans la partie providers mais ici il est disponible depuis la racine donc je peux l'injecter ou je veux
})
export class ProductService {
  private products! : Array<any>;
  constructor() {
    this.products=[
      {id:1,name :"Computer",price:4600},
      {id:1,name :"printer",price:1200},
      {id:1,name :"Smart phone",price:1400},
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


}
