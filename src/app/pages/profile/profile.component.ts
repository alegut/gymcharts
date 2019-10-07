import { Component, OnInit, OnDestroy } from '@angular/core';
// import { User } from 'firebase';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { LoadingService } from 'src/app/services/loading.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'st-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  public currentUser: any = null;
  public user: User;
  private subscriptions: Subscription[] = [];

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private db: AngularFirestore
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.auth.currentUser.subscribe(user => {
        this.currentUser = user;
        this.loadingService.isLoading.next(false);
      })
    );

    this.subscriptions.push(
      this.route.paramMap.subscribe(params => {
        const userId = params.get('userId');
        const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${userId}`);
        userRef.valueChanges().subscribe(user => {
          this.user = user;
        });
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
