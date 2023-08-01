import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../models/user';
import { Trans } from '../models/trans';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
  baseUrl: string = "http://localhost:8081/abc";

  getAllUsers() {
    return this.http.get<User[]>(this.baseUrl + "/all");
  }

  addUser(user: User) {
    return this.http.post(this.baseUrl + "/all/add", user);
  }

  getUserById(id: string) {
    return this.http.get<User>(this.baseUrl + "/all/" + id);
  }

  updateUserById(user: User) {
    return this.http.put(this.baseUrl + "/all/" + user.userName, user);
  }

  deleteUserById(id: string) {
    return this.http.delete(this.baseUrl + "/all/" + id);
  }

  passValidate(id: string, pass: string) {
    return this.http.get(this.baseUrl + `/login/${id}/${pass}`);

  }

  depositAmt(id: string, amt: number): Observable<any> {
    return this.http.get(this.baseUrl + `/deposit/${id}/${amt}`);
  }

  loanApply(id: string, amt: number, asset: number, yrs: number, type: string): Observable<any> {
    return this.http.get(this.baseUrl + `/loan/${id}/${amt}/${asset}/${yrs}/${type}`);
  }

  payEmi(id: string): Observable<any> {
    return this.http.get(this.baseUrl + `/payEmi/${id}`);
  }

  loanForeClose(id: string): Observable<any> {
    return this.http.get(this.baseUrl + `/foreclose/${id}`);
  }

  getTrans(id: string) {
    return this.http.get<Trans[]>(`${this.baseUrl}/transactions/${id}`);
  }

  forceClose(id: string): Observable<any> {
    return this.http.get(this.baseUrl + `/forceClose/${id}`)
  }

  changePassword(id: string, pass: string) {
    return this.http.get(this.baseUrl + `/changePassword/${id}/${pass}`);
  }

  check(id: string, accNo: number) {
    return this.http.get(this.baseUrl + `/checkAccount/${id}/${accNo}`, { responseType: 'text' });
  }

  totalBalance()
  {
    return this.http.get(this.baseUrl +"/totalBalance");
  }

  totalLoan()
  {
    return this.http.get(this.baseUrl +"/pendingLoan");
  }
}
