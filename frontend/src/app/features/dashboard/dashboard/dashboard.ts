import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RequestService } from '../../../core/services/request.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  stats: any = null;
  loading = true;

  constructor(
    private requestService: RequestService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.requestService.getDashboard().subscribe({
      next: res => {
        this.stats   = res;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}