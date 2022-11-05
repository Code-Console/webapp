import * as THREE from "three";
import { Font } from "three/examples/jsm/loaders/FontLoader";
import { cleanUpThree } from "../cleanUpThree";
import { CreateParticles } from "./CreateParticles";

export class Environment {
  font: Font;
  particle: THREE.Mesh;
  container: HTMLDivElement | null;
  scene: THREE.Scene | undefined;
  createParticles: CreateParticles | undefined;
  camera: THREE.PerspectiveCamera | undefined;
  renderer: THREE.Renderer | undefined | any;
  constructor(font: any, particle?: any) {
    this.font = font;
    this.particle = particle;
    this.container = document.querySelector("#magic");
    this.scene = new THREE.Scene();
    this.createCamera();
    this.createRenderer();
    this.setup();
    this.bindEvents();
  }

  bindEvents() {
    window.addEventListener("resize", this.onWindowResize.bind(this));
  }

  setup() {
    if (this.camera && this.renderer && this.scene) {
      this.createParticles = new CreateParticles({
        scene: this.scene,
        font: this.font,
        camera: this.camera,
        renderer: this.renderer,
      });
    }
  }

  render() {
    this.createParticles?.render();
    if (this.renderer && this.camera)
      this.renderer?.render(this.scene, this.camera);
  }

  createCamera() {
    if (!this.container) return;
    this.camera = new THREE.PerspectiveCamera(
      65,
      this.container.clientWidth / this.container.clientHeight,
      1,
      10000
    );
    this.camera.position.set(0, 0, 100);
  }

  createRenderer() {
    if (!this.container) return;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    );

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.container.appendChild(this.renderer.domElement);

    this.renderer.setAnimationLoop(() => {
      this.render();
    });
  }

  onWindowResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    this.camera.aspect =
      this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    );
  }
  cleanUp = () => {
    cleanUpThree({
      scene: this.scene,
      renderer: this.renderer,
      container: this.container,
    });
    this.createParticles?.unbindEvents();
    this.camera = undefined;
  };
}
