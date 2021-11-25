import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  idProduct:string;
  product:Product=new Product();
  val:String="";

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.idProduct = this.route.snapshot.paramMap.get('idProduct');
    this.getProductInfo(this.idProduct);
  }


  getProductInfo(id:any){
    this.productService.getProductById(id).subscribe(
      product=>this.product=product
    )

  }
  backtoligne(val){
    this.val=val;
    var rr:String="";
    for(var i=0;i<this.val.length;i++){
      if(this.val[i]==="-"){
       rr+'\n';
      }
      rr+this.val[i];
    }
    return rr;
  }

}
