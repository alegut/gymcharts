import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'st-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  public signupForm: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private loadingService: LoadingService,
  ) {
    this.createForm();
  }

  ngOnInit() {
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
          }
          this.loadingService.isLoading.next(false);
        })
      )
    }    
  }
  
  
}
