import { RequestService } from './../services/request.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EmailValidator } from '../validators/email-validator.directive';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  
  loading:boolean = false;
  message: string;
  registered: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private formBuilder: FormBuilder,
    private requestService: RequestService
    ) { }
  requestForm = this.formBuilder.group({
    name : ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]], 
    emailConfirm: ['', [Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]]
  }, {validators: EmailValidator})
  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close();
  }

  onSubmit(){
    this.loading = true;
    const user = {
      name: this.requestForm.value.name,
      email: this.requestForm.value.email
    }
    this.requestService.postRequest(user).subscribe((message)=>{
      this.registered = true;
    }, error=>{
      this.message = error;
      this.loading = !this.loading;
    })
  }
  get name() { 
    return this.requestForm.get('name'); 
  }

  get email(){
    return this.requestForm.get('email');
  }

  get emailConfirm(){
    return this.requestForm.get('emailConfirm');
  }
}
