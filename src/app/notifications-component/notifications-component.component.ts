// notification.component.ts
import { Component, OnInit,OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: 'notifications-component.component.html',
  styleUrls: ['notifications-component.component.scss']
})
export class NotificationComponent implements OnInit,OnDestroy {
  public messages: string[] = [];
  private appId: string ="testing";
  private userId: string="123";
  subscription: Subscription | null = null;

  constructor(private notificationService: NotificationService, 
              private route: ActivatedRoute,
              private cd:ChangeDetectorRef) {}

  ngOnInit(): void {
    // Capture route parameters   
      this.appId = "testing";// params['appId'];
      this.userId ="123";// params['userId'];

      // Subscribe to notifications with the appId and userId
      this.subscription =this.notificationService.getNotifications(this.appId, this.userId)
      .subscribe({
        next: (message) => {
          console.log('Received message:', message);
          this.messages.push(message);
          this.cd.detectChanges();  // Manually trigger change detection
        },
        error: (err) => {
          console.error('Error receiving notifications:', err);
        }
      });
    
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
