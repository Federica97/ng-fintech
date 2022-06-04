import { NavigationExtras } from "@angular/router";
import {createAction, props} from "@ngrx/store";


export const go = createAction('[Router] go',
  props<{ path: any[], extras?: NavigationExtras }>()
)

export const back = createAction('[Router] back');
export const forward = createAction('[Router] forward');
