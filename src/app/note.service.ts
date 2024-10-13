import { inject, Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { map, Observable, startWith, take } from 'rxjs';
import { DisplayNote } from './note-list/note-list.component';

export const noteKinds = [
  'cameraman',
  'band',
  'photographer',
  'inside-decorations',
  'outside-decorations',
] as const;
export type NoteKind = (typeof noteKinds)[number];

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private static readonly API_NOTE_COLLECTION_PREFIX = 'notes';
  #firestore = inject(AngularFirestore);

  constructor() {}

  getNotes(noteKind: NoteKind = 'band'): Observable<Array<DisplayNote>> {
    return this.#firestore
      .collection<DisplayNote>(this.getNotesCollectionName(noteKind))
      .snapshotChanges()
      .pipe(
        startWith([]),
        map(displayNotes => {
          return displayNotes.map(displayNote => {
            return {
              content: displayNote.payload.doc.data().content,
              id: displayNote.payload.doc.id,
            };
          });
        })
      );
  }

  createNote(
    noteKind: NoteKind = 'band',
    noteContent: string
  ): Promise<DocumentReference<DisplayNote>> {
    return this.#firestore
      .collection<DisplayNote>(this.getNotesCollectionName(noteKind))
      .add({
        id: this.generateRandomUuid(),
        content: noteContent,
      });
  }

  updateNote(
    noteKind: NoteKind = 'band',
    noteId: string,
    noteContent: string
  ): Promise<void> {
    return this.#firestore
      .collection(this.getNotesCollectionName(noteKind))
      .doc(noteId)
      .update({ content: noteContent });
  }

  deleteNote(noteKind: NoteKind = 'band', noteId: string): Promise<void> {
    return this.#firestore
      .collection(this.getNotesCollectionName(noteKind))
      .doc(noteId)
      .delete();
  }

  private getNotesCollectionName(noteKind: NoteKind): string {
    return `${NoteService.API_NOTE_COLLECTION_PREFIX}-${noteKind}`;
  }

  private generateRandomUuid(): string {
    return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c =>
      (
        +c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
      ).toString(16)
    );
  }
}
