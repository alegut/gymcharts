import { UtilsService } from './../../services/utils.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Location } from '@angular/common';
import { User } from 'src/app/interfaces/user';
import { TranslateService } from '@ngx-translate/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'st-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {
  public currentUser: any = null;
  public userId = '';
  private subscriptions: Subscription[] = [];
  public uploadPercent = 0;
  public downloadUrl: string | null = null;
  public imageChangedEvent: any = '';
  public croppedImage: any = '';

  constructor(
    private auth: AuthService,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private fs: AngularFireStorage,
    private db: AngularFirestore,
    private location: Location,
    private utilsService: UtilsService,
    private translate: TranslateService
  ) {
    this.loadingService.isLoading.next(true);
  }

  ngOnInit() {
    this.subscriptions.push(
      this.auth.currentUser.subscribe(user => {
        this.currentUser = user;
        this.loadingService.isLoading.next(false);
      },
      error => {
        this.loadingService.isLoading.next(false);
      })
    );

    this.subscriptions.push(
      this.route.paramMap.subscribe(params => {
        this.userId = params.get('userId');
      })
    );
  }

  public uploadFile(event): void {
    const file = event.target.files[0];
    const rand = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    console.log(rand);
    // this.ref = this.fs.ref(rand);
    const filePath = `${rand}_${file.name}_${this.currentUser.id}`;
    const task = this.fs.upload(filePath, file);

    const ref = this.fs.ref(filePath);

    // observe the percentage changes
    this.subscriptions.push(
      task.percentageChanges().subscribe(percentage => {
        if (percentage < 100) {
          this.loadingService.isLoading.next(true);
        } else {
          this.loadingService.isLoading.next(false);
        }
        this.uploadPercent = percentage;
      })
    );

    // get notified when the download URL is available
    task.then(
      () => {
        this.subscriptions.push(
          ref.getDownloadURL().subscribe(url => this.downloadUrl = url)
        );
      }
    );
  }

  public save(): void {
    let photo;


    if (this.downloadUrl) {
      photo = this.downloadUrl;
    } else {
      photo = this.currentUser.image;
    }

    const user = Object.assign({}, this.currentUser, { image: photo });
    const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.id}`);
    userRef.set(user)
      .then(() => {
        this.utilsService.showSnackbar('Ваш профиль успешно обновлен');
      })
      .catch(error => {
        this.utilsService.showSnackbar('Ваш профиль не обновлен из-за ошибки');
      });
    this.location.back();
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.downloadUrl = this.croppedImage;

  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
