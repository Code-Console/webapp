import * as THREE from "three";
import { ICanvasTouchState, TouchType } from "../../../interfaces";

export class CanvasTouch {
  initDistance = 0;
  renderer;
  isPointerDown = false;
  mouse = new THREE.Vector2();
  mouseMultiTouch = new THREE.Vector2();
  onTouchEvent: (e: any, canvasTouchState: ICanvasTouchState) => void;
  eventDown = (e: any) => {
    this.touchEvent(e, TouchType.touchDown);
  };
  eventMove = (e: any) => {
    this.touchEvent(e, TouchType.touchMove);
  };
  eventUp = (e: any) => {
    this.touchEvent(e, TouchType.touchUp);
  };
  eventWheel = (event: any) => {
    this.onTouchEvent(event, {
      type: TouchType.wheel,
      isPointerDown: true,
    });
  };

  touchEvent = (e: any, type: TouchType) => {
    if (type === TouchType.touchDown) {
      this.isPointerDown = true;
    }
    if (type === TouchType.touchUp) {
      this.isPointerDown = false;
    }
    if (e?.touches?.length > 0) {
      this.mouse.x = (e.touches[0].pageX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.touches[0].pageY / window.innerHeight) * 2 + 1;
      if (e.touches.length === 2) {
        this.mouseMultiTouch.x =
          (e.touches[1].pageX / window.innerWidth) * 2 - 1;
        this.mouseMultiTouch.y =
          -(e.touches[1].pageY / window.innerHeight) * 2 + 1;
        if (type === TouchType.touchDown) {
          this.initDistance = this.mouseMultiTouch.distanceTo(this.mouse);
          this.onTouchEvent(e, {
            type: TouchType.pinchStart,
            scale: 1,
            isPointerDown: true,
          });
        } else {
          const currentDistance = this.mouseMultiTouch.distanceTo(this.mouse);
          this.onTouchEvent(e, {
            type: TouchType.pinchMove,
            scale: currentDistance / this.initDistance,
            isPointerDown: true,
          });
        }
        return;
      }
    } else {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    }

    this.onTouchEvent(e, {
      type: type,
      isPointerDown: this.isPointerDown,
    });
  };
  restoreContext = (renderer: any) => {
    const canvas = renderer?.domElement;
    canvas?.addEventListener(
      "webglcontextlost",
      function (event: any) {
        event?.preventDefault();
        const timeout = setTimeout(function () {
          clearTimeout(timeout);
          try {
            renderer?.forceContextRestore();
          } catch (error) {
            console.error("webglError~~", error);
          }
        }, 1);
      },
      false
    );
  };
  addEventListeners = (domElement?: HTMLCanvasElement) => {
    if (!domElement) return;
    domElement?.addEventListener("pointerdown", this.eventDown.bind(this));
    domElement?.addEventListener("touchstart", this.eventDown.bind(this));
    domElement?.addEventListener("pointermove", this.eventMove.bind(this));
    domElement?.addEventListener("touchmove", this.eventMove.bind(this));
    domElement?.addEventListener("pointerup", this.eventUp.bind(this));
    domElement?.addEventListener("touchend", this.eventUp.bind(this));
    domElement?.addEventListener("wheel", this.eventWheel.bind(this));
  };
  removeEventListeners = (domElement?: HTMLCanvasElement) => {
    if (!domElement) return;
    domElement?.removeEventListener("touchstart", this.eventDown);
    domElement?.removeEventListener("touchmove", this.eventMove);
    domElement?.removeEventListener("touchend", this.eventUp);
    domElement?.removeEventListener("mousedown", this.eventDown);
    domElement?.removeEventListener("mousemove", this.eventMove);
    domElement?.removeEventListener("mouseup", this.eventUp);
    domElement?.removeEventListener("wheel", this.eventWheel);
  };
  constructor({
    renderer,
    onTouchEvent,
  }: {
    renderer?: any;
    onTouchEvent: (e: any, canvasTouchState: ICanvasTouchState) => void;
  }) {
    this.renderer = renderer;
    this.onTouchEvent = onTouchEvent;
  }
}
