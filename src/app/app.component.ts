import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { TranslationService } from './modules/vocabs/translation.service';
// language list
import { locale as enLang } from './modules/vocabs/en';
import { locale as chLang } from './modules/vocabs/ch';
import { locale as esLang } from './modules/vocabs/es';
import { locale as jpLang } from './modules/vocabs/jp';
import { locale as deLang } from './modules/vocabs/de';
import { locale as frLang } from './modules/vocabs/fr';
import { SplashScreenService } from './modules/Components/layout/splash-screen/splash-screen.service';
import { Router, NavigationEnd, NavigationError } from '@angular/router';
import { Subscription } from 'rxjs';
import { SwUpdate } from '@angular/service-worker';
import { DatePipe } from '@angular/common';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(private updates: SwUpdate, public datePipe: DatePipe,
    private translationService: TranslationService,
    private splashScreenService: SplashScreenService,
    private router: Router,
  ) {
    // register translations
    this.translationService.loadTranslations(
      enLang,
      chLang,
      esLang,
      jpLang,
      deLang,
      frLang
    );
  }
  updateChecked = false;
  updateAvailable = false;
  angularUpdatedDate=this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  // In your template, use this value to show a loading indicator while we are
  // waiting for updates. (You can also use it to hide the rest of the UI if
  // you want to prevent the old version from being used.)
  get waitingForUpdates() {
    return !this.updateChecked || this.updateAvailable;
  }

  async ngOnInit() {
    const routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // clear filtration paginations and others
        // hide splash screen
        this.splashScreenService.hide();

        // scroll to top on every route change
        window.scrollTo(0, 0);

        // to display back the body content
        setTimeout(() => {
          document.body.classList.add('page-loaded');
        }, 500);
      }
    }); 
    
    let date = this.datePipe.transform(new Date(localStorage.getItem("angularUpdatedDate")), 'yyyy-MM-dd');
    if(localStorage.getItem("angularUpdatedDate")==null || localStorage.getItem("angularUpdatedDate")==''  ){
      localStorage.setItem("angularUpdatedDate",String(new Date()) );
      window.location.reload();
    }else if(date != this.angularUpdatedDate )
    { localStorage.setItem("angularUpdatedDate",String(new Date()) );
    window.location.reload();
    }


    this.updates.available.subscribe(() => {
      // Keep the loading indicator active while we reload the page
      this.updateAvailable = true;
      window.location.reload();
    });
    if (this.updates.isEnabled) {
      // This promise will return when the update check is completed,
      // and if an update is available, it will also wait for the update
      // to be downloaded (at which point it calls our callback above and
      // we just need to reload the page to apply it).
      await this.updates.checkForUpdate();
    } else {
      console.log('Service worker updates are disabled.');
    }
    // The update check is done (or service workers are disabled), now
    // we can take the loading indicator down (unless we need to apply an
    // update, but in that case, we have already set this.updateAvailable
    // to true by this point, which keeps the loading indicator active).
    this.updateChecked = true;
    this.unsubscribe.push(routerSubscription);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
