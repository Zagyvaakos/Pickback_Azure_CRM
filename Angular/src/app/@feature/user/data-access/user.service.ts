
import { inject, Injectable, signal, Signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AUTH_TOKEN_KEY } from '../../auth/auth.config';
import { ApiConfig } from '../../../@shared/config/api-config';
import { NavigationEnd, Router } from '@angular/router';


@Injectable({
    providedIn: 'root',
})
export class UserService {
    private apiUrl = ApiConfig.helpdeskUrl
    private authTokenKey = inject(AUTH_TOKEN_KEY);
    private previousUrl: string = '';
    private token = localStorage.getItem(this.authTokenKey)
    public image = signal<string>('https://ih1.redbubble.net/image.3835241466.9911/flat,750x,075,f-pad,750x1000,f8f8f8.jpg')
    public role = signal<boolean>(false);
    public isEditing = signal<boolean>(false);
    constructor(private http: HttpClient, private router: Router) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                const currentUrl = this.router.url;
                if (currentUrl !== this.previousUrl) {
                    this.isEditing.set(currentUrl.includes('edit'));
                    this.previousUrl = currentUrl;
                }
            }
        });
    }

    getCurrentUser(): Observable<any> {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.token}`
        });
        return this.http.get(this.apiUrl + 'users/current-user', { headers });
    }
}