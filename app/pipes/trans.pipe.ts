import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trans'
})
export class TransPipe implements PipeTransform {

  transform(userList: any, searchText: any): any {
    let newList: any;

    if (searchText) {
      newList = userList.filter(user => user.description.toLowerCase().includes(searchText.toLowerCase()));
    }
    else {
      newList = userList;
    }
    return newList;
  }

}
