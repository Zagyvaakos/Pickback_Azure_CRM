import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private apiUrl = 'http://192.168.10.99:10481/'; // Backend API URL

    constructor(private http: HttpClient) { }

    fetchAzureQueries(): Observable<any> {
        return this.http.post(this.apiUrl + 'PBTasks/list', { 'limit': 500 });  // HTTP GET request
    }
    fetchAzureLatestWorkItems(): Observable<any> {
        return this.http.post(this.apiUrl + 'PBTasks/list', { 'limit': 500 });  // HTTP GET request

    }
}