class GltfRenderer {
  constructor(props) {
    this.xhrLink = props.url; //Відправляєш лінку
    this.THREE = THREE;

    this.configuration();
  }

  configuration = () => {
    this.scene = new this.THREE.Scene();
    this.width = this.ref.clientWidth;
    this.height = this.ref.clientHeight;
    this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 9999);
    this.setCamera();
    this.setControls();
    this.loadModel();
  }

  setCamera = () =>
    this.camera.position.x = 1.5;
    this.camera.position.y = 0;
    this.camera.position.z = 0.4;
    this.camera.rotation.y = 0;
  };

  loadModel = () => {
    let loader = new GLTFLoader();
    loader.load(this.xhrLink, (gltf) => {

        this.object = gltf.scene;
        const bbox = new this.THREE.Box3().setFromObject(this.object);

        const center = new this.THREE.Vector3();
        const size = bbox.getSize(new this.THREE.Vector3(1, 1, 1));

        //Rescale the object to normalized space
        const maxAxis = Math.max(size.x, size.y, size.z);
        this.object.scale.multiplyScalar(1.0 / maxAxis);
        bbox.setFromObject(this.object);
        bbox.getCenter(center);
        this.object.position.sub(center);
        this.object.rotation.y = Math.PI;
        bbox.getSize(size);
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
}
