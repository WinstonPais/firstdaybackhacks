// helpers
const get = (id) => document.getElementById(id);
const create = (type) => document.createElement(type);
const createArr = (val) => new Array(val).fill(undefined);
const randomInRange = (min, max) => Math.round(min + Math.random() * (max - min));
const randomHPos = (parent) => `${randomInRange(100, parent.clientWidth - 100)}px`;
const randomVPos = (parent) => `${randomInRange(100, parent.clientHeight - 100)}px`;
const transFuncs = ['linear', 'ease', 'ease-in', 'ease-in-out', 'ease-out'];
const randomTimingFunction = () => transFuncs[randomInRange(0, transFuncs.length - 1)];
const randomDuration = () => `${randomInRange(.5, 3)}s`;
const randomSkew = () => `${randomInRange(-20, 20)}deg`;
const randomRotate = () => `${randomInRange(-5, 5)}deg`;
const randomScale = () => `scale(${randomInRange(3, 10) / 10})`;
const randomMarginLeft = (parent) => `${randomInRange(10, parent.clientWidth - 10)}px`;
const randomMarginTop = () => `${randomInRange(10, 200)}px`;

// obtain DOM refs
const sky = get('sky');
const plane = get('plane');

// init plane animation
plane.addEventListener('transitionend', planeAnimation);

// add 10 clouds to DOM and start their animations
addClouds(20).forEach(cloudAnimation);

// start plane animation
planeAnimation();

// animate plane transition
function planeAnimation() {
  requestAnimationFrame(doPlaneTransition);
}

function doPlaneTransition() {
  const { style } = plane;
  style.transitionTimingFunction = randomTimingFunction();
  style.transitionDuration = randomDuration();
  style.transform = `
    translateX(${randomHPos(sky)})
    translateY(${randomVPos(sky)})
    skew(${randomSkew()})
    rotate(${randomRotate()})
  `;
}

// animate a cloud transition
function cloudAnimation(c) {
  requestAnimationFrame(() => {
    doCloudTransition(c);
  });
}

function doCloudTransition({ style }) {
  style.marginLeft = '-100px';
}

// reset cloud transition
function onCloudTransitionend() {
  const { style } = this;

  // make transition instant and move of screen to the right
  style.marginLeft = `${sky.clientWidth + 100}px`;
  style.transitionDuration = '0s';

  setTimeout(() => {
    initCloud(this);
    cloudAnimation(this);
  }, 1000);
}

// initialize cloud with random props
function initCloud({ style }) {
  style.transform = randomScale();
  style.transitionProperty = 'margin-left';
  style.transitionDuration = `${randomInRange(10, 60)}s`;
  style.transitionTimingFunction = randomTimingFunction();
  style.marginTop = randomMarginTop();
}

// create cloud dom element
function createCloud() {
  const c = create('div');

  // set class and initial position
  c.className = 'cloud';
  c.style.marginLeft = randomMarginLeft(sky);

  // initialize random props
  initCloud(c);

  // setup listener and return
  c.addEventListener('transitionend', onCloudTransitionend);
  return c;
}

// add clouds to the DOM
function addClouds(amt) {
  return createArr(amt).map(() => {
    const c = createCloud();
    sky.appendChild(c);
    return c;
  });
}
