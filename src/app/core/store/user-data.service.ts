import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private username = new BehaviorSubject('' as string);
  usernameProps = this.username.asObservable();

  constructor() { }

  actSetUsername(usernameData: string): void {
    this.username.next(usernameData);
  }
}
