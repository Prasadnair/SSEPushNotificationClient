// notification.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private eventSource!: EventSource;;

  constructor() {}

  getNotifications(appId: string, userId: string): Observable<string> {
    // Construct the SSE URL with appId and userId
    debugger;
    const url = `https://localhost:7121/api/notifications/subscribe/${appId}/${userId}`;
    this.eventSource = new EventSource(url);

    return new Observable<string>((observer) => {
      this.eventSource.onmessage = (event) => {
        observer.next(event.data);
      };

      this.eventSource.onerror = (error) => {
        observer.error(error);
      };
    });
  }
}
