import type { Action } from "./types";

export abstract class Observer {
    private actions: Map<string, Action[]> = new Map();

    public subscribe(event: string, action: Action): void {
        if (!action) return;
        
        const actions = this.actions.get(event) ?? [];
        actions.push(action);
        this.actions.set(event, actions);
    }

    public notify(event: string): void {
        const actions = this.actions.get(event);
        
        if (!actions || actions.length === 0) return;
        
        for (const action of actions) {
            action.invoke();
        }
    }
}