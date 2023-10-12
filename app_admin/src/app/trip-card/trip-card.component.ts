import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import Trip from '../models/trip';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent implements OnInit {

  @Input() trip: Trip;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {

  }

  private editTrip(): void {
    localStorage.removeItem("tripCode")
    localStorage.setItem("tripCode", this.trip.code);
    this.router.navigate(['/edit-trip']);
  }

  private deleteTrip(trip: Trip): void {
    // ask for confirmation
    if (!confirm("Are you sure to delete " + trip.name + "?")) {
      return;
    }

    localStorage.removeItem("tripCode");
    localStorage.setItem("tripCode", trip.code);
    this.router.navigate(["delete-trip"]);
  }

}
