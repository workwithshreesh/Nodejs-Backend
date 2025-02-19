import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { HandleCategoryApiService } from '../../services/handle-category-api.service';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-categorylist',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categorylist.component.html',
  styleUrl: './categorylist.component.css'
})
export class CategorylistComponent implements OnInit, OnDestroy {

  @ViewChild('modalContent') modalContent:any;

  AlldataSubscribe!:Subscription;
  PostDataSubscribe!:Subscription
  FormsData!:FormGroup;
  modalRefrence:any;

  AllData:any;
  EditData:any;
  totalPages:any;
  currentPage = 1;
  headers: string[] = [];
  
  constructor(
    private fb:FormBuilder,
    private apiData:HandleCategoryApiService,
    private modalService: NgbModal 

    ){}

  ngOnInit(): void {

    this.FormsData = this.fb.group({
      name: ['', Validators.required]
    });

    this.getCategoryApiData(this.currentPage)
    console.log(this.AllData?.categories[0])

  }

  ngOnDestroy() {
    if (this.AlldataSubscribe) {
      this.AlldataSubscribe.unsubscribe(); 
    }
  }

  open(): void {
   this.modalRefrence =  this.modalService.open(this.modalContent); 
  }
  

  saveChanges(): void {
    console.log(this.FormsData.value);
    const data = this.FormsData.value
    this.PostDataSubscribe = this.apiData.postCategoryData(data).subscribe(data=>{
      console.log(data)
    });
    this.modalRefrence.close()
    
  }

  editChanges(): void {

  }


  async getCategoryApiData(page:number){
    this.AlldataSubscribe = this.apiData.getCategoryData(page).subscribe(data=>{
      this.AllData = data;
      this.totalPages = this.AllData?.totalCount;
      this.headers = Object.keys(this.AllData?.categories[0])
      console.log(this.AllData, this.totalPages,this.headers)
    })
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getCategoryApiData(this.currentPage);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getCategoryApiData(this.currentPage);
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.getCategoryApiData(this.currentPage);
  }

}
