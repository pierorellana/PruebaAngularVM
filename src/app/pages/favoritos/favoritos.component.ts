import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../author.service';
import { ObrasResponse } from 'src/app/interface/obras.interface';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css'],
})
export class FavoritosComponent implements OnInit {
  constructor(public favoriteService: AuthorService) {}

  ngOnInit(): void {}

  removeFromFavorites(obra: ObrasResponse): void {
    this.favoriteService.removeFavoriteWork(obra);
  }
}
