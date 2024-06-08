import Dodo from "$/Dodo";
import { Scene } from "$/scene/Scene";
import { Background } from "src/entities/Background";
import { Bird } from "src/entities/Bird";
import { Pipe } from "src/entities/Pipe";
import { Pipeline } from "src/entities/Pipeline";
import { LostOverlay } from "../gui/LostOverlay";

export class GameScene extends Scene {
    override readonly fill = "#fff";
    static lost = false;
    static score = 0;

    constructor(dodo: Dodo) {
        super(dodo);
        this.addEntity(scene => new Background(scene));
        const pipeline = this.addEntity(scene => new Pipeline(scene));
        this.addEntity(scene => new Bird(scene, pipeline));
        GameScene.lost = false;
    }

    lost() {
        GameScene.lost = true;
        this.dodo.guiController.setMenu(new LostOverlay());
    }
}