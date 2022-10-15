import {TEXTURES, State} from "../index.js";
import {Entity} from "./Entity.js";

export function Goomba() {
	Entity.call(this, ...arguments);

	return Object.assign(this, {
		state: Goomba.IDLE,
		vertices: new Float32Array([
			0,  16,
			16, 16,
			0,  0,
			16, 0,
		]),
	});
}

Goomba.init = () => {
	Goomba.IDLE = new State({
		size: [16, 16],
		texture: TEXTURES.get("assets/textures/sprites.png"),
		uv: [0, 128],
	});

	Goomba.WALKING = new State({
		size: [16, 16],
		texture: TEXTURES.get("assets/textures/sprites.png"),
		uv: [16, 128],
	});
};