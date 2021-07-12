export default class compositeManipulation {
	constructor(options = {}) {
		this.options = { ...options };
		this.initMatter();
		this.initBounds();
		// this.initStack();
		this.initLetters();
		this.letters = Matter.Composite.allBodies(this.engine.world).filter((b) => b.label === 'letter');
		console.log(this.letters);
		this.addEvents();
	}

	initMatter() {
		// Create and manipulate the Engine
		this.engine = Matter.Engine.create();

		this.world = this.engine.world;

		// Matter.Render module is a simple canvas based renderer
		this.render = Matter.Render.create({
			element: this.options.element,
			engine: this.engine,
			options: { ...this.options.matterOptions },
		});
		Matter.Render.run(this.render);
		Matter.Render.lookAt(this.render, { ...this.render.bounds });

		// Create a mouse instance
		this.mouse = Matter.Mouse.create(this.render.canvas);
		this.render.mouse = this.mouse;

		// Create mouse Constraint
		const mouseConstraint = Matter.MouseConstraint.create(this.engine, {
			mouse: this.mouse,
			constraint: {
				stiffness: 0.5,
				render: {
					visible: true,
				},
			},
		});
		Matter.Composite.add(this.world, mouseConstraint);

		// Matter Runner provides a game loop, that handles continuously update a Matter.Engine
		this.runner = Matter.Runner.create();
		Matter.Runner.run(this.runner, this.engine);

		// Store bounds information
		this.bounds = this.normalizeBounds();
	}

	initBounds() {
		// Thickness
		const t = 40;
		const options = { isStatic: true, render: { fillStyle: 'gray' } };
		Matter.Composite.add(this.world, [
			Matter.Bodies.rectangle(this.bounds.w / 2, this.bounds.y + t / 2, this.bounds.w, t, { ...options }),
			Matter.Bodies.rectangle(this.bounds.w / 2, this.bounds.h - t / 2, this.bounds.w, t, { ...options }),
			Matter.Bodies.rectangle(t / 2, this.bounds.h / 2, t, this.bounds.h, { ...options }),
			Matter.Bodies.rectangle(this.bounds.w - t / 2, this.bounds.h / 2, t, this.bounds.h, { ...options }),
		]);
	}

	initStack() {
		this.stack = Matter.Composites.pyramid(0, this.bounds.h / 2, 10, 2, 0, 0, (x, y) => {
			const body = Matter.Bodies.rectangle(x, y, 50, 50);
			body.render.fillStyle = 'white';
			body.render.lineWidth = 1;
			body.render.strokeStyle = 'black';
			return body;
		});
		Matter.Composite.add(this.world, this.stack);
	}

	initLetters() {
		this.options.letters.forEach((l) => {
			const paths = l.el.getElementsByTagName('g')[0];
			paths.childNodes.forEach((path, i) => {
				const body = Matter.Bodies.fromVertices(this.bounds.w / 2, 80, Matter.Svg.pathToVertices(path, 4), {
					label: 'letter',
					render: {
						fillStyle: 'white',
						strokeStyle: 'black',
						lineWidth: 1,
					},
				});
				if (body?.position) {
					Matter.Body.scale(body, 2, 2);
					setTimeout(() => {
						Matter.Composite.add(this.world, body);
					}, i * 1000);
				} else {
					return null;
				}
			});
		});
	}

	addEvents() {
		Matter.Events.on(this.engine, 'afterUpdate', () => {
			const time = this.engine.timing.timestamp;
			const scale = 1 + Math.sin(time * 0.001) * 0.005;
			this.letters.forEach((letter) => {
				// Matter.Composite.translate(letter, {
				// 	x: Math.sin(time * 0.001) * 0.8,
				// 	y: 0,
				// });
				// Matter.Composite.scale(letter, scale, scale, {
				// 	x: 100,
				// 	y: 100,
				// });
			});
		});
	}

	normalizeBounds() {
		const bounds = this.render.bounds;
		return {
			x: bounds.min.x,
			y: bounds.min.y,
			w: bounds.max.x,
			h: bounds.max.y,
		};
	}
}
