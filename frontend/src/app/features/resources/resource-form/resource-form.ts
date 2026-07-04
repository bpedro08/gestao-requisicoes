import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ResourceService } from '../../../core/services/resource.service';

@Component({
  selector: 'app-resource-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './resource-form.html',
  styleUrl: './resource-form.scss'
})
export class ResourceForm implements OnInit {
  @Input() resource: any = null; // null = create mode, object = edit mode
  @Output() saved    = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  form: FormGroup;
  loading = false;
  error   = '';

  types = ['space', 'equipment', 'vehicle', 'other'];

  constructor(
    private fb: FormBuilder,
    private resourceService: ResourceService
  ) {
    this.form = this.fb.group({
      name:        ['', Validators.required],
      type:        ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit() {
    // if editing, populate the form with existing values
    if (this.resource) {
      this.form.patchValue({
        name:        this.resource.name,
        type:        this.resource.type,
        description: this.resource.description
      });
    }
  }

  get isEditMode(): boolean {
    return !!this.resource;
  }

  submit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.error   = '';

    const call = this.isEditMode
      ? this.resourceService.update(this.resource.id, this.form.value)
      : this.resourceService.create(this.form.value);

    call.subscribe({
      next: () => {
        this.loading = false;
        this.saved.emit();
      },
      error: (err) => {
        this.error   = err.error?.message || 'Failed to save resource';
        this.loading = false;
      }
    });
  }
}