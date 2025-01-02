
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AUTH_TOKEN_KEY } from '../../auth/auth.config';
import { ApiConfig } from '../../../@shared/config/api-config';


@Injectable({
    providedIn: 'root',
})
export class AzureTaskService {
    private apiUrl = ApiConfig.helpdeskUrl
    private authTokenKey = inject(AUTH_TOKEN_KEY);

    private token = localStorage.getItem(this.authTokenKey)

    constructor(private http: HttpClient) { }

    getCurrentUser(): Observable<any> {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.token}`
        });
        return this.http.get(this.apiUrl + 'users/current-user', { headers });
    }
}