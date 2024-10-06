// notification.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: 'notifications-component.component.html',
  styleUrls: ['notifications-component.component.scss']
})
export class NotificationComponent implements OnInit {
  public messages: string[] = [];
  private appId: string ="testing";
  private userId: string="testing";

  constructor(private notificationService: NotificationService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Capture route parameters
    this.route.params.subscribe(params => {
      this.appId = "testing";// params['appId'];
      this.userId ="123";// params['userId'];

      // Subscribe to notifications with the appId and userId
      this.notificationService.getNotifications(this.appId, this.userId).subscribe((message: string) => {
        console.log(message);
        this.messages.push(message);
      });
    });
  }
}
