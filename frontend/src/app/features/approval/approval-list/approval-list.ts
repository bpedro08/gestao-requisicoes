import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RequestService } from '../../../core/services/request.service';

@Component({
  selector: 'app-approval-list',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './approval-list.html',
  styleUrl: './approval-list.scss'
})
export class ApprovalListComponent implements OnInit {
  requests:    any[] = [];
  loading      = true;
  error        = '';
  adminNotes:  { [id: number]: string } = {};

  constructor(
    private requestService: RequestService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadRequests();
  }

  loadRequests() {
    this.loading = true;
    this.requestService.getAll().subscribe({
      next: res => {
        this.requests = res;
        this.loading  = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error   = 'Failed to load requests';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  approve(id: number) {
    this.requestService.approve(id, this.adminNotes[id] || '').subscribe({
      next: () => this.loadRequests(),
      error: (err) => alert(err.error?.message || 'Failed to approve request')
    });
  }

  reject(id: number) {
    if (!this.adminNotes[id]?.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }
    this.requestService.reject(id, this.adminNotes[id]).subscribe({
      next: () => this.loadRequests(),
      error: (err) => alert(err.error?.message || 'Failed to reject request')
    });
  }

  complete(id: number) {
    this.requestService.complete(id).subscribe({
      next: () => this.loadRequests(),
      error: (err) => alert(err.error?.message || 'Failed to complete request')
    });
  }

  statusClass(status: string): string {
    const map: any = {
      pending:   'badge-pending',
      approved:  'badge-approved',
      rejected:  'badge-rejected',
      completed: 'badge-completed',
      cancelled: 'badge-cancelled'
    };
    return map[status] || '';
  }
}