import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategorties() {
    return this.db.list('/categories', ref => ref.orderByChild('name'))
            .snapshotChanges()
            .map(actions => {
              return actions.map(action => ({ key: action.key, ...action.payload.val()}));
            });
  }

}
