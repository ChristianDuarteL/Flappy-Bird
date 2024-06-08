import Renderer, { PIVOTS } from "$/rendering/Renderer";
import { SpriteSheet } from "$/sprites/spritesheet";
import { notNullOrUndefined } from "src/utils/Objects";
import { AbstractEntity } from "./Entity";
import { SPRITESHEETS_REGISTRY } from "src/game/registries/spritesheets";
import { Scene } from "$/scene/Scene";
import { randomInt } from "src/utils/random";
import { Pipeline } from "./Pipeline";
import { rect2Rect } from "$/core/collision";
import { GameScene } from "src/game/scenes/Game";

export class Pipe extends AbstractEntity {
    sheet: SpriteSheet = notNullOrUndefined(SPRITESHEETS_REGISTRY.get('flappy_bird'));

    stopped = false;

    x_position: number = 500;

    speed = 40;

    y_offset: number;

    spacing: number;

    static readonly OFFSET_SAFE_RANGE: [number,number] = [240, 530]

    pipeline: Pipeline;

    get collisionBox1 (): [number,number,number,number] {
        return [
            this.x_position - (78 / 2),
            this.y_offset - 480 - this.spacing,
            78,
            480
        ]
    }
    
    get collisionBox2 (): [number,number,number,number] {
        return [
            this.x_position - (78 / 2),
            this.y_offset + this.spacing,
            78,
            480
        ]
    }

    constructor(scene: Scene, pipeline: Pipeline, spacing: number = 70){
        super(scene);
        this.y_offset = randomInt(...Pipe.OFFSET_SAFE_RANGE)
        this.spacing = spacing;
        this.pipeline = pipeline;
    }

    tick(delta: number): void {
        if(GameScene.lost) return;
        if(this.stopped) return;
        this.x_position -= this.speed * delta / 1000;
        if(this.x_position < -50) {
            this.stopped = true;
            this.scene.removeEntity(this);
            this.pipeline.pipeDestroyed(this);
        }
    }

    collidesWith(box: [number,number,number,number]){
        return rect2Rect(this.collisionBox1, box) || rect2Rect(this.collisionBox2, box);
    }

    draw(renderer: Renderer): void {
        this.sheet.drawImagePivoted(renderer.context, 'pipes', 0, PIVOTS.BOT_CENTER, this.x_position, this.y_offset - this.spacing)
        this.sheet.drawImagePivoted(renderer.context, 'pipes', 1, PIVOTS.TOP_CENTER, this.x_position, this.y_offset + this.spacing)
        renderer.context.renderRect('#f008', ...this.collisionBox1)
        renderer.context.renderRect('#f008', ...this.collisionBox2)
    }
}