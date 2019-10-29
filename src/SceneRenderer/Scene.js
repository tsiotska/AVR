import React from 'react';
import ReactResizeDetector from 'react-resize-detector';
import * as THREE from 'three';
//import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import GLTFLoader from 'three-gltf-loader'
import OrbitControls from 'three-orbitcontrols';

const side1 = require('../assets/skybox/skybox1.jpg');
const side2 = require('../assets/skybox/skybox2.jpg');
const side3 = require('../assets/skybox/skybox3.jpg');
const side4 = require('../assets/skybox/skybox4.jpg');
const side5 = require('../assets/skybox/skybox5.jpg');
const side6 = require('../assets/skybox/skybox6.jpg');

class ThreeScene extends React.Component {
  constructor(props) {
    super(props);
    this.xhrLink = this.props.link; //Відправляєш лінку
    this.THREE = THREE;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("Updating");
    this.changeModel();
    this.setCamera();
    this.setControls();
    this.loadModel();
  }

  componentDidMount(nextProps, nextState, nextContext) {
    this.scene = new this.THREE.Scene();
    this.width = this.ref.clientWidth;
    this.height = this.ref.clientHeight;

    this.camera = new this.THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 9999);

    this.setCamera();
    //this.createSkybox();
    this.configureLights();
    this.configureRenderer();
    this.setControls();
    this.loadModel();
  };

  setCamera = () => {
    this.camera.position.x = 1.5;
    this.camera.position.y = 0;
    this.camera.position.z = 0.4;
    this.camera.rotation.y = 0;
  };

  configureRenderer = () => {
    this.renderer = new this.THREE.WebGLRenderer({alpha: true});
    this.renderer.physicallyCorrectLights = true;
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
    this.renderer.shadowMap.enabled = true;
    this.renderer.toneMapping = this.THREE.ReinhardToneMapping;
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.ref.appendChild(this.renderer.domElement);
  };

  configureLights = () => {
    let directionalLight1 = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight1.position.y = 600;
    directionalLight1.position.x = 200;
    directionalLight1.position.z = -200;
    this.scene.add(directionalLight1);
    let directionalLight2 = new THREE.DirectionalLight(0xffffff, 45);
    directionalLight2.position.y = 600;
    this.scene.add(directionalLight2);
    let directionalLight3 = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight3.position.y = 600;
    directionalLight1.position.x = -200;
    directionalLight1.position.z = -200;
    this.scene.add(directionalLight3);

    let ambient = new THREE.AmbientLight(0x404040, 100);//Світло з усіх сторін
    this.scene.add(ambient);
  };

  setControls = () => {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.campingFactor = 0.01;
    this.controls.enableZoom = true;
  };

  createSkybox = () => {
    let textureLoader = new this.THREE.CubeTextureLoader();
    this.scene.background = textureLoader.load(
      [side4, side2, side1, side6, side3, side5]
    );
  };

  loadModel = () => {
    console.log(this.props.model);
    let loader = new GLTFLoader();
    loader.load('/api/models/gltf?root=' + this.props.model, (gltf) => {

        this.object = gltf.scene;
        var bbox = new THREE.Box3().setFromObject(this.object);
        var cent = bbox.getCenter(new THREE.Vector3(0, 0, 0));
        var size = bbox.getSize(new THREE.Vector3(1, 1, 1));

        //Rescale the object to normalized space
        var maxAxis = Math.max(size.x, size.y, size.z);
        this.object.scale.multiplyScalar(1.0 / maxAxis);
        bbox.setFromObject(this.object);
        bbox.getCenter(cent);
        bbox.getSize(size);
        //Reposition to 0,halfY,0
        this.object.position.copy(cent).multiplyScalar(-1);
        this.object.position.y -= (size.y * 0.5);
        this.scene.add(this.object);


        if (gltf.animations) {
          this.mixer = new this.THREE.AnimationMixer(this.object);
          gltf.animations.forEach((clip) => {
            this.mixer.clipAction(clip).play();
          });
        }

        this.start();
      }, (xhr) => console.log((xhr.loaded / xhr.total * 100) + '% loaded'),
      (err) => {
        console.error(err);
      }
    );
  };

  changeModel = () => {
    this.scene.remove(this.object);
  };

  destroy = () => {
    this.stop();
    this.ref.removeChild(this.renderer.domElement)
  };

  start = () => {
    if (!this.frameId) {
      //this.mixer.update(10)
      this.frameId = requestAnimationFrame(this.animate)
    }
  };

  stop = () => {
    cancelAnimationFrame(this.frameId)
  };

  animate = () => { //Розкоментуй щоб крутилось або навпаки
    //this.object.rotation.x += 0.01;
     this.object.rotation.y -= 0.005;
    //this.mixer.update(100) Анімация єслі
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate)
  };

  renderScene = () => {
    this.renderer.render(this.scene, this.camera)
  };

  onWindowResize = () => {
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  };

  render() {
    return (
      <div style={elementStyle} ref={(mount) => {
        this.ref = mount
      }}>
        <ReactResizeDetector handleWidth handleHeight onResize={this.onWindowResize}/>
      </div>
    )
  }
}

const elementStyle = {
  width: '70vw',
  height: '80vh'
};

export default ThreeScene
