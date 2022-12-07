import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  products! : Array<any>; // la varibale doit etre initialiée , je mets la point d'exclamation pour dire au compilateur je m'en occupe 
  //autre solution  products : Array<any> | undefined ;

  constructor(){}

  ngOnInit(): void {
    this.products=[
    {id:1,name :"Computer",price:4600},
    {id:1,name :"printer",price:1200},
    {id:1,name :"Smart phone",price:1400},
    ]
    
  }

  handleDeleteProduct(p:any){
    let index = this.products.indexOf(p);
    this.products.splice(index,1);
  }


}
