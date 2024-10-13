import {
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Editor, NgxEditorModule, toHTML, Toolbar } from 'ngx-editor';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { inOutAnimation } from '../_animations/random-animation';
import { FastForwardIcon } from '../home/home.component';
import { from, Subject, take } from 'rxjs';
import { NoteKind, NoteService } from 'app/note.service';
import { SanitizedHtmlPipe } from 'app/sanitized-html.pipe';

export type DisplayNote = {
  id: string;
  content: string;
};

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgxEditorModule,
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    SanitizedHtmlPipe,
  ],
  templateUrl: './note-list.component.html',
  animations: [inOutAnimation],
  styleUrl: './note-list.component.scss',
})
export class NoteListComponent implements OnInit, OnDestroy {
  readonly platformId = inject(PLATFORM_ID);
  readonly noteService = inject(NoteService);

  @Input()
  displayNotes!: Array<DisplayNote>;

  @Input()
  sectionIcon!: FastForwardIcon;

  @Output()
  readonly editContentSet$: Subject<FastForwardIcon> =
    new Subject<FastForwardIcon>();

  textEditor!: Editor;

  noteListEditorText: string = '';

  htmlEditorText: string = '';

  isEditMode: boolean = false;
  editedNoteId: string = '';

  ngxEditorToolbar: Toolbar = [
    ['bold', 'italic', 'bullet_list', 'ordered_list'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.textEditor = new Editor();
      this.textEditor.valueChanges.subscribe(
        (noteEditorText: Record<string, any>) => {
          this.htmlEditorText = toHTML(noteEditorText);
        }
      );
    }
  }

  saveHtmlNote(): void {
    const resolvedObservable = this.isEditMode
      ? this.noteService.updateNote(
          this.getNoteKind(),
          this.editedNoteId,
          this.htmlEditorText
        )
      : this.noteService.createNote(this.getNoteKind(), this.htmlEditorText);

    from(resolvedObservable)
      .pipe(take(1))
      .subscribe({
        next: _response => {
          this.textEditor.setContent('');
          this.isEditMode = false;
          this.editedNoteId = '';
        },
        error: err => {
          console.error(JSON.stringify(err));
        },
      });
  }

  editNote(noteId: string): void {
    this.isEditMode = true;
    this.editedNoteId = noteId;
    const displayNote = this.displayNotes.find(note => note.id === noteId);

    if (!displayNote) {
      return;
    }

    this.textEditor.setContent(displayNote.content);
    this.editContentSet$.next(this.sectionIcon);
  }

  rejectEdit(): void {
    this.isEditMode = false;
    this.textEditor.setContent('');
  }

  deleteNote(noteId: string): void {
    from(this.noteService.deleteNote(this.getNoteKind(), noteId))
      .pipe(take(1))
      .subscribe({
        error: (error: any) => {
          console.error(JSON.stringify(error));
        },
      });
    // const displayNoteIds = this.displayNotes.map(displayNote => displayNote.id);
    // const displayNoteIndex = displayNoteIds.indexOf(noteId);

    // if (displayNoteIndex === -1) {
    //   return;
    // }

    // this.displayNotes.splice(displayNoteIndex, 1);
  }

  ngOnDestroy(): void {
    this.textEditor?.destroy();
  }

  private getNoteKind(): NoteKind {
    switch (this.sectionIcon) {
      case '📹':
        return 'cameraman';
      case '📷':
        return 'photographer';
      case '🎸':
        return 'band';
      case '🌺':
        return 'outside-decorations';
      case '🏨':
        return 'inside-decorations';
      default: {
        return 'band';
      }
    }
  }
}
