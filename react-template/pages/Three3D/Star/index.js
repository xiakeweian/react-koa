import React, { useEffect, useState } from "react";
import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";
import * as dat from "dat.gui";

const Star = () => {
  let Scene = null;

  useEffect(() => {
    threeInit();
  }, []);

  const threeInit = () => {
    const stats = initStats();
    // 创建场景
    const scene = new THREE.Scene();
    const container = document.getElementById("star");

    //创建摄像头
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    //创建渲染器和设置尺寸
    const webGLRenderer = new THREE.WebGLRenderer();
    // webGLRenderer.setClearColor(new THREE.Color("yellow", 1.0));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 150;
    container.appendChild(webGLRenderer.domElement);
    createParticles();
    var cloud;
    var controls = new (function() {
      this.size = 2.5;
      this.transparent = true;
      this.opacity = 1;
      this.vertexColors = true;
      this.sizeAttenuation = false;
      this.color = 0xffffff;
      this.rotateSystem = true;
      this.redraw = function() {
        if (scene.getObjectByName("particles")) {
          scene.remove(scene.getObjectByName("particles"));
          createParticles(
            controls.size,
            controls.transparent,
            controls.opacity,
            controls.vertexColors,
            controls.sizeAttenuation,
            controls.color
          );
        }
      };
    })();
    // var gui = new dat.GUI();
    // gui.add(controls, "size", 0, 10).onChange(controls.redraw);
    // gui.add(controls, "transparent").onChange(controls.redraw);
    // gui.add(controls, "opacity", 0, 1).onChange(controls.redraw);
    // gui.add(controls, "vertexColors").onChange(controls.redraw);
    // gui.add(controls, "sizeAttenuation").onChange(controls.redraw);
    // // gui.add(controls, "color").onChange(controls.redraw);
    // gui.add(controls, "rotateSystem");
    // controls.redraw();

    function createParticles(
      size,
      transparent,
      opacity,
      vertexColors,
      sizeAttenuation,
      color
    ) {
      var range = 500;
      const vertices = [];
      for (var i = 0; i < 15000; i++) {
        var particle = new THREE.Vector3(
          Math.random() * range - range / 2,
          Math.random() * range - range / 2,
          Math.random() * range - range / 2
        );
        vertices.push(...particle);
      }
      var geom = new THREE.BufferGeometry();
      geom.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3)
      );
      var material = new THREE.PointsMaterial({
        color: new THREE.Color(Math.random() * i * 0xff00ff),
      });
      console.log(geom, "kkkgfggg");
      //   geom.colors.push(new THREE.Color(Math.random() * i * 0xff00ff));
      cloud = new THREE.Points(geom, material);
      cloud.name = "particles";
      console.log(cloud, "gggss");
      scene.add(cloud);
    }

    render();
    var step = 0;

    function render() {
      // 帧频更新
      stats.update();

      if (controls.rotateSystem) {
        step += 0.003;

        cloud.rotation.x = step;
        cloud.rotation.z = step;
      }

      requestAnimationFrame(render);
      webGLRenderer.render(scene, camera);
    }

    function initStats() {
      var stats = new Stats();
      stats.domElement.style.position = "absolute";
      stats.domElement.style.left = "0px";
      stats.domElement.style.top = "0px";

      document.getElementById("Stats-output").appendChild(stats.domElement);
      return stats;
    }
  };
  return (
    <div>
      <div id="star"></div>
      <div id="Stats-output"></div>
    </div>
  );
};
export default Star;
