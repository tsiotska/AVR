import React from 'react';
import * as THREE from "three";
import {Clock} from "three";
import {EffectComposer, EffectPass, GodRaysEffect, RenderPass, ToneMappingEffect, BloomEffect} from "postprocessing";
import ReactResizeDetector from "react-resize-detector";
import OrbitControls from 'three-orbitcontrols';
import {Reflector} from '../ThreeLibs/Reflector.js';

const background = require('../assets/front.jpg');

class Background extends React.Component {
  constructor(props) {
    super(props);
    this.THREE = THREE;
  }

  componentDidMount = () => {
    this.width = window.innerWidth; //this.mount.clientWidth якщо хочєш щоб залежало від css висоти/ширини
    this.height = window.innerHeight; //this.mount.clientHeight
    this.scene = new THREE.Scene();
    let textureLoader = new this.THREE.TextureLoader();
    this.scene.background = textureLoader.load(background);
    this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
    this.camera.position.z = 35;

    this.configureRenderer();
    this.initializeComposer();
    this.createLights();
    // this.createMirror();
    //this.createPlane();

    this.createSpheres(6, 'FirstSet', 25, 20, -10, -20);
    this.createSpheres(8, 'SecondSet', 25, 20, 20, -10);
    this.createSpheres(7, 'ThirdSet', 0, -25, 0, -20);
    this.createSpheres(6, 'FourthSet', -10, -30, 20, 0);
    this.enableControls();

  };

  configureRenderer = () => {
    this.renderer = new this.THREE.WebGLRenderer();
    this.renderer.physicallyCorrectLights = true;
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
    this.renderer.shadowMap.enabled = true;
    this.renderer.toneMapping = this.THREE.ReinhardToneMapping;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.mount.appendChild(this.renderer.domElement);
  };


  initializeComposer = () => {
    this.composer = new EffectComposer(this.renderer);
    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);
  };

  start = (count, id, x1, x2, y1, y2) => {
    if (id === 'FourthSet') {
      const tone = new ToneMappingEffect();
      const toneEffect = new EffectPass(this.camera, tone);
      this.composer.addPass(toneEffect);
      toneEffect.renderToScreen = true;
    }
    if (!this['frameId' + id]) {
      this.clock = new Clock();
      this.frames = 120; //КАДРИ
      this.cameraDestination = 0;
      this.cameraDirection = true; //forward
      let x = [];
      let y = [];
      let z = [];
      let speedX = [];
      let speedY = [];
      let speedZ = [];
      for (let i = 0; i < count; i++) {
        this['sphere' + id][i].position.x = Math.round(Math.random() * (x1 - x2) + x2);
        this['sphere' + id][i].position.y = Math.round(Math.random() * (y1 - y2) + y2);
        this['sphere' + id][i].position.z = Math.round(Math.random() * (30 - -5) + -5);
        x[i] = Math.round(Math.random() * (x1 - x2) + x2);
        y[i] = Math.round(Math.random() * (y1 - y2) + y2);
        z[i] = Math.round(Math.random() * (15 - 5) + 5);
        speedX[i] = (x[i] - this['sphere' + id][i].position.x) / this.frames;
        speedY[i] = (y[i] - this['sphere' + id][i].position.y) / this.frames;
        speedZ[i] = (z[i] - this['sphere' + id][i].position.z) / this.frames;
      }
      this['frameId' + id] = requestAnimationFrame(() => {
        const turnEndlessAnimationOn = this.animate(count, id, x, y, z, speedX, speedY, speedZ, x1, x2, y1, y2)
      });
    }
  };

  enableControls = () => {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.campingFactor = 0.25;
    this.controls.enableZoom = true;
  };

  stop = (id) => {
    cancelAnimationFrame(this['frameId' + id])
  };

  animate = (count, id, x, y, z, speedX, speedY, speedZ, x1, x2, y1, y2) => {
    for (let i = 0; i < count; i++) {
      this['sphere' + id][i].rotation.x += 0.03;
      this['sphere' + id][i].rotation.y += 0.03;
      /*  if (Math.round(this.camera.position.z) !== this.cameraDestination) {
          if(this.cameraDirection){
          //  this.camera.position.z -= 0.04;
          //  this.camera.rotation.x +=0.001;
          } else if (!this.cameraDirection){
         //   this.camera.position.z += 0.04;
          //  this.camera.rotation.x -=0.001;
          }
        } else{
          this.cameraDestination = Math.ceil(35 - this.camera.position.z);
          this.cameraDirection = !this.cameraDirection;
        }*/

      if (Math.round(this['sphere' + id][i].position.x) === x[i] || Math.round(this['sphere' + id][i].position.y) === y[i]) {
        x[i] = Math.round(Math.random() * (x1 - x2) + x2);
        y[i] = Math.round(Math.random() * (y1 - y2) + y2);
        z[i] = Math.round(Math.random() * (30 - -5) + -5);
        speedX[i] = (x[i] - this['sphere' + id][i].position.x) / this.frames;
        speedY[i] = (y[i] - this['sphere' + id][i].position.y) / this.frames;
        speedZ[i] = (z[i] - this['sphere' + id][i].position.z) / this.frames;
      } else if (this['sphere' + id][i].position.x !== x && this['sphere' + id][i].position.y !== y[i]) {
        this['sphere' + id][i].position.x += speedX[i];
        this['sphere' + id][i].position.y += speedY[i];
        this['sphere' + id][i].position.z += speedZ[i];

        if (i !== count - 1) {
          this['line' + id][i].geometry.dispose();
          let start = new THREE.Vector3(this['sphere' + id][i].position.x, this['sphere' + id][i].position.y, this['sphere' + id][i].position.z);
          let end = new THREE.Vector3(this['sphere' + id][i + 1].position.x, this['sphere' + id][i + 1].position.y, this['sphere' + id][i + 1].position.z);

          this['line' + id][i].geometry.vertices = [start, end];
          this['line' + id][i].geometry.verticesNeedUpdate = true;
        }
      }
    }
    this.renderScene(count, id, x, y, z, speedX, speedY, speedZ, x1, x2, y1, y2);
  };

  renderScene = (count, id, x, y, z, speedX, speedY, speedZ, x1, x2, y1, y2) => {
    requestAnimationFrame(() => {
      this.animate(count, id, x, y, z, speedX, speedY, speedZ, x1, x2, y1, y2)
    });
    this.composer.render(this.clock.getDelta());
  };

  onWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  componentWillUnmount = () => {
    this.stop();
    this.mount.removeChild(this.renderer.domElement)
  };

  createLights = () => {
    let ambient = new this.THREE.AmbientLight(0x404040);
    this.scene.add(ambient);
    let directionalLight = new THREE.DirectionalLight(0xffffff, 5);
    directionalLight.position.set(0, 1, 5).normalize();
    this.scene.add(directionalLight);
  };
  createMirror = () => {
    let planeGeometry = new this.THREE.PlaneGeometry(75, 75, 75);
    this.verticalMirror = new Reflector(planeGeometry, {
      clipBias: 1,
      textureWidth: 1500 * window.devicePixelRatio,
      textureHeight: 1500 * window.devicePixelRatio,
      color: 0x889999
    });
    this.verticalMirror.position.y = 0;
    this.verticalMirror.position.z = -10;
    this.scene.add(this.verticalMirror);
  };

  createSpheres = (count, id, x1, x2, y1, y2) => {

    let material = new THREE.MeshBasicMaterial({color: '#85daff'});
    this['sphere' + id] = [];
    for (let i = 0; i < count; i++) {
      let geometry = new THREE.SphereGeometry(0.1 + Math.random() * (0.1 - -0.03) + -0.03, 15, 15)
      this['sphere' + id][i] = new THREE.Mesh(geometry, material);
      this['sphere' + id][i].position.set(Math.round(Math.random() * (15 - -15) + -15), Math.round(Math.random() * (15 - -15) + -15), 0,);
      this.scene.add(this['sphere' + id][i]);
    }
    this.createLines(count, id, x1, x2, y1, y2);
  };

  createLines = (count, id, x1, x2, y1, y2) => {
    let material = new THREE.LineBasicMaterial();
    let lineGeometry = [];
    this['line' + id] = [];

    for (let i = 0; i < count - 1; i++) {
      lineGeometry[i] = new THREE.Geometry();
      lineGeometry[i].vertices.push(
        new THREE.Vector3(this['sphere' + id][i].position.x, this['sphere' + id][i].position.y, 0),
        new THREE.Vector3(this['sphere' + id][i + 1].position.x, this['sphere' + id][i + 1].position.y, 0),
      );
      this['line' + id][i] = new THREE.Line(lineGeometry[i], material);
      this.scene.add(this['line' + id][i]);
      lineGeometry[i].dispose();
    }
    material.dispose();
    this.configureComposer(count, id, x1, x2, y1, y2);
  };

  configureComposer = (count, id, x1, x2, y1, y2) => {

    let godRaysEffectForSphere;
    let godRaysEffectForLine = [];
    let sphereEffectPass;
    let lineEffectPass;

    let bloom = new BloomEffect({resolutionScale: 240, luminanceThreshold: 0.357, luminanceSmoothing: 0.004});
    let bloomEffect = new EffectPass(this.camera, bloom);
    this.composer.addPass(bloomEffect);


    for (let i = 0; i < count; i++) {

      if (i < count - 1) {
        godRaysEffectForLine[i] = new GodRaysEffect(this.camera, this['line' + id][i]);
        lineEffectPass = new EffectPass(this.camera, godRaysEffectForLine[i]);
        this.composer.addPass(lineEffectPass);
      }
    }
    this.start(count, id, x1, x2, y1, y2);
  };

  render() {
    return (<div ref={(mount) => {
      this.mount = mount
    }}>
      <ReactResizeDetector handleWidth handleHeight onResize={this.onWindowResize}/>
    </div>)
  }
}

const elementStyle = {
  width: '500px',
  height: '500px'
};
export default Background
