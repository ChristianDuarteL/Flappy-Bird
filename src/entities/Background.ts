import Renderer from "$/rendering/Renderer";
import { SpriteSheet } from "$/sprites/spritesheet";
import { SPRITESHEETS_REGISTRY } from "src/game/registries/spritesheets";
import { AbstractEntity } from "./Entity";
import { notNullOrUndefined } from "src/utils/Objects";

export class Background extends AbstractEntity {
    background: SpriteSheet = notNullOrUndefined(SPRITESHEETS_REGISTRY.get('flappy_bird'));
    offset = 0;
    speed = -100;

    tick(delta: number): void {
        this.offset += this.speed * delta / 1000;
        this.offset %= 426;
    }

    draw(renderer: Renderer): void {
        this.background.drawImage(renderer.context, 'background', 0, Math.round(this.offset), 0)
        this.background.drawImage(renderer.context, 'background', 0, Math.round(this.offset) + 426, 0)
    }
}