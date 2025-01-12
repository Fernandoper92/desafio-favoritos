import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private LOCAL_STORAGE_KEY = 'rick-and-morty-favorites';

  constructor() {}

  getListFavoriteId(): number[] {
    let listFavoritesId: number[] = [];
    const storageItem = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    if (storageItem) listFavoritesId = JSON.parse(storageItem);
    return listFavoritesId.length ? listFavoritesId : [];
  }

  togglefavoriteId(id: number) {
    let listFavoriteId: number[] = this.getListFavoriteId();
    const index = listFavoriteId.indexOf(id);
    if (index === -1) {
      listFavoriteId.push(id);
    } else {
      listFavoriteId.splice(index, 1);
    }
    localStorage.setItem(
      this.LOCAL_STORAGE_KEY,
      JSON.stringify(listFavoriteId)
    );
  }
}
