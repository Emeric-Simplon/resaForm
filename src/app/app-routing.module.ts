import { LocationComponent } from "./location/location.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { SuccessfullComponent } from './successfull/successfull.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "reservation", component: LocationComponent },
  { path: "success", component: SuccessfullComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
