import {TEXTURES, Renderer, Texture} from "../index.js";

/**
 * Asynchronous texture loader.
 * 
 * @async
 * @param	{...string}	paths
 */
export async function loadTextures(...paths) {
	const
		{gl}	= Renderer,
		then	= performance.now();
	let image, texture, count = 0;

	for (const path of paths) {
		image = new Image();
		image.src = path;

		try {
			await image.decode();
		} catch (e) {
			continue;
		}

		texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.generateMipmap(gl.TEXTURE_2D);

		TEXTURES.set(path, new Texture({image, texture}));

		count++;
	}

	gl.bindTexture(gl.TEXTURE_2D, null);

	console.log(`%c${count} textures loaded (took ${((performance.now() - then) / 1000).toFixed(2)}s)`, "color: #6cbf6c");
}