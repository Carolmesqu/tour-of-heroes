import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  /*Não podemos deixar uma propriedade que no exemplo
  * é a message publica, pois outro lugar pode modifica-la
  * sem notarmos. Só podemos modificar ela quando criamos um
  * metodo publico, no caso getMessages
  * No service só deixamos como público apenas o que
  * vai poder ser usado.
  * criamos um service singotoul e adicionamos ele dentro do
  * compont
  */
  private messages: string[] = [];

 add(message: string): void {
  this.messages.push(message);
  }
  clear(): void {
    this.messages = [];
  }
  //Metodo
  getMessages(): string[]{
    return this.messages;
  }
}
