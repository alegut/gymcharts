import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';
import { LoadingService } from 'src/app/services/loading.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'st-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  private subscriptions: Subscription[] = [];
  private returnUrl : string;

  constructor(
    private fb: FormBuilder,
    private utilsService: UtilsService,
    private loadingService: LoadingService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.createForm();
   }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/trainings';
  }

  private createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public submit(): void {
    this.loadingService.isLoading.next(true);
    if(this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.subscriptions.push(
        this.auth.login(email, password).subscribe(success => {
          if(success) {
            this.router.navigateByUrl(this.returnUrl)
          } else {
            this.displayFailedLogin();
          }
          this.loadingService.isLoading.next(false);
        })
      )
    }
    this.loadingService.isLoading.next(false);
    // this.displayFailedLogin();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private displayFailedLogin() {
    this.utilsService.showSnackbar('Попытка входа не удалась! Проверьте вводимые данные, пожалуйста!');
  }

  signInWithSocial(provider) {
    this.loadingService.isLoading.next(true);
    this.auth.signInWithSocial(provider).subscribe(success => {
      if (success) {
        this.router.navigate(['/trainings'])
      } else {
        this.utilsService.showSnackbar('Что-то пошло не так!');
      }
      this.loadingService.isLoading.next(false);
    });
    this.loadingService.isLoading.next(false);
  }

}
