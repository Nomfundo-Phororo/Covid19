import { WelcomeComponent } from './welcome/welcome.component';
import { AppComponent } from './app.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [ {path: 'home',component:WelcomeComponent},
{path:'',redirectTo:'home', pathMatch:'full'},
   { path: 'Statistics', component: StatisticsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
