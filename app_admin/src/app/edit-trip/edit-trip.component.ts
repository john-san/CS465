import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {

  editForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService
  ) { }

  ngOnInit() {
        // retrieve stashed tripCode
    let tripCode = localStorage.getItem("tripCode");
    if (!tripCode) {
      alert("Something wrong, couldn't find where I stashed the tripCode");
      this.router.navigate(['']);
      return;
    }

    console.log('EditTripComponent#onInit found tripCode ', tripCode)

    // initialize form
    this.editForm = this.formBuilder.group({
      _id: [],
      code: [tripCode, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
      prevCode: [tripCode]
    })

    console.log(`EditTripComponent#onInit calling TripDataService#getTrip/${tripCode}`)

    this.tripDataService.getTrip(tripCode)
      .then(data => {
        console.log(data);
        // Don't use editForm.setValue() b/c it will throw console error
        this.editForm.patchValue(data[0]);
      })
      .catch(err => {
        console.log(err);
        alert("Something wrong, couldn't find the trip");
        this.router.navigate(['']);
      });
  }

  onDelete(): void {
    const tripName = this.editForm.get('name').value;
    const tripCode = this.editForm.get('code').value;

    // ask for confirmation
    if (!confirm("Are you sure to delete " + tripName + "?")) {
      return;
    }

    localStorage.removeItem("tripCode");
    localStorage.setItem("tripCode", tripCode);
    this.router.navigate(["delete-trip"]);
  }

  onSubmit() {
    console.log("EditTripComponent#onSubmit")
    console.log(this.editForm.value)
    this.submitted = true;
    if (this.editForm.valid) {
      this.tripDataService.updateTrip(this.editForm.value)
      .then(data => {
        console.log(data);
        this.router.navigate(['']);
      });
    }
  }
}
