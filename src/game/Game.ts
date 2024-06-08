import Dodo from "$/Dodo";
import { GameScene } from "./scenes/Game";

export class FlappyBird {
    readonly dodo: Dodo;

    constructor(){
        this.dodo = new Dodo(document.getElementsByTagName('canvas')[0]);
    }

    loop = (time: number) => {
        this.dodo.loop(time);
        window.requestAnimationFrame(this.loop);
    };

    run() {
        this.dodo.transitionTo(e => new GameScene(e));
        this.dodo.render();
        this.loop(0);
    }
}