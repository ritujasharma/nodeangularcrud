import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-first-project';

  // Track visibility for each component
  isTeacherCrudVisible: boolean = false;
  isStudentCrudVisible: boolean = true; // Set the default to true to show StudentCrud by default

  // Show TeacherCrud
  showTeacherCrud() {
    this.isTeacherCrudVisible = true;
    this.isStudentCrudVisible = false; // Hide StudentCrud when TeacherCrud is shown
  }

  // Show StudentCrud
  showStudentCrud() {
    this.isStudentCrudVisible = true;
    this.isTeacherCrudVisible = false; // Hide TeacherCrud when StudentCrud is shown
  }
}
