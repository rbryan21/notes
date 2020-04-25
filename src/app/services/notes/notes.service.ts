import { Injectable } from '@angular/core';
import { Note } from 'src/app/shared/models/note.model';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  QuerySnapshot,
  DocumentData,
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

interface NoteDocument {
  title: string;
  description: string;
  uid: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private afs: AngularFirestore) {}

  createNote(
    title: string,
    description: string,
    uid: string
  ): Observable<Note> {
    const id = `${uid}_${new Date().getTime()}`;
    const noteDocument: NoteDocument = {
      title,
      description,
      uid,
    };

    const noteRef: AngularFirestoreDocument<NoteDocument> = this.afs.doc(
      `notes/${id}`
    );

    return from(noteRef.set(noteDocument)).pipe(
      map(() => {
        return {
          ...noteDocument,
          id,
        } as Note;
      })
    );
  }

  retrieveNotesForUser(uid: string): Observable<Note[]> {
    const notesRef = this.afs.collection('notes', (ref) =>
      ref.where('uid', '==', uid)
    );
    return notesRef.get().pipe(
      map((data: QuerySnapshot<DocumentData>) => {
        return data.docs.map((doc: DocumentData) => {
          return {
            ...doc.data(),
            id: doc.id,
          } as Note;
        });
      })
    );
  }
}
