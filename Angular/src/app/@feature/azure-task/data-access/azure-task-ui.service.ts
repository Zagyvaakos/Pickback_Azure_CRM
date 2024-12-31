import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AzureTaskUIService {
    private typeColors: { [key: number | string]: string } = {
        0: '24px solid #c32828f0',
        1: '24px solid #63c328bf',
        2: '24px solid #288fc3bf',
        3: '24px solid #e98400f0',
        4: '24px solid #8a8a8af0',
    };

    private typeIcons: { [key: number | string]: string } = {
        0: 'task',
        1: 'task',
        2: 'bug_report',
        3: 'text_snippet',
        4: 'schedule',
    };

    private stateColors: { [key: number | string]: string } = {
        'Stopped': '#c32828f0',
        'Bug': '#e98400f0',
        'Completed': '#63c328bf',
        'Closed': '#8a8a8af0',
        'Active': '#288fc3bf',
        'New': '#bebebe',
        'Withdrawn': '#e98400f0',
    };

    private stateBackgroundColors: { [key: number | string]: string } = {
        'Stopped': '#c3282838',
        'Bug': '#e9840038',
        'Completed': '#63c32838',
        'Closed': '#8a8a8a38',
        'Active': '#288fc338',
        'New': '#8a8a8a38',
        'Withdrawn': '#e9840028',
    };

    private stateStrings: { [key: number | string]: string } = {
        'Stopped': 'Áll',
        'Bug': 'Hibás',
        'Completed': 'Kész',
        'Closed': 'Lezárt',
        'Active': 'Aktív',
        'New': 'Új',
        'Withdrawn': 'Kiszedett',
    };

    getTypeColor(status: number): string {
        return this.typeColors[status] || '';
    }

    getTypeIcon(type: number): string {
        return this.typeIcons[type] || '';
    }

    getStateColor(state: number): string {
        return this.stateColors[state] || '#bebebe';
    }

    getStateBackgroundColor(state: number): string {
        return this.stateBackgroundColors[state] || '#8a8a8a38';
    }

    getStateString(state: number): string {
        return this.stateStrings[state] || 'Hiba a név-értékeknél';
    }
}