import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-teachercrud',
  templateUrl: './teachercrud.component.html',
  styleUrls: ['./teachercrud.component.scss']
})
export class TeachercrudComponent {
  isResultLoaded = false;
  TeacherArray : any[] = [];
  constructor(private http: HttpClient ) 
  {
    this.getAllTeachers();
  }
  getAllTeachers()
  { 
    this.http.get("http://localhost:8085/api/teacher/").subscribe({
      next: (resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.TeacherArray = resultData.data;
      },
      error: (err) => {
        console.error('Error fetching students:', err);
        alert('Failed to load students. Please try again later.');
      },
    });
  }
}
