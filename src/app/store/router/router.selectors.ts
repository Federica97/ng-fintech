import { getSelectors } from '@ngrx/router-store';

export const {
  selectCurrentRoute,
  selectQueryParam,
  selectQueryParams,
  selectRouteParam,
  selectRouteParams,
  selectRouteData,
  selectUrl,
  selectFragment
} = getSelectors();
