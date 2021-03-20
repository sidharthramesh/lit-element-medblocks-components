var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, html, property } from "lit-element";
import { LightElement } from "./lightelement";
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
let Repeatable = class Repeatable extends LightElement {
    constructor() {
        super();
        this.count = 1;
        this.minimum = 1;
        this.addEventListener('template-update', async () => {
            await this.requestUpdate();
        });
    }
    increaseCount() {
        this.count++;
    }
    decreaseCount() {
        if (this.count > this.minimum) {
            this.count--;
        }
    }
    registerTemplates() {
        var _a, _b;
        this.repeatableElement = this.querySelector('template[slot=content]').cloneNode(true);
        this.addButton = (_a = this.querySelector('[slot=add]')) === null || _a === void 0 ? void 0 : _a.cloneNode(true);
        this.removeButton = (_b = this.querySelector('[slot=remove]')) === null || _b === void 0 ? void 0 : _b.cloneNode(true);
    }
    get repeatedNodes() {
        return [...Array(this.count).keys()].map((i) => unsafeHTML(this.repeatableElement.innerHTML.split(this.replace).join(`${i}`)));
    }
    connectedCallback() {
        super.connectedCallback();
        this.registerTemplates();
        this.addEventListener('click', console.log);
    }
    render() {
        var _a, _b;
        return html `${this.repeatedNodes}${unsafeHTML((_a = this.addButton) === null || _a === void 0 ? void 0 : _a.outerHTML)}${unsafeHTML((_b = this.removeButton) === null || _b === void 0 ? void 0 : _b.outerHTML)}`;
    }
};
__decorate([
    property({ type: Object })
], Repeatable.prototype, "repeatableElement", void 0);
__decorate([
    property({ type: Object })
], Repeatable.prototype, "addButton", void 0);
__decorate([
    property({ type: Object })
], Repeatable.prototype, "removeButton", void 0);
__decorate([
    property({ type: Number })
], Repeatable.prototype, "count", void 0);
__decorate([
    property({ type: Number })
], Repeatable.prototype, "minimum", void 0);
__decorate([
    property({ type: String })
], Repeatable.prototype, "replace", void 0);
Repeatable = __decorate([
    customElement('mb-repeatable')
], Repeatable);
export { Repeatable };
//# sourceMappingURL=repeatable.js.map