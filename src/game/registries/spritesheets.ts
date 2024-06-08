import { loadImage } from "$/resource_management/ResourceManager";
import { SpriteSheet } from "$/sprites/spritesheet";

export const SPRITESHEETS_REGISTRY = new Map<string, SpriteSheet>();

SPRITESHEETS_REGISTRY.set("flappy_bird", new SpriteSheet(loadImage('./flappy-bird.png'), {
    groups: [
        {
            x: 0,
            y: 0,
            cell_size: [426, 768],
            grid_size: [1, 1],
            name: 'background',
            padding: [0, 0],
            frames: 1,
        },
        {
            name: 'bird',
            x: 432,
            y: 0,
            cell_size: [51, 36],
            grid_size: [1, 3],
            padding: [0, 0],
            frames: 3,
        },
        {
            name: 'bird',
            x: 432,
            y: 108,
            cell_size: [78, 480],
            grid_size: [2, 1],
            padding: [0, 0],
            frames: 2,
        }
    ]
}))

