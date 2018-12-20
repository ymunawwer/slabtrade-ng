import { Component,HostListener } from '@angular/core';
declare var feather:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'st';
  @HostListener("window:onbeforeunload",["$event"])
  clearLocalStorage(event){
    sessionStorage.removeItem('currentUser');
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    feather.replace();
  }
  ngOnDestroy() {
    sessionStorage.removeItem('currentUser');
  }
}
