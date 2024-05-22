import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBaseResponse, ILoginFormInterface, ILoginInformations } from '../interfaces/login.interface';
import { IAuthenlicationInterface } from '../interfaces/authenlication.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable()
export class LoginService {
  baseUrl = environment.apiUrl + 'TokenAuth/'; // Use the correct property name
  loginInformations = environment.apiUrl + 'services/app/Session/GetCurrentLoginInformations'; // Use the correct property name

  constructor(private httpClient: HttpClient) { }

  login(payload: ILoginFormInterface): Observable<IAuthenlicationInterface> {
    return this.httpClient.post<IAuthenlicationInterface>(this.baseUrl + 'Authenticate', payload);
  }

  getLoginInformations(): Observable<IBaseResponse<ILoginInformations>> {
    return this.httpClient.get<IBaseResponse<ILoginInformations>>(this.loginInformations);
  }
}
