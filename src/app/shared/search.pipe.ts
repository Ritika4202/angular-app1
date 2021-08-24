import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: any[], searchItem: string): any[] {
    console.log(searchItem)
    if(!products||!searchItem)
    {
      return products;
    }
    else{
      return products.filter(prodObj=>prodObj.productname.toLowerCase().indexOf(searchItem.toLowerCase())!==-1)
     
    }
  }

}
