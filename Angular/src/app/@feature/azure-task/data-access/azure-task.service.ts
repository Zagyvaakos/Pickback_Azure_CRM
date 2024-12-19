import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AzureTaskService {
    private apiUrl = 'http://localhost:3000/api/';
    private TibiUrl = 'http://192.168.10.99:10481/';

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
}