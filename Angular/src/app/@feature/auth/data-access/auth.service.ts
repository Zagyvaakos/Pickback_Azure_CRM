import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Role } from '../../role/models/role';
import { LoginData } from '../models/login-data';
// import { ApiSettingsStore } from '../../app/data-access/api-settings.store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // readonly apiSettingsStore = inject(ApiSettingsStore);
  readonly httpClient = inject(HttpClient);

  /**
   *
   * @param body
   * @returns
   */
  login$(body: LoginData) {
    return this.httpClient.post<string>(
      'http://192.168.10.99:10481/auth/login',
      body,
      { responseType: 'text' as 'json' } // Specify response type as 'text'
    );
  }

}
