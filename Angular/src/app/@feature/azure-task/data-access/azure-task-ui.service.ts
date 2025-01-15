import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AzureTaskUIService {
    private typeColors: { [key: number | string]: string } = {
        'Bug': '24px solid #c32828f0',
        'Something': '24px solid #63c328bf',
        'Task': '24px solid #288fc3bf',
        'UserStory': '24px solid #e98400f0',
        'Setup': '24px solid #8a8a8af0',
    };

    private typeIcons: { [key: number | string]: string } = {
        'Task': 'task',
        'any': 'task',
        'Bug': 'bug_report',
        'Userstory': 'text_snippet',
        'Okay': 'schedule',
    };


    private typeStrings: { [key: number | string]: string } = {
        'Bug': 'Hiba',
        'Task': 'Feladat',
        'UserStory': 'User story'
    };


    private typeBackgroundColors: { [key: number | string]: string } = {
        'Bug': 'rgba(195, 40, 40, 0.24)',
        'Task': 'rgba(40, 143, 195, 0.34)',
        'UserStory': ' #e98400f0'
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

    getTypeColor(type: string | number): string {
        return this.typeColors[type] || '';
    }

    getTypeIcon(type: string | number): string {
        return this.typeIcons[type] || '';
    }
    getTypeString(type: string | number): string {
        return this.typeStrings[type] || 'Hiba a név-értékeknél';
    }

    getTypeBackgroundColor(type: string | number): string {
        return this.typeBackgroundColors[type] || '#8a8a8a38';
    }



    getStateColor(state: string | number): string {
        return this.stateColors[state] || '#bebebe';
    }

    getStateBackgroundColor(state: string | number): string {
        return this.stateBackgroundColors[state] || '#8a8a8a38';
    }

    getStateString(state: string | number): string {
        return this.stateStrings[state] || 'Hiba a név-értékeknél';
    }
}