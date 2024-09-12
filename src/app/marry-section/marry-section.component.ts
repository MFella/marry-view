import { Component, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FastForwardIcon, fastForwardIcons } from '../home/home.component';
import { DisplayNote, NoteListComponent } from '../note-list/note-list.component';
import { Subject } from 'rxjs';

export type MarrySectionConfig = {
  title: string;
  titleIcon?: string;
  notes: Array<DisplayNote>;
  sectionIcon: FastForwardIcon;
  iconColor: string
};

@Component({
  selector: 'app-marry-section',
  standalone: true,
  imports: [MatCardModule, NoteListComponent, MatIconModule],
  templateUrl: './marry-section.component.html',
  styleUrl: './marry-section.component.scss'
})
export class MarrySectionComponent {

  @Input()
  config!: MarrySectionConfig;

  @Output()
  readonly editContentSet$: Subject<typeof fastForwardIcons[number]> = new Subject<typeof fastForwardIcons[number]>();

  emitEditContentSet(fastForwardIcon: typeof fastForwardIcons[number]): void {
    this.editContentSet$.next(fastForwardIcon);
  }
}
