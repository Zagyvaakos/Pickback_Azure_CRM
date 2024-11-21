import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',  // Or use providedIn: 'any' in standalone components if you're not using modules
})
export class AzureTaskService {
    constructor(private http: HttpClient) { }

    getTasks(): Observable<any> {
        return this.http.get('/api/tasks');
    }
}