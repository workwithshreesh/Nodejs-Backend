import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandleCategoryApiService {

  private Base_URL = "http://localhost:8000/category/get-all-category"
  private Edit_URL = "http://localhost:8000/category/edit-category/"
  private Delete_URL = "http://localhost:8000/category/delete-category/"
  private Add_URL = "http://localhost:8000/category/post-category"
  private Truncate_URL = "http://localhost:8000/category/delete-all-data"

  constructor(private http:HttpClient) { }

  getCategoryData(page:number):Observable<any>{
    const params = new HttpParams().set('page', page.toString());
    return this.http.get<any>(this.Base_URL,{params});
  }

  postCategoryData(data:any):Observable<any>{
    return this.http.post<any>(this.Add_URL,data);
  }


  putCategoryData(id:number,data:any):Observable<any>{
    return this.http.put<any>(this.Edit_URL+id,data);
  }

  deleteDataCategory(id:number):Observable<any>{
    return this.http.delete<any>(this.Delete_URL+id);
  }

  truncateDataCategory():Observable<any>{
    return this.http.delete<any>(this.Truncate_URL);
  }

}
