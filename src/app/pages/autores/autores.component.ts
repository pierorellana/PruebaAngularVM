import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ObrasModalComponent } from '../obras-modal/obras-modal.component';
import { AuthorService } from '../author.service';
import { AuthorResponse } from 'src/app/interface/autores.interface';
import { LoadingService } from 'src/app/loading.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.css'],
})
export class AutoresComponent implements OnInit {
  authors: string[] = [];
  loading: boolean = false;
  favoritosCount: number = 0;

  private ngUnsubscribe = new Subject();

  constructor(
    private authorService: AuthorService,
    public dialog: MatDialog,
    private loadingService: LoadingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadingService.loading$.subscribe((loading) => {
      this.loading = loading;
    });

    this.getAuthors();
    this.subscribeToFavoritosCount();
  }

  /**
   * La función ngOnDestroy se utiliza en Angular para cancelar la suscripción a cualquier suscripción en
   * curso y evitar pérdidas de memoria.
   */
  ngOnDestroy(): void {
    this.ngUnsubscribe.next(undefined);
    this.ngUnsubscribe.complete();
  }

  /**
   * La función "getAuthors" recupera una lista de autores del servicio de autor y la asigna a la
   * propiedad "autores", luego registra la lista en la consola.
   */
  getAuthors(): void {
    this.authorService.getAuthors().subscribe((response: AuthorResponse) => {
      this.authors = response.authors;
      console.log(this.authors);
    });
  }

  /**
   * La función abre un cuadro de diálogo modal que muestra las obras de un autor determinado.
   * @param {string} author - El parámetro autor es una cadena que representa el nombre del autor cuyas
   * obras queremos recuperar.
   */
  openObrasModal(author: string): void {
    const title = 'Sonnet';

    this.authorService.getWorksByAuthor(author).subscribe((works) => {
      this.dialog.open(ObrasModalComponent, {
        width: '90%',
        height: '90%',
        data: { author, obras: works },
      });
    });
  }

  goToFavoritos(): void {
    this.router.navigate(['/favoritos']);
  }

  /**
   * La función `subscribeToFavoritosCount` se suscribe a un observable que recupera una lista de obras
   * favoritas y actualiza la propiedad `favoritosCount` con la longitud de la lista.
   */
  private subscribeToFavoritosCount(): void {
    this.authorService
      .getFavoriteWorksObservable()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((favoriteWorks) => {
        this.favoritosCount = favoriteWorks.length;
      });
  }
}
