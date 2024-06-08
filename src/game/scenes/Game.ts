import Dodo from "$/Dodo";
import { Scene } from "$/scene/Scene";
import { Background } from "src/entities/Background";

export class GameScene extends Scene {
    override readonly fill = "#fff";

    constructor(dodo: Dodo) {
        super(dodo);
        this.addEntity(_ => new Background());
    }
}