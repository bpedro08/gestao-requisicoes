import { Component, EventEmitter, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { RequestService } from '../../../core/services/request.service';
import { ResourceService } from '../../../core/services/resource.service';

@Component({
  selector: 'app-request-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './request-form.html',
  styleUrl: './request-form.scss',
})
export class RequestForm implements OnInit {
  @Output() created = new EventEmitter<void>();

  form: FormGroup;
  resources: any[] = [];
  loading = false;
  error = '';
  success = '';

  constructor(
    private fb: FormBuilder,
    private requestService: RequestService,
    private resourceService: ResourceService,
    private cdr: ChangeDetectorRef,
  ) {
    this.form = this.fb.group({
      resource_id: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      observations: [''],
    });
  }

  ngOnInit() {
    this.resourceService.getActive().subscribe({
      next: (res) => {
        this.resources = res;
        this.cdr.detectChanges();
      },
      error: () => (this.error = 'Failed to load resources'),
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.error = '';
    this.success = '';

    this.requestService.create(this.form.value).subscribe({
      next: () => {
        this.success = 'Request created successfully';
        this.form.reset();
        this.loading = false;
        this.created.emit();
        setTimeout(() => (this.success = ''), 3000);
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to create request';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }
}
