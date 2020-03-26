import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import 'hammerjs';
import { MatFormFieldModule, MatInputModule  } from '@angular/material';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule
    ],
    declarations: [
    ],
    exports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
    ],
  // schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule { }
