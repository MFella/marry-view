import { Component } from '@angular/core';
import { NoteListComponent } from 'app/note-list/note-list.component';

@Component({
  selector: 'app-cameraman',
  standalone: true,
  imports: [NoteListComponent],
  templateUrl: './cameraman.component.html',
  styleUrl: './cameraman.component.scss'
})
export class CameramanComponent {

}
