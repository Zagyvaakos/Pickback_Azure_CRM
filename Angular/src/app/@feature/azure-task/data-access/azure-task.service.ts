import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AUTH_TOKEN_KEY } from '../../auth/auth.config';

@Injectable({
    providedIn: 'root',
})
export class AzureTaskService {
    private apiUrl = 'http://localhost:3000/api/';
    private TibiUrl = 'http://192.168.10.99:10481/';

    private authTokenKey = inject(AUTH_TOKEN_KEY);

    private token = localStorage.getItem(this.authTokenKey)

    constructor(private http: HttpClient) { }

    fetchAzureQueries(): Observable<any> {
        return this.http.get(this.apiUrl + 'azure-queries');
    }
    fetchAzureLatestWorkItems(): Observable<any> {
        return this.http.get(this.apiUrl + 'azure-latest-work-items');
    }

    getRandomItemsForTable(): Observable<any> {
        return this.http.get('http://192.168.10.99:10481/WeatherForecast/tasks')
    }
    getQueries(data: any): Observable<any> {

        return this.http.post(this.TibiUrl + 'PBTasks/list', data);

    }
    insertData(data: any): Observable<any> {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.token}` // Add Bearer token to the headers
        });

        return this.http.post(this.TibiUrl + 'PBTasks/insert', data, { headers });
    }
}