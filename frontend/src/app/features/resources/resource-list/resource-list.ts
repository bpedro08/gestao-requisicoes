import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceService } from '../../../core/services/resource.service';
import { ResourceForm } from '../resource-form/resource-form';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-resource-list',
  standalone: true,
  imports: [CommonModule, ResourceForm],
  templateUrl: './resource-list.html',
  styleUrl: './resource-list.scss'
})
export class ResourceList implements OnInit {
  resources:      any[]    = [];
  loading         = true;
  error           = '';
  showForm        = false;
  editingResource: any     = null;
  selectedType     = 'all';
  selectedIsActive = 'all';

  constructor(
    private resourceService: ResourceService,
    private cdr: ChangeDetectorRef,
    private title: Title
  ) {}

  ngOnInit() {
    this.loadResources();
    this.title.setTitle('Resources | ReqManager');
  }

loadResources() {
  this.loading = true;
  const filters: any = {};
  if (this.selectedType     !== 'all') filters.type      = this.selectedType;
  if (this.selectedIsActive !== 'all') filters.is_active = this.selectedIsActive;

  this.resourceService.getAll(filters).subscribe({
    next: res => {
      this.resources = res;
      this.loading   = false;
      this.cdr.detectChanges();
    },
    error: () => {
      this.error   = 'Failed to load resources';
      this.loading = false;
      this.cdr.detectChanges();
    }
  });
}

  openCreate() {
    this.editingResource = null;
    this.showForm        = true;
  }

  openEdit(resource: any) {
    this.editingResource = resource;
    this.showForm        = true;
  }

  closeForm() {
    this.showForm        = false;
    this.editingResource = null;
  }

  onSaved() {
    this.closeForm();
    this.loadResources();
  }

  toggleActive(resource: any) {
    this.resourceService.update(resource.id, { is_active: !resource.is_active }).subscribe({
      next: () => this.loadResources(),
      error: () => alert('Failed to update resource')
    });
  }

  delete(id: number) {
    if (!confirm('Are you sure you want to delete this resource?')) return;

    this.resourceService.delete(id).subscribe({
      next: () => this.loadResources(),
      error: () => alert('Failed to delete resource')
    });
  }

    onTypeChange(value: string) {
    this.selectedType = value;
    this.loadResources();
  }

  onActiveChange(value: string) {
    this.selectedIsActive = value;
    this.loadResources();
  }
}