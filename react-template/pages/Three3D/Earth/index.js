import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { createMultiMaterialObject } from "three/examples/jsm/utils/SceneUtils";
// import * as dat from "dat.gui";
import colorImg from "./images/mars_1k_color.jpg";
import normalImg from "./images/mars_1k_normal.jpg";

const Earth = () => {
  useEffect(() => {
    threeInit();
  }, []);

  const threeInit = () => {
    var scene,
      camera,
      webGLRenderer,
      container,
      statsOutput,
      orbitControls,
      stats;
    init();

    function init() {
      container = document.getElementById("WebGL-output");
      statsOutput = document.getElementById("Stats-output");
      stats = initStats();
      //创建场景
      scene = new THREE.Scene();
      //创建摄像机，摄像机视椎体垂直视野角度45，摄像机视锥体宽高比，近端面，远端面
      camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      //创建渲染器
      webGLRenderer = new THREE.WebGLRenderer();
      webGLRenderer.setClearColor("Navy");
      webGLRenderer.setSize(window.innerWidth, window.innerHeight);
      webGLRenderer.shadowMapEnabled = true;
      //创建几何体和材质
      var sphere = createMesh(new THREE.SphereGeometry(20, 40, 40));
      // add the sphere to the scene
      // 将几何体材质添加到场景中
      scene.add(sphere);
      // position and point the camera to the center of the scene
      //设置照相机的位置
      camera.position.x = -20;
      camera.position.y = 30;
      camera.position.z = 40;
      camera.lookAt(new THREE.Vector3(0, 0, 0));
//添加控制，
      orbitControls = new OrbitControls(camera, webGLRenderer.domElement);
      orbitControls.autoRotate = true;

      //添加光源，这里添加的环境光照料场景中所有物体
      var ambiLight = new THREE.AmbientLight(0x111111);
      //将环境光添加到场景中
      scene.add(ambiLight);
      //添加平行光，并设置平行光的位置，强度，并把平行光添加到场景中
      var spotLight = new THREE.DirectionalLight(0xffffff);
      spotLight.position.set(-20, 30, 40);
      spotLight.intensity = 1.5;
      scene.add(spotLight);

      // add the output of the renderer to the html element
      //将渲染器添加到dom中
      container.appendChild(webGLRenderer.domElement);

      // call the render function
      var step = 0;

      render();
    }
    function createMesh(geom) {
      const loader = new THREE.TextureLoader();
      var planetTexture = loader.load(colorImg);
      var normalTexture = loader.load(normalImg);

      var planetMaterial = new THREE.MeshPhongMaterial({
        map: planetTexture,
        bumpMap: normalTexture,
      });

      var wireFrameMat = new THREE.MeshBasicMaterial();
      wireFrameMat.wireframe = true;

      // create a multimaterial 创建多材质
      var mesh = createMultiMaterialObject(geom, [planetMaterial]);
      return mesh;
    }
    function render() {
      stats.update();//帧频更新
      var clock = new THREE.Clock();
      //sphere.rotation.y=step+=0.01;
      var delta = clock.getDelta();
      orbitControls.update(delta);

      // 动画
      requestAnimationFrame(render);
      //将场景和摄像机添加到渲染器中
      webGLRenderer.render(scene, camera);
    }

    function initStats() {
      var stats = new Stats();
      stats.setMode(0); // 0: fps, 1: ms

      // Align top-left
      stats.domElement.style.position = "absolute";
      stats.domElement.style.left = "0px";
      stats.domElement.style.top = "0px";

      statsOutput.appendChild(stats.domElement);
      return stats;
    }
  };

  return (
    <div>
      <div id="Stats-output"></div>
      <div id="WebGL-output"></div>
    </div>
  );
};
export default Earth;
