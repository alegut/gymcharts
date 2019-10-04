import { LanguageInterface } from './../../../interfaces/language';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { UtilsService } from 'src/app/services/utils.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'st-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  public signupForm: FormGroup;
  private subscriptions: Subscription[] = [];
  public lang: LanguageInterface;


  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private loadingService: LoadingService,
    private utilsService: UtilsService,
    private translate: TranslateService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.lang = this.utilsService.getOppositeLanguage();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  private createForm(): void {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  public submit(): void {
    this.loadingService.isLoading.next(true);
    if(this.signupForm.valid) {
      const { name, email, password } = this.signupForm.value;
      this.subscriptions.push(
        this.auth.signup(name, email, password).subscribe(success => {
          if(success) {
            this.router.navigate(['/trainings'])
          } else {
            this.loadingService.isLoading.next(false);
            this.utilsService.showSnackbar(this.translate.instant('somethingwrong'));
          }
          this.loadingService.isLoading.next(false);
        })
      )
    }
  }

  signInWithSocial(provider) {
    this.loadingService.isLoading.next(true);
    this.auth.signInWithSocial(provider).subscribe(success => {
      if (success) {
        this.router.navigate(['/trainings'])
      } else {
        this.utilsService.showSnackbar(this.translate.instant('somethingwrong'));
        this.loadingService.isLoading.next(false);
      }
      this.loadingService.isLoading.next(false);
    });
  }

  switchLang() {
    this.utilsService.switchLanguage();
    this.lang = this.utilsService.getOppositeLanguage();
  }


}
