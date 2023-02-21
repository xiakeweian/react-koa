import React, { useEffect } from "react";
import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import earth from "../../../assets/earth.png";
import city from "../../../assets/city.png";
import earth1 from "../../../assets/earth1.png";
import genetic from "../../../assets/genetic.png";
import human from "../../../assets/human.png";
import star from "../../../assets/star.png";
import font from "three/examples/fonts/helvetiker_regular.typeface.json";

const House = () => {
  useEffect(() => {
    threeInit();
  }, []);

  const createLine = (scene) => {
    const points = [];
    points.push(new THREE.Vector3(-10, 0, 0));
    points.push(new THREE.Vector3(0, 10, 0));
    points.push(new THREE.Vector3(10, 0, 0));

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: "red" });
    const line = new THREE.Line(geometry, material);
    scene.add(line);
  };
  //创建球体
  const createSphere = (scene) => {
    const sphereGeom = new THREE.SphereGeometry(2, 16, 16);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      wireframe: true,
    });
    const sphere = new THREE.Mesh(sphereGeom, sphereMaterial);
    sphere.position.x = -5;
    scene.add(sphere);
  };
  //创建立方体
  const createcCube = (scene) => {
    const geom = new THREE.BoxGeometry(5, 5, 5, 3, 3, 3);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
      //   map: new THREE.TextureLoader().load(earth),
    });
    const cube = new THREE.Mesh(geom, material);
    scene.add(cube);
  };
  //创建四面体
  const createTetr = (scene) => {
    const tetrGeometry = new THREE.OctahedronGeometry(2.5, 0);
    const tetrMaterial = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      wireframe: true,
    });
    const tetrMesh = new THREE.Mesh(tetrGeometry, tetrMaterial);
    tetrMesh.position.x = 5;
    // tetrMesh.rotateX = 200;
    scene.add(tetrMesh);
  };
  //创建文字
  const createText = (scene) => {
    var loader = new FontLoader();
    var geometry;
    loader.load(
      "../../../assets/helvetiker_regular.typeface.json",
      //加载好字体后创建三维文字
      function(font) {
        geometry = new TextGeometry("Hello three.js!", {
          font: font,
          size: 80,
          height: 5,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 10,
          bevelSize: 8,
          bevelSegments: 5,
        });
        //创建法向量材质
        var meshMaterial = new THREE.MeshNormalMaterial({
          flatShading: THREE.FlatShading,
          transparent: true,
          opacity: 0.9,
        });
        var mesh = new THREE.Mesh(geometry, meshMaterial);
        mesh.position.set(-300, 0, 0);
        scene.add(mesh);
      },
      //加载进度
      function(xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      //出现错误
      function(err) {
        console.log(err);
      }
    );
    // loader.load(
    //   font,
    //   function(font) {
    //     var txtGeo = new THREE.TextGeometry("hello world", {
    //       font: font,
    //       size: 0.8,
    //       height: 0.1,
    //       curveSegments: 12,
    //       bevelEnabled: true,
    //       bevelThickness: 0.1,
    //       bevelSize: 0.05,
    //       bevelSegments: 3,
    //     });
    //     var txtMater = new THREE.MeshNormalMaterial({
    //       flatShading: THREE.FlatShading,
    //       transparent: true,
    //       opacity: 0.9,
    //     });
    //     var txtMesh = new THREE.Mesh(txtGeo, txtMater);
    //     txtMesh.position.set(-2, 2.3, -0.4);
    //     scene.add(txtMesh);
    //   },
    //   //加载进度
    //   function(xhr) {
    //     console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    //   },
    //   //出现错误
    //   function(err) {
    //     console.log(err);
    //   }
    // );
  };

  const threeInit = () => {
    const container = document.getElementById("webgl-output");
    const statsOutput = document.getElementById("stats-output");
    var scene, camera, webGlRenderer;
    var stats = initStats();

    //创建场景
    scene = new THREE.Scene();
    // scene.background = new THREE.Color(0x000000);
    scene.background = new THREE.Color(0xffffff);
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
    // createcCube(scene);
    // createLine(scene);
    // createSphere(scene);
    // createTetr(scene);
    createText(scene);

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
