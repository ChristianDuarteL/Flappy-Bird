import Dodo from '../../Dodo';
import { point2Rect } from '../../core/collision';
import { MouseEventData } from '../../input/mouse';
import { MouseMoveEventData } from '../../input/mouse_movement';
import Renderer from '../../rendering/Renderer';
import { ASSET_TYPES, AssetKey } from '../../resource_management/IResourceLoader';
import ResourceManagement from '../../resource_management/ResourceManager';
import { SpriteSheet } from '../../sprites/spritesheet';
import { GUIElement } from '../elements';

interface AbstractButtonConfig<B extends AbstractButton<any>> {
    position: [number, number]
    size: [number, number]
    zIndex: number
    onClick: () => void
    render: (renderer: Renderer, mouseOver: boolean, mousePressed: boolean, button: B) => void
}

export class AbstractButton<T extends AbstractButtonConfig<any>> implements GUIElement {
    readonly zIndex: number;

    readonly dodo: Dodo;

    readonly config: T;

    public mouseOver: boolean = false;

    public mousePressed: boolean = false;

    constructor(dodo: Dodo, config: T) {
        this.dodo = dodo;
        this.config = config;
        this.zIndex = this.config.zIndex;
    }

    render(renderer: Renderer): void {
        this.config.render(renderer, this.mouseOver, this.mousePressed, this);
    }

    mouseDown(event: MouseEventData) {
        this.mousePressed = point2Rect(event.position, [...this.config.position, ...this.config.size]);
    }

    mouseUp(_: MouseEventData) {
        this.mousePressed = false;
    }

    click(data: MouseEventData) {
        if (!point2Rect(data.position, [...this.config.position, ...this.config.size]) || !point2Rect(data.previous_pos, [...this.config.position, ...this.config.size])) return;
        this.config.onClick();
    }

    mouseMove(event: MouseMoveEventData) {
        this.mouseOver = point2Rect(event.position, [...this.config.position, ...this.config.size]);
    }

    dispose(): void {
    }
}

export interface ButtonConfig extends AbstractButtonConfig<Button> {
    buttonFace: SpriteSheet
    font: string
    fontSize: number
    foreground: string
    text: string
}

export class Button extends AbstractButton<ButtonConfig> {
    public static defaultButtonConfig: ButtonConfig = {
        position: [0, 0],
        size: [100, 30],
        zIndex: 10,
        onClick: () => {},
        font: 'pixel',
        fontSize: 16,
        foreground: '#000',
        buttonFace: new SpriteSheet(
            ResourceManagement.instance.load(new AssetKey(ASSET_TYPES.IMAGE, './button_sprite_sheet.png')),
            {
                groups: [
                    {
                        x: 0,
                        y: 0,
                        grid_size: [3, 3],
                        cell_size: [8, 8],
                        name: 'button',
                        padding: [0, 0],
                    },
                ],
            },
        ),
        render: (renderer, _mouseOver, _mousePressed, button) => {
            const sheet = button.config.buttonFace;
            const pos = button.config.position;
            const size = button.config.size;
            const group = sheet.getGroup('button');
            const cellsWide = ((size[0] - group.cell_size[0]) / group.cell_size[0]);
            const cellsHigh = ((size[1] - group.cell_size[1]) / group.cell_size[1]);

            for (let i = 1; i < cellsWide; i++) {
                for (let j = 1; j < cellsHigh; j++) {
                    sheet.drawImage(renderer.context, 'button', 4, pos[0] + group.cell_size[0] * i, pos[1] + group.cell_size[1] * j);
                }
            }

            for (let i = 1; i < cellsWide; i++) {
                sheet.drawImage(renderer.context, 'button', 1, pos[0] + group.cell_size[0] * i, pos[1]);
                sheet.drawImage(renderer.context, 'button', 7, pos[0] + group.cell_size[0] * i, pos[1] + size[1] - group.cell_size[1]);
            }

            for (let i = 1; i < cellsHigh; i++) {
                sheet.drawImage(renderer.context, 'button', 3, pos[0], pos[1] + group.cell_size[1] * i);
                sheet.drawImage(renderer.context, 'button', 5, pos[0] + size[0] - group.cell_size[0], pos[1] + group.cell_size[1] * i);
            }

            sheet.drawImage(renderer.context, 'button', 0, ...pos);
            sheet.drawImage(renderer.context, 'button', 2, pos[0] + size[0] - group.cell_size[0], pos[1]);
            sheet.drawImage(renderer.context, 'button', 6, pos[0], pos[1] + size[1] - group.cell_size[1]);
            sheet.drawImage(renderer.context, 'button', 8, pos[0] + size[0] - group.cell_size[0], pos[1] + size[1] - group.cell_size[1]);
            renderer.context.setFont(button.config.font, button.config.fontSize);
            renderer.context.fillStyle = button.config.foreground;
            renderer.context.renderText(button.config.position[0] + button.config.size[0] / 2, button.config.position[1] + button.config.size[1] / 2, button.config.text);
        },
        text: '',
    };

    constructor(dodo: Dodo, config: Partial<ButtonConfig>) {
        super(dodo, { ...Button.defaultButtonConfig, ...config });
    }
}
