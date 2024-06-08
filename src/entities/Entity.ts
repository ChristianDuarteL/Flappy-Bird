import { Scene } from '$/scene/Scene';
import Renderer from '../engine/rendering/Renderer';

export default interface Entity {
    readonly zIndex: number
    readonly boundingBox: [number, number, number, number]
    tick: (delta: number) => void
    draw: (renderer: Renderer) => void
    dispose: () => void
}

export abstract class AbstractEntity implements Entity {
    readonly zIndex: number = 0;
    readonly boundingBox: [number, number, number, number] = [0, 0, 432, 768]
    readonly scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    tick(_delta: number) {

    }
    draw(_renderer: Renderer) {

    }
    dispose() {

    }
}