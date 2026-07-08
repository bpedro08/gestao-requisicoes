import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { RequestService } from '../../../core/services/request.service';
import { RequestForm } from '../request-form/request-form';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-request-list',
  standalone: true,
  imports: [CommonModule, DatePipe, RequestForm],
  templateUrl: './request-list.html',
  styleUrl: './request-list.scss'
})
export class RequestList implements OnInit {
  requests: any[] = [];
  loading = true;
  error   = '';

  constructor(
    public auth: AuthService,
    private requestService: RequestService,
    private cdr: ChangeDetectorRef,
    private title: Title
  ) {}

  ngOnInit() {
    this.loadRequests();
    this.title.setTitle('Requests | ReqManager');
  }

  loadRequests() {
    this.loading = true;
    this.requestService.getAll().subscribe({
      next: res => {
        this.requests = res;
        this.loading  = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error   = 'Failed to load requests';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  cancel(id: number) {
    if (!confirm('Are you sure you want to cancel this request?')) return;

    this.requestService.cancel(id).subscribe({
      next: () => this.loadRequests(),
      error: (err) => alert(err.error?.message || 'Failed to cancel request')
    });
  }

  canCancel(request: any): boolean {
    return request.status === 'pending' || request.status === 'approved';
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