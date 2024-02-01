function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });
  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

}
loco();
gsap.to('.loader-1', {
  top: '-100%',
  delay: 0.5,
  duration: 0.5,
})
function pageAmi() {
  let tl = gsap.timeline();
  tl.to('.loader .yellow1', {
    top: '-100%',
    delay: 0.7,
    duration: 0.5,
    ease: "expo.out",

  })
  tl.from('.loader .yellow2', {
    top: '100%',
    delay: 0.7,
    duration: 0.5,
    ease: "expo.out"
  }, "anim")
  tl.to(".loader h1", {
    color: 'black',
    delay: 0.7,
    duration: 0.5,
  }, "anim")
  tl.to(".loader", {
    display: 'none',
  })
};
pageAmi();


let elems = document.querySelectorAll('.elem');
elems.forEach((e) => {
  e.addEventListener('mouseenter',(i) => {
    let img = e.getAttribute('data-img');
    document.querySelector('.page-2').style.backgroundImage = `url(${img})`;
  })
  
})
