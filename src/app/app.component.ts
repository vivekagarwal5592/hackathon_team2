import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserStateService } from './user-state.service';
import { Observable, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'hackathon_team2_fe';

  private destroyed: Subscription[] = [];

  loginState: Boolean = false;

  constructor(private userStateService: UserStateService) {

  }
  ngOnInit(): void {
    this.userStateService.getIsUserLoggedIn()
      .pipe(takeUntil(this.destroyed))
      .subscribe((res) => {
        this.loginState = res;
      })
  }

  ngOnDestroy() {
    // unsubscribe from all on destroy
    this.destroyed.forEach(sub => sub.unsubscribe());
  }

}
