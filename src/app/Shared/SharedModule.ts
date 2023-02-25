import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list'; 
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgbDropdownModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { IntlModule } from '@progress/kendo-angular-intl';
import { LabelModule } from '@progress/kendo-angular-label';
// import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { InlineSVGModule } from 'ng-inline-svg';
import { AlertModule } from '../CustomComponents/alert.module';
import { TranslationModule } from '../modules/i18n/translation.module';
import { CoreModule } from '../_metronic/core';
import { GeneralModule } from '../_metronic/partials/content/general/general.module';
import { ExtrasModule } from '../_metronic/partials/layout/extras/extras.module';
import { SubheaderModule } from '../_metronic/partials/layout/subheader/subheader.module';

@NgModule({
   imports: [CommonModule,
      AlertModule,
      MatIconModule,
      MatCardModule,
      MatTabsModule,
      MatTableModule, 
      MatInputModule,
      MatFormFieldModule,
      MatDatepickerModule,
      MatAutocompleteModule,
      MatListModule,
      MatSliderModule,
      MatCardModule,
      MatSelectModule,
      MatButtonModule,
      MatIconModule,
      MatNativeDateModule,
      MatSlideToggleModule,
      MatCheckboxModule,
      MatMenuModule,
      MatTabsModule,
      MatTooltipModule,
      MatSidenavModule,
      MatProgressBarModule,
      MatProgressSpinnerModule,
      MatSnackBarModule,
      MatTableModule,
      MatGridListModule,
      MatToolbarModule,
      MatBottomSheetModule,
      MatExpansionModule,
      MatDividerModule,
      MatSortModule,
      MatStepperModule,
      MatChipsModule,
      MatPaginatorModule,
      MatDialogModule,
      MatRippleModule,
      CoreModule,
      MatRadioModule,
      MatTreeModule,
      MatButtonToggleModule,
      GeneralModule,
      ReactiveFormsModule, 
        FontAwesomeModule,
    IntlModule,
    LabelModule,
    DateInputsModule ,  
    MomentDateModule, 
    AngularEditorModule ,
   ],
   exports: [
      AlertModule,
      MatIconModule,
      MatCardModule,
      MatTabsModule,
      MatTableModule, 
      MatInputModule,
      MatFormFieldModule,
      MatDatepickerModule,
      MatAutocompleteModule,
      MatListModule,
      MatSliderModule,
      MatCardModule,
      MatSelectModule,
      MatButtonModule,
      MatIconModule,
      MatNativeDateModule,
      MatSlideToggleModule,
      MatCheckboxModule,
      MatMenuModule,
      MatTabsModule,
      MatTooltipModule,
      MatSidenavModule,
      MatProgressBarModule,
      MatProgressSpinnerModule,
      MatSnackBarModule,
      MatTableModule,
      MatGridListModule,
      MatToolbarModule,
      MatBottomSheetModule,
      MatExpansionModule,
      MatDividerModule,
      MatSortModule,
      MatStepperModule,
      MatChipsModule,
      MatPaginatorModule,
      MatDialogModule,
      MatRippleModule,
      CoreModule,
      MatRadioModule,
      MatTreeModule,
      MatButtonToggleModule,
      GeneralModule,
      ReactiveFormsModule,
      CommonModule, FormsModule,
      TranslationModule,
      InlineSVGModule,
      ExtrasModule,
      NgbDropdownModule,
      NgbProgressbarModule,
      SubheaderModule,
       FontAwesomeModule,
       IntlModule,
       LabelModule,
       DateInputsModule ,
       MomentDateModule, 
       AngularEditorModule ,
       
       
   ]
})
export class SharedModule { }