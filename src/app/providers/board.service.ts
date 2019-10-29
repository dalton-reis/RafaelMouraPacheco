import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BoardService {
  constructor(private httpClient: HttpClient) {}

  public uploadImage(boardId: string, file: any): Observable<any> {
    return Observable.create(observer => {
      const token = localStorage.getItem('token');
      const url: string = `https://tagarela-backend.herokuapp.com/saveFile/${boardId}`;

      const formData = new FormData();
      formData.append('file', file);

      var xhr: XMLHttpRequest = new XMLHttpRequest();

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            observer.next(JSON.parse(xhr.response));
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };

      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      xhr.send(formData);
    });
  }

  public getImage(fileId: string): Observable<any> {
    let url: string = `https://tagarela-backend.herokuapp.com/file/${fileId}`;
    return this.httpClient.get(url);
  }

  public getMultipleFiles(images: string): Observable<any> {
    let url: string = `https://tagarela-backend.herokuapp.com/files`;
    return this.httpClient.post(url, images);
  }

  public saveBoard(board: any): Observable<any> {
    let url: string = `https://tagarela-backend.herokuapp.com/board`;
    return this.httpClient.post(url, board);
  }

  public updateBoard(board: any): Observable<any> {
    let url: string = `https://tagarela-backend.herokuapp.com/board/` + board._id;
    return this.httpClient.put(url, board);
  }

  public getBoardsByPlan(planId): Observable<any> {
    let url: string = `https://tagarela-backend.herokuapp.com/boards/${planId}/plan`;
    return this.httpClient.get(url);
  }

  public getPlans(): Observable<any> {
    let url: string = `https://tagarela-backend.herokuapp.com/plans`;
    return this.httpClient.get(url);
  }

  public getPlansByUser(owner: string): Observable<any> {
    let url: string = `https://tagarela-backend.herokuapp.com/plan/${owner}`;
    return this.httpClient.get(url);
  }

  public newPlan(plan): Observable<any> {
    let url: string = `https://tagarela-backend.herokuapp.com/plan`;
    return this.httpClient.post(url, plan);
  }

  public getSymbols(): Observable<any> {
    const mockSymbols = [
      {
        id: 1,
        name: 'name 1',
        description: 'description 1',
        category: {
          id: 1,
          name: 'name 1',
          description: 'description 1',
          color: '#333'
        }
      },
      {
        id: 2,
        name: 'name 2',
        description: 'description 2'
      }
    ];
    return Observable.of(mockSymbols);
  }

  public newSymbol(newSymbol): Observable<any> {
    return Observable.of(newSymbol);
  }

  public getCategories(): Observable<any> {
    const mockSymbols = [
      {
        id: 1,
        name: 'name 1',
        description: 'description 1',
        color: '#333'
      },
      {
        id: 2,
        name: 'name 2',
        description: 'description 2',
        color: '#333'
      }
    ];
    return Observable.of(mockSymbols);
  }

  public newCategory(newCategory): Observable<any> {
    return Observable.of(newCategory);
  }

  /**
   * Convert a base64 string in a Blob according to the data and contentType.
   *
   * @param b64Data {String} Pure base64 string without contentType
   * @param sliceSize {Int} SliceSize to process the byteCharacters
   * @return Blob
   */
  public b64toBlob(b64Data, sliceSize = 512) {
    var byteArrays = [];

    for (var offset = 0; offset < b64Data.length; offset += sliceSize) {
      var slice = b64Data.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: 'image/jpeg' });
    return blob;
  }
}
