/**
 * @license
 * Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

import { LitElement, html, customElement, property } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export class MyElement extends LitElement {
  @property({ type: Object }) innerElement: HTMLElement

  @property({ type: Number })
  count = 1;

  @property({ type: String })
  var: string

  @property({ type: Object })
  contentNode: HTMLTemplateElement

  @property({ type: Object })
  insertNode: HTMLTemplateElement

  get content(): HTMLElement {
    return this.querySelector('template[slot=content]');
  }

  get insert(): HTMLElement {
    return this.querySelector('template[slot=insert]')
  }

  connectedCallback() {
    super.connectedCallback()
    const contentTemplate = this.querySelector('template[slot=content]')
    console.log(contentTemplate)
    const contentNode = contentTemplate.cloneNode(true) as HTMLTemplateElement
    console.log(this.insert)
    contentNode.content.querySelector('slot').replaceWith(this.insert.innerHTML)
    this.contentNode = contentNode
    console.log(contentNode)
  }

  insertedContent(i: number) {
    const clone = this.contentNode.cloneNode(true) as HTMLElement
    return clone.innerHTML.split(`{{${this.var}}}`).join(`${i}`)
  }

  createRenderRoot() {
    return this
  }

  render() {
    return html`
    <h1>Hello!</h1>
    <slot name="hello">No slot</slot>
    <button @click=${this._onClick} part="button">
      Click Count: ${this.count}
    </button>
    <button @click=${()=> this.count--} >Reduce</button>
    
    ${[...Array(this.count).keys()].map((i) => unsafeHTML(this.insertedContent(i)))}
`;
  }

  private _onClick() {
    this.count++;
  }

  foo(): string {
    return 'foo';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement;
  }
}
