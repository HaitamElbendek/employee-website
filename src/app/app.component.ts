import {Component, OnInit} from '@angular/core';
import {Employee} from "./employee";
import {EmployeeService} from "./employee.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  // a variable that will hold our employees when we get them back
  public employees: Employee[] | undefined;
  public employeeForEdit: Employee | undefined;
  public employeeForDelete: Employee | undefined;

  // to create a function that calls  the service we need to inject the service

  constructor(private employeeService:EmployeeService) {}
 ngOnInit() {
    this.getEmployees();
 }

  public getEmployees():void{
    // we do subscribe because the data will take time, and we will need to be notified whenever it arrived
  this.employeeService.getEmployees().subscribe(
    // we specify response
    (response:Employee[])=>{
      //if we get response this code will be executed
      this.employees=response;
    },
    (error:HttpErrorResponse)=>{
      alert(error.message)
    }
  )


  }

  // we have to have name attribute in form in html and add ngModel
  public onAddEmployee(addForm:NgForm):void{

    document.getElementById('add-employee-form')!.click();
      this.employeeService.addEmployee(addForm.value).subscribe(
        (response :  Employee)=>{
          console.log(response);
          //  to refresh employees data
          this.getEmployees()
          //to  reset the form whenever we  add employee and clear it from old data inputs
          addForm.reset()
        },(error:HttpErrorResponse)=>{
          alert(error.message)
          addForm.reset()
        }
      )

  }

  public onEditEmployee(employee:Employee):void{
    document.getElementById('edit-employee-form')!.click()
    this.employeeService.updateEmployee(employee).subscribe(
      (response:Employee)=>{
        console.log(response);
        this.getEmployees()
      },(error:HttpErrorResponse)=>{
      alert(error.message);
    }
    )
  }

  public onDeleteEmployee(employeeId: number): void {
    document.getElementById('delete-employee')!.click()
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.log(response)
        this.getEmployees()
      }, (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    )

  }
}
