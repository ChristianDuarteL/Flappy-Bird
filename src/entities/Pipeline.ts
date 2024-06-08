import { Scene } from "$/scene/Scene";
import { GameScene } from "src/game/scenes/Game";
import { AbstractEntity } from "./Entity";
import { Pipe } from "./Pipe";

export class Pipeline extends AbstractEntity {
    genSpeed = 8000;

    genTick = 8000;

    pipes: Set<Pipe> = new Set();

    constructor(scene: Scene){
        super(scene);
    }

    tick(delta: number): void {
        if(GameScene.lost) return;
        this.genTick += delta;
        while (this.genTick > this.genSpeed){
            const pipe = this.scene.addEntity(scene => new Pipe(scene, this));
            this.pipes.add(pipe)
            this.genTick -= this.genSpeed;
        }
    }

    collidesWithPipes(collisionBox: [number,number,number,number]) {
        for (const pipe of this.pipes) {
            if(pipe.collidesWith(collisionBox)) return true;
        }
        return false;
    }

    pipeDestroyed(pipe: Pipe){
        this.pipes.delete(pipe)
    }
}