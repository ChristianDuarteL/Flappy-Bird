import Renderer, { PIVOTS } from "$/rendering/Renderer";
import { SpriteSheet } from "$/sprites/spritesheet";
import { SPRITESHEETS_REGISTRY } from "src/game/registries/spritesheets";
import { AbstractEntity } from "./Entity";
import { notNullOrUndefined } from "src/utils/Objects";
import { Scene } from "$/scene/Scene";
import { KEYBOARD, KeyboardBroadcaster, KeyboardEventData, KeyboardEventType } from "$/input/keyboard";
import { Pipeline } from "./Pipeline";
import { GameScene } from "src/game/scenes/Game";

const gravity = .2;

export class Bird extends AbstractEntity {
    background: SpriteSheet = notNullOrUndefined(SPRITESHEETS_REGISTRY.get('flappy_bird'));

    position: [number, number];

    get roundedPos(): [number, number] {
        return [
            Math.floor(this.position[0]),
            Math.floor(this.position[1])
        ]
    }

    collisionBoxSize: [number, number] = [
        30,
        24
    ]

    get collisionBox (): [ number, number, number, number ] {
        const pos = this.roundedPos;
        return [
            pos[0] - this.collisionBoxSize[0] / 2,
            pos[1] - this.collisionBoxSize[1] / 2,
            ...this.collisionBoxSize
        ]
    }

    pipeline: Pipeline;

    speed: number = 0;

    animation: number = 0;
    animation_duration: number = 90;
    running_animation = true;

    get imageIndex () {
        const group = this.background.getGroup('bird');
        return Math.floor(this.animation / (this.animation_duration / (group.frames ?? (group.cell_size[0] * group.cell_size[1]))));
    }

    constructor(scene: Scene, pipeline: Pipeline) {
        super(scene);
        this.position = [ scene.dodo.canvas.width / 2, scene.dodo.canvas.height / 2 ];
        scene.dodo.listener_manager.addEventListener(KEYBOARD, this.onKey);
        this.pipeline = pipeline;
    }

    onKey = (event: KeyboardEventData) => {
        if(event.type == KeyboardEventType.DOWN && !event.repeat){
            this.running_animation = true;
            this.animation = 0;
            this.speed -= 7.5;
        }
    }

    dispose(): void {
        this.scene.dodo.listener_manager.removeEventListener(KEYBOARD, this.onKey);
    }

    tick(delta: number): void {
        if(GameScene.lost) return;
        if (this.scene instanceof GameScene && this.pipeline.collidesWithPipes(this.collisionBox)) {
            this.scene.lost()
        }
        if(this.running_animation){
            this.animation += delta;
            if(this.animation >= this.animation_duration){
                this.running_animation = false
            }
            this.animation %= this.animation_duration;
        }
        this.speed += gravity;
        this.position[1] += this.speed;
    }

    draw(renderer: Renderer): void {
        this.background.drawImagePivoted(renderer.context, 'bird', this.running_animation ? this.imageIndex : 0, PIVOTS.MID_CENTER, ...this.roundedPos)
    }
}