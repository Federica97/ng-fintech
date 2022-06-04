import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ac-movement',
  template: `
    <mat-accordion class="my-5">
      <mat-expansion-panel (opened)="panelOpenState = true"
                           (closed)="panelOpenState = false">
        <mat-expansion-panel-header>
          <mat-panel-title style="text-align: left">
            <div class="pe-5 date"><i> [{{date}}]</i></div>
            <div class="pe-5" [ngClass]="{
              'in': type === 'in',
              'out': type === 'out'
              }"
            >
              {{type === 'in' ? '+' : '-'}}{{amount}} €
            </div>
            <div>{{title}}</div>
          </mat-panel-title>

          <mat-panel-description *ngIf="description">
            {{description | truncate:4}}
          </mat-panel-description>
        </mat-expansion-panel-header>
        <ng-template matExpansionPanelContent>
          <p><mat-icon matPrefix class="mt-1">description</mat-icon><span class="aligned-with-icon" style="margin-left: 5px;">{{description}}</span></p>
        </ng-template>

      </mat-expansion-panel>
    </mat-accordion>
  `,
  styles: [`

    .in, .out {
      font-weight: bold;
    }

    .in {
      color: green;
    }

    .out {
      color: red;
    }

    .date {
      font-size: 0.8em;
      color: var(--light-black-35);
    }


  `]
})
export class MovementComponent {

  @Input() date: string | null = null;
  @Input() amount: number | null = null;
  @Input() type: string | null = null;
  @Input() title: string | null = null;
  @Input() description: string | null = null;
  panelOpenState = false;

  constructor() {}

}
