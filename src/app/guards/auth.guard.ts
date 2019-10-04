import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, take, tap } from 'rxjs/operators';
import { UtilsService } from '../services/utils.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private utilsService: UtilsService,
    private translate: TranslateService
  ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.currentUser.pipe(
      take(1),
      map((currentUser) => !!currentUser),
      tap((loggedIn) => {
        if (!loggedIn) {
          this.utilsService.showSnackbar(this.translate.instant('shouldlogin'));
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        }
      })
    )
  }
}
