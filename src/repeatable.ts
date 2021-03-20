import { customElement, html, property } from "lit-element";
import { LightElement } from "./lightelement";
import { templateContent } from 'lit-html/directives/template-content'
import { unsafeHTML } from 'lit-html/directives/unsafe-html'
@customElement('mb-repeatable')
export class Repeatable extends LightElement {
    @property({ type: Object })
    repeatableElement: HTMLTemplateElement

    @property({ type: Object })
    addButton: HTMLTemplateElement

    @property({ type: Object })
    removeButton: HTMLTemplateElement

    @property({ type: Number })
    count: number = 1

    @property({ type: Number })
    minimum: number = 1

    @property({ type: String })
    replace: string

    constructor() {
        super()
        this.addEventListener('template-update', async () => {
            await this.requestUpdate()
        })
    }

    private increaseCount() {
        this.count++
    }

    private decreaseCount() {
        if (this.count > this.minimum) {
            this.count--
        }
    }

    private registerTemplates() {
        this.repeatableElement = this.querySelector('template[slot=content]').cloneNode(true) as HTMLTemplateElement
        this.addButton = this.querySelector('[slot=add]')?.cloneNode(true) as HTMLTemplateElement
        this.removeButton = this.querySelector('[slot=remove]')?.cloneNode(true) as HTMLTemplateElement
    }

    get repeatedNodes() {
        return [...Array(this.count).keys()].map((i) => unsafeHTML(this.repeatableElement.innerHTML.split(this.replace).join(`${i}`)))
    }


    connectedCallback() {
        super.connectedCallback()
        this.registerTemplates()
        this.addEventListener('click', console.log)
    }
    render() {
        return html`${this.repeatedNodes}${unsafeHTML(this.addButton?.outerHTML)}${unsafeHTML(this.removeButton?.outerHTML)}`
    }

}