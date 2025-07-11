import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router, RouterLink, RouterModule, RouterOutlet, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GK1Component } from './component/Sets/GK/gk1/gk1.component';
import { SpinwheelComponent } from './component/spinwheel/spinwheel.component';
import { GK2Component } from './component/Sets/GK/gk2/gk2.component';
import { R1Component } from './component/Sets/Riddle/r1/r1.component';
import { GK3Component } from './component/Sets/GK/gk3/gk3.component';
import { R2Component } from './component/Sets/Riddle/r2/r2.component';
import { R4Component } from './component/Sets/Riddle/r4/r4.component';
import { GK4Component } from './component/Sets/GK/gk4/gk4.component';
import { TW1Component } from './component/Sets/Toung_Twistter/tw1/tw1.component';
import { GK5Component } from './component/Sets/GK/gk5/gk5.component';
import { R3Component } from './component/Sets/Riddle/r3/r3.component';
import { R5Component } from './component/Sets/Riddle/r5/r5.component';
import { TW2Component } from './component/Sets/Toung_Twistter/tw2/tw2.component';
import { TW3Component } from './component/Sets/Toung_Twistter/tw3/tw3.component';
import { TW4Component } from './component/Sets/Toung_Twistter/tw4/tw4.component';
import { TW5Component } from './component/Sets/Toung_Twistter/tw5/tw5.component';
import { Sp1Component } from './component/Sets/Sports/sp1/sp1.component';
import { BWHW1Component } from './component/Sets/Bollywood-Hollywood/bwhw1/bwhw1.component';
import { Sp2Component } from './component/Sets/Sports/sp2/sp2.component';
import { Sp3Component } from './component/Sets/Sports/sp3/sp3.component';
import { Sp4Component } from './component/Sets/Sports/sp4/sp4.component';
import { Sp5Component } from './component/Sets/Sports/sp5/sp5.component';
import { BWHW2Component } from './component/Sets/Bollywood-Hollywood/bwhw2/bwhw2.component';
import { BWHW3Component } from './component/Sets/Bollywood-Hollywood/bwhw3/bwhw3.component';
import { BWHW4Component } from './component/Sets/Bollywood-Hollywood/bwhw4/bwhw4.component';
import { BWHW5Component } from './component/Sets/Bollywood-Hollywood/bwhw5/bwhw5.component';
import { LoginComponent } from './component/Login_Registration/login/login.component';
import { RegistrationComponent } from './component/Login_Registration/registration/registration.component';
import { Logo1Component } from './component/Sets/Logo/logo1/logo1.component';
import { Logo2Component } from './component/Sets/Logo/logo2/logo2.component';
import { Logo3Component } from './component/Sets/Logo/logo3/logo3.component';
import { Logo4Component } from './component/Sets/Logo/logo4/logo4.component';
import { Logo5Component } from './component/Sets/Logo/logo5/logo5.component';
import { AdminnavComponent } from './component/Admin/adminnav/adminnav.component';
import { QuizformComponent } from './component/Admin/quizform/quizform.component';
import { DashboardComponent } from './component/Admin/dashboard/dashboard.component';
import { LogoformComponent } from './component/Admin/logoform/logoform.component';
import { RiddleTWformComponent } from './component/Admin/riddle-twform/riddle-twform.component';
import { Com1Component } from './component/Sets/Computer/com1/com1.component';
import { Com2Component } from './component/Sets/Computer/com2/com2.component';
import { Com3Component } from './component/Sets/Computer/com3/com3.component';
import { Com4Component } from './component/Sets/Computer/com4/com4.component';
import { Com5Component } from './component/Sets/Computer/com5/com5.component';
import { authGuard } from './auth.guard';
  
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterLink,RouterModule,FormsModule,SpinwheelComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isStartPage: boolean = true; // State to track whether we are on the Start page

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // Subscribe to the route changes
    this.router.events.subscribe(() => {
      // Check if the current route is the Start page or not
      this.isStartPage = this.router.url === '/';
    });
  }
}

  export const routes: Routes = [
    { path:'app-login',component:LoginComponent },
    { path:'app-registration',component:RegistrationComponent },    

    {path:'',  canActivate: [authGuard] ,children:[
    { path:'app-spinwheel', component:SpinwheelComponent  },
    { path:'app-gk1', component:GK1Component },
    { path:'app-gk2', component:GK2Component },
    { path:'app-gk3', component:GK3Component },
    { path:'app-gk4', component:GK4Component },
    { path:'app-gk5', component:GK5Component },

    { path:'app-r1', component:R1Component  },
    { path:'app-r2', component:R2Component  },
    { path:'app-r3', component:R3Component  },
    { path:'app-r4', component:R4Component  },
    { path:'app-r5', component:R5Component  },

    { path:'app-tw1', component:TW1Component },
    { path:'app-tw2', component:TW2Component },
    { path:'app-tw3', component:TW3Component },
    { path:'app-tw4', component:TW4Component },
    { path:'app-tw5', component:TW5Component },

    { path:'app-sp1', component:Sp1Component },
    { path:'app-sp2', component:Sp2Component },
    { path:'app-sp3', component:Sp3Component },
    { path:'app-sp4', component:Sp4Component },
    { path:'app-sp5', component:Sp5Component },

    { path:'app-bwhw1', component:BWHW1Component },
    { path:'app-bwhw2', component:BWHW2Component },
    { path:'app-bwhw3', component:BWHW3Component },
    { path:'app-bwhw4', component:BWHW4Component },
    { path:'app-bwhw5', component:BWHW5Component },

    { path:'app-logo1', component:Logo1Component },
    { path:'app-logo2', component:Logo2Component },
    { path:'app-logo3', component:Logo3Component },
    { path:'app-logo4', component:Logo4Component },
    { path:'app-logo5', component:Logo5Component },

    { path:'app-com1',  component:Com1Component },
    { path:'app-com2',  component:Com2Component },
    { path:'app-com3',  component:Com3Component },
    { path:'app-com4',  component:Com4Component },
    { path:'app-com5',  component:Com5Component },]
    },

    { path:'app-quizform', component: QuizformComponent },
    { path:'app-dashboard', component: DashboardComponent },
    { path:'app-logoform', component: LogoformComponent },
    { path:'app-riddle-twform', component: RiddleTWformComponent },
    { path:'app-dashboard', component: DashboardComponent },
    {path:'app-adminnav',component:AdminnavComponent },

 ];

  