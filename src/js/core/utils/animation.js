const setSvgVisible = (item) => {
	const t = gsap.timeline();
	t.to(item, {
		scale: 1,
		opacity: 1,
		ease: Elastic.easeOut.config(1, 0.75),
		duration: 2
	});
	return t;
};

const setSvgWave = (item) => {
	const t = gsap.timeline();
	t.to(item, {
		y: -10,
		yoyo: true,
		repeat: -1,
		ease: Power0.easeNone,
		duration: 1
	});
	return t;
};

export const playFirstScene = (scene) => {
	const bgShadow = scene.querySelector('#scene_1_bgShadow');
	const bg = scene.querySelector('#scene_1_bg');
	const table1 = scene.querySelector('#scene_1_table_1');
	const tableShadow1 = scene.querySelector('#scene_1_tableShadow_1');
	const table2 = scene.querySelector('#scene_1_table_2');
	const tableShadow2 = scene.querySelector('#scene_1_tableShadow_2');
	const table3 = scene.querySelector('#scene_1_table_3');
	const tableShadow3 = scene.querySelector('#scene_1_tableShadow_3');
	const table4 = scene.querySelector('#scene_1_table_4');
	const tableShadow4 = scene.querySelector('#scene_1_tableShadow_4');
	const tableBorder1 = scene.querySelector('#scene_1_tableBorder_1');
	const table5 = scene.querySelector('#scene_1_table_5');
	const tableShadow5 = scene.querySelector('#scene_1_tableShadow_5');
	const tableBorder2 = scene.querySelector('#scene_1_tableBorder_2');

	gsap.set([
		scene,
		bgShadow, 
		bg, 
		table1, 
		tableShadow1, 
		table2, 
		tableShadow2,
		table3, 
		tableShadow3,
		table4,
		tableShadow4,
		tableBorder1,
		table5,
		tableShadow5,
		tableBorder2
	], {
		scale: 0,
		opacity: 0,
		transformOrigin: '50% 50%'
	});

	const master = gsap.timeline({ delay: 0.1 });
	master.add('start');
	master
		.add(setSvgVisible(scene), 'start+=0.3')
		.add(setSvgVisible(bgShadow), 'start+=1.1')
		.add(setSvgVisible(bg), 'start+=1.2')
		.add(setSvgVisible(table1), 'start+=1')
		.add(setSvgVisible(tableShadow1), 'start+=1')
		.add(setSvgVisible(table2), 'start+=1')
		.add(setSvgVisible(tableShadow2), 'start+=1')
		.add(setSvgVisible(table3), 'start+=1')
		.add(setSvgVisible(tableShadow3), 'start+=1')
		.add(setSvgVisible(table4), 'start+=1')
		.add(setSvgVisible(tableShadow4), 'start+=1')
		.add(setSvgVisible(tableBorder1), 'start+=1')
		.add(setSvgVisible(table5), 'start+=1')
		.add(setSvgVisible(tableShadow5), 'start+=1')
		.add(setSvgVisible(tableBorder2), 'start+=1')
		.add(setSvgWave(table1), 'start+=1.1')
		.add(setSvgWave(tableShadow1), 'start+=1.2')
		.add(setSvgWave(table2), 'start+=1.1')
		.add(setSvgWave(tableShadow2), 'start+=1.2')
		.add(setSvgWave(table3), 'start+=1.1')
		.add(setSvgWave(tableShadow3), 'start+=1.2')
		.add(setSvgWave(table4), 'start+=1.1')
		.add(setSvgWave(tableShadow4), 'start+=1.2')
		.add(setSvgWave(tableBorder1), 'start+=1.3')
		.add(setSvgWave(table5), 'start+=1.1')
		.add(setSvgWave(tableShadow5), 'start+=1.2')
		.add(setSvgWave(tableBorder2), 'start+=1.3')
};

export const playPreloaderAnimation = () => {
	const $preloader = document.querySelector('.page-preloader');
	const $preloaderLogo = $preloader.querySelector('img');
	const $hero = document.querySelector('.hero');

	const t = gsap.timeline({
		defaults: {
			duration: 1.8,
			ease: 'power2.inOut'
		},
		delay: 0.5
	})

	if($preloader && $preloaderLogo) {
		t
			.addLabel('start')
			.to($preloaderLogo, { scale: 2, opacity: 1 }, 'start')
			.to($preloader, { yPercent: -100 }, 'start+=1.4')
	}
	
	$hero && t.to($hero, {
		onEnter: () => $hero.classList.add('is-view')
	}, '-=0.5');
};

export class ScrollObserver {
    constructor (element = null, animationIn = null, animationOut = null, options = {}, reverse = false) {
        if(typeof element === 'string') {
            this.element = document.querySelectorAll(element)
        } else {
            this.element = element
        }
        this.animationIn = animationIn
        this.animationOut = animationOut
        this.options = options // 1.0 - (100% element scroll) 0.9 - 90%(100% element scroll)
        this.reverse = reverse

        this.createObserver()
        this.$subscribe()
    }

    createObserver () {

        this.observer = new window.IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if(this.animationIn !== null) {
                        this.animationIn(entry.target)
                        if (this.reverse === false) {
                            this.observer.unobserve(entry.target)
                        }
                    }
                } else {
                    if(this.animationOut !== null) {
                        this.animationOut(entry.target)
                    }
                }
            })
        }, this.options)
        
    }

    $subscribe () {
        if(this.element instanceof NodeList) {
            this.element.forEach(el => {
                this.observer.observe(el)
            })
        } else if(this.element instanceof Array) {
            Array.from(this.element).forEach(el => {
                this.observer.observe(el)
            })
        }
        else {
            this.observer.observe(this.element)
        }
    }

    $unsubscribe () {}
    
};

// * DOC 
// import ScrollObserver from './classes/ScrollObserver.js'
// new ScrollObserver(this.scrollIsViewElements, this.isView, null, options)
