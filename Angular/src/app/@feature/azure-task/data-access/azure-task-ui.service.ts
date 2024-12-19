import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root',
})
export class AzureTaskUIService {
    getTypeColor(status: number): string {
        switch (status) {
            case 0:
                return '24px solid #c32828f0';
            case 1:
                return '24px solid #63c328bf';
            case 2:
                return '24px solid #288fc3bf';
            case 3:
                return '24px solid #e98400f0';
            case 4:
                return '24px solid #8a8a8af0';
            default:
                return '';
        }
    }
    getTypeIcon(type: number): string {
        switch (type) {
            case 0:
                return 'task';
            case 1:
                return 'task';
            case 2:
                return 'bug_report';
            case 3:
                return 'text_snippet';
            case 4:
                return 'schedule';
            default:
                return '';
        }
    }


    getStateColor(state: number): string {
        switch (state) {
            case 0:
                return '#c32828f0';
            case 1:
                return '#e98400f0';
            case 2:
                return '#63c328bf';
            case 3:
                return '#8a8a8af0';
            case 4:
                return '#288fc3bf';
            case 5:
                return '#e98400f0';
            default:
                return '';
        }
    }

    getStateBackgroundColor(state: number): string {

        switch (state) {
            case 0:
                return '#c3282838';
            case 1:
                return '#e9840038';
            case 2:
                return '#63c32838';
            case 3:
                return '#8a8a8a38';
            case 4:
                return '#288fc338';
            case 5:
                return '#e9840038';
            default:
                return '';
        }



    }

    getStateString(state: number): string {
        switch (state) {
            case 0:
                return 'Áll';
            case 1:
                return 'Hibás';
            case 2:
                return 'Kész';
            case 3:
                return 'Új';
            case 4:
                return 'Aktív';
            default:
                return 'Lezárt';
        }
    }
}