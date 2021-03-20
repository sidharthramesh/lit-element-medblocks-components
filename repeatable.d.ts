import { LightElement } from "./lightelement";
export declare class Repeatable extends LightElement {
    repeatableElement: HTMLTemplateElement;
    addButton: HTMLTemplateElement;
    removeButton: HTMLTemplateElement;
    count: number;
    minimum: number;
    replace: string;
    constructor();
    private increaseCount;
    private decreaseCount;
    private registerTemplates;
    get repeatedNodes(): ((part: import("lit-html").Part) => void)[];
    connectedCallback(): void;
    render(): import("lit-element").TemplateResult;
}
//# sourceMappingURL=repeatable.d.ts.map