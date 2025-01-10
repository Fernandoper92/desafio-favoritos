import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private LOCAL_STORAGE_KEY = 'rick-and-morty-favorites';

  constructor() {}

  getListFavoriteId(): string[] {
    let listFavoritesId: string[] = [];
    const storageItem = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    if (storageItem) listFavoritesId = JSON.parse(storageItem);
    return listFavoritesId.length ? listFavoritesId : [];
  }

  addFavoriteId(id: string) {
    let listFavoritesIds: string[] = this.getListFavoriteId();
    
    const index = listFavoritesIds.indexOf((id));
    if (index === -1) {
      listFavoritesIds.push(id);
    }
    localStorage.setItem(
      this.LOCAL_STORAGE_KEY,
      JSON.stringify(listFavoritesIds)
    );
  }

  removeFavoriteId(id: string) {
    let favorites: string[] = this.getListFavoriteId();
    const index = favorites.indexOf((id));
    if (index > -1) {
      favorites.splice(index, 1);
    }
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(favorites));
  }
}
