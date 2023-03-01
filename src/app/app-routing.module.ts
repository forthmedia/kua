import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IChingComponent } from './components/i-ching/i-ching.component';

const routes: Routes = [
  { path: '', component: IChingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
