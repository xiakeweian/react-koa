import React, { useEffect } from "react";
import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import earth from "../../../assets/earth.png";
import city from "../../../assets/city.png";
import earth1 from "../../../assets/earth1.png";
import genetic from "../../../assets/genetic.png";
import human from "../../../assets/human.png";
import star from "../../../assets/star.png";

const House = () => {
  useEffect(() => {
    threeInit();
  }, []);

  const threeInit = () => {
    const container = document.getElementById("webgl-output");
    const statsOutput = document.getElementById("stats-output");
    var scene, camera, webGlRenderer;
    var stats = initStats();

    //创建场景
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    //创建摄像机
    camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 10, 20);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    //创建渲染器
    webGlRenderer = new THREE.WebGLRenderer();
    // webGlRenderer.setClearColor("orange");
    webGlRenderer.setPixelRatio(window.devicePixelRatio);
    webGlRenderer.setSize(window.innerWidth, window.innerHeight);
    webGlRenderer.shadowMap.enabled = true;
    container.appendChild(webGlRenderer.domElement);
    //创建几何体，材质
    const geom = new THREE.BoxGeometry(5, 5, 5, 3, 3, 3);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
      //   map: new THREE.TextureLoader().load(earth),
    });
    const cube = new THREE.Mesh(geom, material);
    scene.add(cube);
    const sphereGeom = new THREE.SphereGeometry(2, 16, 16);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      wireframe: true,
    });
    const sphere = new THREE.Mesh(sphereGeom, sphereMaterial);
    sphere.position.x = -5;
    scene.add(sphere);

    const tetrGeometry = new THREE.OctahedronGeometry(2.5, 0);
    const tetrMaterial = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      wireframe: true,
    });
    const tetrMesh = new THREE.Mesh(tetrGeometry, tetrMaterial);
    tetrMesh.position.x = 5;
    // tetrMesh.rotateX = 200;
    scene.add(tetrMesh);

    //添加轨道控制器
    var controls = new OrbitControls(camera, webGlRenderer.domElement);
    controls.target.set(0, 0, 0);
    controls.enableDamping = true;
    controls.autoRotate = true;
    window.addEventListener("resize", onWindowResize, false);

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      webGlRenderer.setSize(window.innerWidth, window.innerHeight);
    }
    render();
    function render() {
      requestAnimationFrame(render);
      webGlRenderer.render(scene, camera);
      controls && controls.update();
      stats && stats.update();
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
    <div className="house">
      <div id="webgl-output"></div>
      <div id="stats-output"></div>
    </div>
  );
};
export default House;
