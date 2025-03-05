import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CardModule, CommonModule, DragDropModule]
})
export class HomeComponent {
    cards = [
        {
            title: 'Üdvözöl a Pickback Helpdesk!',
            content: 'Pickback ERP egy felhő alapú, integrált vállalatirányítási rendszer...',
            width: 300,
            height: 200,
        },
        {
            title: 'Főbb jellemzők',
            content: '<ul><li>Webes rendszer, amely bárhonnan elérhető</li><li>Bővíthető, testreszabható</li></ul>',
            width: 350,
            height: 250,
        },
    ];

    private currentCardIndex: number | null = null;
    private resizeStartX: number = 0;
    private resizeStartY: number = 0;
    private resizeStartWidth: number = 0;
    private resizeStartHeight: number = 0;

    // Handle the drag end event
    onDragEnd(event: CdkDragEnd, index: number) {
        const card = this.cards[index];
        console.log(`Card ${index} dragged to position: ${event.source.getFreeDragPosition()}`);
        // Additional logic to handle drag end
    }

    // Start resizing process
    onResizeStart(event: MouseEvent, index: number) {
        event.preventDefault();
        this.currentCardIndex = index;
        this.resizeStartX = event.clientX;
        this.resizeStartY = event.clientY;
        this.resizeStartWidth = this.cards[index].width;
        this.resizeStartHeight = this.cards[index].height;

        // Listen for mouse movements and mouseup events
        document.addEventListener('mousemove', this.onResizeMove);
        document.addEventListener('mouseup', this.onResizeEnd);
    }

    // Resizing move handler
    onResizeMove = (event: MouseEvent) => {
        if (this.currentCardIndex !== null) {
            const deltaX = event.clientX - this.resizeStartX;
            const deltaY = event.clientY - this.resizeStartY;

            // Update card width and height
            this.cards[this.currentCardIndex].width = this.resizeStartWidth + deltaX;
            this.cards[this.currentCardIndex].height = this.resizeStartHeight + deltaY;
        }
    };

    // End resizing process
    onResizeEnd = () => {
        document.removeEventListener('mousemove', this.onResizeMove);
        document.removeEventListener('mouseup', this.onResizeEnd);
        this.currentCardIndex = null;
    };
}
