/** @format */

gsap.from('#header-container', {
	duration: 2,
	y: '-100%',
	ease: 'bounce',
	opacity: 0,
	delay: 1,
});

// gsap.from('p', {
// 	duration: 1.5,
// 	x: '-100vw',
//   ease: 'power2.in',
//   delay: 2
// });

gsap.fromTo(
	'.leaflet-container',
	{
		opacity: 0,
		scale: 0,
		rotation: 720,
	},
	{ duration: 1, opacity: 1, scale: 1, rotation: 0 }
);
