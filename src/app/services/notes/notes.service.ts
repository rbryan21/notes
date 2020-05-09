import { Injectable } from '@angular/core';
import { Note } from 'src/app/shared/models/note.model';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  QuerySnapshot,
  DocumentData,
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';

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

  createNote({ uid, title, description }: Note): Observable<Note> {
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

  updateNote({ id, uid, title, description }: Note): Observable<Note> {
    const noteDocument: NoteDocument = {
      title,
      description,
      uid,
    };

    const noteRef: AngularFirestoreDocument<NoteDocument> = this.afs.doc(
      `notes/${id}`
    );

    return from(noteRef.set(noteDocument, { merge: true })).pipe(
      map(() => {
        return {
          ...noteDocument,
          id,
        } as Note;
      })
    );
  }

  // TODO: consolidate duplicated logic, add error handling

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

  retrieveNote(id: string): Observable<Note> {
    return this.afs
      .doc<Note>(`notes/${id}`)
      .valueChanges()
      .pipe(
        tap((note) => {
          if (!note) {
            throw Error(`No note found with id: ${id}`);
          }
          console.log('Retrieved note: ', JSON.stringify(note));
          note.id = id;
        }),
        take(1)
      );
  }

  upsertNote(id: string): Observable<Note> {
    return this.afs
      .doc<Note>(`notes/${id}`)
      .valueChanges()
      .pipe(
        tap((note) => (note.id = id)),
        take(1)
      );
  }
}
