import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from '../../@shared/config/api-config';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private apiUrl = ApiConfig.helpdeskUrl
    constructor(private http: HttpClient) { }

    fetchAzureQueries(): Observable<any> {
        return this.http.post(this.apiUrl + 'PBTasks/list', { 'limit': 500 });  // HTTP GET request
    }
    fetchAzureLatestWorkItems(): Observable<any> {
        return this.http.post(this.apiUrl + 'PBTasks/list', { 'limit': 500 });  // HTTP GET request

    }
}