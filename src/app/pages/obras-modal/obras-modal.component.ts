import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthorService } from '../author.service';

@Component({
  selector: 'app-obras-modal',
  templateUrl: './obras-modal.component.html',
  styleUrls: ['./obras-modal.component.css'],
})
export class ObrasModalComponent {
  /**
   * La función constructora toma datos y un servicio favorito y registra los datos en la consola.
   * @param {any} data - El parámetro "datos" es de tipo "cualquiera" y se inyecta utilizando el token
   * "MAT_DIALOG_DATA". Se utiliza para pasar datos al componente de diálogo cuando se abre. La
   * declaración `console.log(data)` se utiliza para registrar el valor de `data` en la consola para su
   * depuración.**/

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private favoriteService: AuthorService
  ) {
    console.log(data);
  }

  /**
   * La función alterna el estado favorito de una obra agregándola o eliminándola de la lista de
   * favoritos.
   * @param {any} obra - El parámetro "obra" es de tipo "cualquiera", lo que significa que puede
   * aceptar cualquier tipo de datos. Se utiliza para representar una obra o un elemento que se puede
   * marcar como favorito.
   */
  toggleFavorite(obra: any): void {
    if (this.isFavorite(obra)) {
      this.favoriteService.removeFavoriteWork(obra);
    } else {
      this.favoriteService.addFavoriteWork(obra);
    }
  }

  /**
   * La función comprueba si una obra determinada está en la lista de obras favoritas del usuario.
   **/
  isFavorite(obra: any): boolean {
    return this.favoriteService
      .getFavoriteWorks()
      .some((favorite) => favorite.title === obra.title);
  }
}
