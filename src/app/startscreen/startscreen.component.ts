import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-startscreen',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './startscreen.component.html',
  styleUrl: './startscreen.component.scss'
})
export class StartscreenComponent {


  constructor(private router: Router) { }

  ngOnInit(): void {}

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}

