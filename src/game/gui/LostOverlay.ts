import { IGUIOverlay } from "$/gui/controller";
import { BasicGUIMenu, GUIElement } from "$/gui/elements";
import { MouseEventData } from "$/input/mouse";
import { MouseMoveEventData } from "$/input/mouse_movement";
import Renderer, { Alignment, Baseline } from "$/rendering/Renderer";
import { GameScene } from "../scenes/Game";

export class LostOverlay extends BasicGUIMenu {
    render(renderer: Renderer): void {
        const w = renderer.context.canvas.width;
        renderer.context.fillStyle = "#000"
        renderer.context.setFont('sans-serif', 40);
        renderer.context.renderText(w / 2, 200, "PERDISTE", Baseline.Middle, Alignment.Center);
        renderer.context.renderText(w / 2, 250, "Score: " + GameScene.score, Baseline.Middle, Alignment.Center);
    }

    tick(delta: number): void {
        
    }
}