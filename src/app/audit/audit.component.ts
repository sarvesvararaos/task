import { AuditService, AuthenticationService } from '@/_services';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';


@Component({ templateUrl: 'audit.component.html' })
export class AuditComponent implements OnInit {
    audits = [];
    count = 0;
    currentUser = JSON.parse(localStorage.getItem('currentUser'))

    constructor(
        private authenticationService: AuthenticationService,
        private auditService: AuditService
    ) {
        this.config = {
            itemsPerPage: 5,
            currentPage: 1,
            totalItems: this.audits.length
          };
    }
  term: string;
  config: any;
   
    ngOnInit() {
     
        this.loadAllAudits();
    }

    private loadAllAudits() {
        this.auditService.getAll()
            .pipe(first())
            .subscribe(audits => this.audits = audits);
    }

    sort(val: string) {
        this.count++;
        if (this.count % 2 == 0) {
            this.audits.sort((a, b) => (a[val] < b[val]) ? 1 : -1)
        }
        else {
            this.audits.sort((a, b) => (a[val] > b[val]) ? 1 : -1)
        }
    }

    pageChanged(event){
        this.config.currentPage = event;
      }
}