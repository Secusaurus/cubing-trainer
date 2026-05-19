import { Alg } from "https://cdn.cubing.net/v0/js/cubing/alg";
import { connectSmartPuzzle } from "https://cdn.cubing.net/v0/js/cubing/bluetooth";
import { debugKeyboardConnect } from "https://cdn.cubing.net/v0/js/cubing/bluetooth";
import { randomScrambleForEvent } from "https://cdn.cubing.net/v0/js/cubing/scramble";
import {
	TwistyAlgViewer,
	TwistyPlayer,
} from "https://cdn.cubing.net/v0/js/cubing/twisty";




async function asyncSetup(twistyPlayer) {
	console.log("asyncSetup");
	const keyboard = await debugKeyboardConnect(twistyPlayer); // TODO: attach to viewer only?
	console.log("keyboard", twistyPlayer, keyboard);
	keyboard.addAlgLeafListener((e) => {
		console.log("listener", e);
		twistyPlayer.experimentalAddAlgLeaf(e.latestAlgLeaf, {
			cancel: true,
		});
	});
}






globalThis.puzzle = null;
globalThis.twistyPlayer = null;

window.generateAlgorithm = generateAlgorithm;



window.addEventListener("DOMContentLoaded", async () => {
	const twistyPlayer = new TwistyPlayer({
		alg: new Alg(),
	});
	globalThis.twistyPlayer = twistyPlayer;

	document.querySelector("#player").appendChild(twistyPlayer);
	document
		.querySelector("#controls")
		.appendChild(new TwistyAlgViewer({ twistyPlayer }));

	asyncSetup(twistyPlayer);

	const connectButton = document.querySelector("#connect");
	connectButton.addEventListener("click", async () => {
		const puzzle = await connectSmartPuzzle();
		globalThis.puzzle = puzzle;
		connectButton.textContent = `Connected: ${puzzle.name() ?? "[unknown"}`;
		connectButton.disabled = true;

		puzzle.addAlgLeafListener((e) => {
			twistyPlayer.experimentalAddAlgLeaf(e.latestAlgLeaf, {
				cancel: true,
			});
		});

		const resetButton = document.querySelector("#player-pattern-reset");
		resetButton.addEventListener("click", () => {
			twistyPlayer.alg = new Alg();
		});
		resetButton.disabled = false;
	});
});



async function generateAlgorithm(targetState)
{
	//const scramble = (await randomScrambleForEvent("333")).toString();
  	//console.log(scramble);
	console.log((await globalThis.twistyPlayer.experimentalGet.alg()).toString());
	console.log([globalThis.twistyPlayer]);
	

    /*document.getElementById('algorithmOutput').textContent = `Algorithmus zum Zielzustand:\n${algorithm}`;*/
}