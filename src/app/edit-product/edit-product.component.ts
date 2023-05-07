import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productId! : number;
  product!: Product;
  productFormGroup! : FormGroup
  constructor(private fb :FormBuilder, private route : ActivatedRoute, public productService : ProductService){
    this.productId = this.route.snapshot.params['id'];
    console.log(`this is a id product ${this.productId}`);
  }
  ngOnInit(): void {
    this.productService.getProduct(this.productId).subscribe({
      next : (product )=>{
        this.product=product;
        this.productFormGroup=this.fb.group({
          name: this.fb.control(this.product.name,[Validators.required,Validators.minLength(4)]),
          price: this.fb.control(this.product.price,[Validators.required]),
          promotion: this.fb.control(this.product.promotion,[Validators.required])
      
         })

      },
      error : (err)=>{
        console.log(err)
      }
    })
   
  }

  handleUpdateProduct(){
    let p = this.productFormGroup.value;
    p.id=this.product.id;
    this.productService.updateProduct(p).subscribe({
      next : (data)=>{
        alert("Product upadted successfully")
      },
      error : (err)=>{
        console.log(err)
      }
    })


  }

}
