import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-studencrud',
  templateUrl: './studencrud.component.html',
  styleUrls: ['./studencrud.component.scss']
})
export class StudencrudComponent {
  StudentArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  sname: string ="";
  course: string ="";
  fee: string ="";
  currentStudentID = "";

  constructor(private http: HttpClient ) 
  {
    this.getAllStudent();
  }
  ngOnInit(): void {
  }
  getAllStudent()
  { 
    this.http.get("http://localhost:8085/api/student/").subscribe({
      next: (resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.StudentArray = resultData.data;
      },
      error: (err) => {
        console.error('Error fetching students:', err);
        alert('Failed to load students. Please try again later.');
      },
    });
  }
  
  register()
  {
   // this.isLogin = false; 
   // alert("hi");
    let bodyData = {
      "sname" : this.sname,
      "course" : this.course,
      "fee" : this.fee,
    };
    this.http.post("http://localhost:8085/api/student/add",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Employee Registered Successfully")
        this.getAllStudent();
      //  this.name = '';
      //  this.address = '';
      //  this.mobile  = 0;
    });
  }
  setUpdate(data: any) 
  {
   this.sname = data.sname;
   this.course = data.course;
   this.fee = data.fee;
  
   this.currentStudentID = data.id;
 
  }
  UpdateRecords() {
    let bodyData = {
      sname: this.sname,
      course: this.course,
      fee: this.fee,
    };
    this.http.put("http://localhost:8085/api/student/update/" + this.currentStudentID, bodyData).subscribe({
      next: (resultData: any) => {
        console.log(resultData);
        alert("Student Updated Successfully");
        this.getAllStudent();
        this.resetForm();
        this.currentStudentID = '';
      },
      error: (err) => {
        console.error('Error updating student:', err);
        alert('Failed to update student. Please try again later.');
      },
    });
  }
 
  save() {
    if (!this.sname || !this.course || !this.fee) {
      alert('All fields are required.');
      return;
    }
    if (isNaN(+this.fee)) {
      alert('Fee must be a valid number.');
      return;
    }
    this.currentStudentID ? this.UpdateRecords() : this.register();
    this.resetForm();
  }
  setDelete(data: any)
  {
    this.http.delete("http://localhost:8085/api/student/delete"+ "/"+ data.id).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Deletedddd")
        this.getAllStudent();
    });
  }
  resetForm() {
    this.sname = '';
    this.course = '';
    this.fee = '';
  }
}