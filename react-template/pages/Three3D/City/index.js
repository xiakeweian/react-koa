import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer";
import Stats from "three/examples/jsm/libs/stats.module";
import cityModel from "./models/city.fbx";
import Animations from "@/utils/animations";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";
import { makeCycleTextSprite } from "@/utils/common";
import "./index.less";

const City = () => {
  const [loadingProcess, setLoadingProcess] = useState(0);
  let Scene = null;
  let Renderer = null;
  let LabelRenderer = null;
  let city = null;
  let BillboardLabel = null;
  let cityGroup = new THREE.Group();
  let Stat = null;

  const interactablePoints = [
    { key: "1", value: "摩天大楼", location: { x: -2, y: 5, z: 0 } },
  ];

  useEffect(() => {
    initThree();
    return function() {
      Renderer.forceContextLoss();
      Renderer.dispose();
      Scene.clear();
    //   document && document.documentElement.removeChild(Stats.dom);
    };
  }, []);

  const initThree = () => {
    var container, controls, stats;
    let camera,
      scene,
      renderer,
      labelRenderer,
      light,
      cityMeshes = [],
      interactableMeshes = [];
    init();
    animate();
    function init() {
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.shadowMap.enabled = true;
      Renderer = renderer;
      container = document.getElementById("container");
      container.appendChild(renderer.domElement);
      // 添加2d渲染图层
      labelRenderer = new CSS2DRenderer();
      labelRenderer.setSize(window.innerWidth, window.innerHeight);
      labelRenderer.domElement.style.position = "absolute";
      labelRenderer.domElement.style.top = "0px";
      labelRenderer.domElement.style.pointerEvents = "none";
      LabelRenderer = labelRenderer;
      document.body.appendChild(labelRenderer.domElement);

      // 场景
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x582424);
      scene.fog = new THREE.Fog(0xeeeeee, 0, 100);
      Scene = scene;
      // 透视相机：视场、长宽比、近面、远面
      camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(120, 100, 100);
      camera.lookAt(new THREE.Vector3(0, 0, 0));

      // threejs中采用的是右手坐标系，红线是X轴，绿线是Y轴，蓝线是Z轴
      // const axes = new THREE.AxisHelper(30);
      // scene.add(axes);

      // 半球光源：创建室外效果更加自然的光源
      const cubeGeometry = new THREE.BoxGeometry(0.001, 0.001, 0.001);
      const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      light = new THREE.DirectionalLight(0xb5b1c1, 1);
      light.intensity = 1.2;
      light.position.set(20, 20, 5);
      light.castShadow = true;
      light.target = cube;
      light.shadow.mapSize.width = 512 * 12;
      light.shadow.mapSize.height = 512 * 12;
      light.shadow.camera.top = 130;
      light.shadow.camera.bottom = -80;
      light.shadow.camera.left = -70;
      light.shadow.camera.right = 80;
      scene.add(light);

      // const lightHelper = new THREE.DirectionalLightHelper(light, 1, 'red');
      // scene.add(lightHelper);
      // const lightCameraHelper = new THREE.CameraHelper(light.shadow.camera);
      // scene.add(lightCameraHelper);

      // 环境光
      var ambientLight = new THREE.AmbientLight(0x605a64);
      scene.add(ambientLight);

      // 网格
      var grid = new THREE.GridHelper(50, 100, 0x000000, 0x000000);
      grid.position.set(0, 0, 0);
      grid.material.opacity = 0.2;
      grid.material.transparent = true;
      scene.add(grid);

      // 加载模型
      var loader = new FBXLoader();
      loader.load(
        cityModel,
        (mesh) => {
          console.log(mesh, "mesh");
          mesh.traverse(function(child) {
            // console.log(child, "child");
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              cityMeshes.push(child);
              if (child.material.length > 1) {
                child.material.map((item) => {
                  item.metalness = 0.5;
                  item.specular = item.color;
                  item.shininess = 50;
                  if (/green|pink|cyan|black/i.test(item.name)) {
                    item.emissive = item.color;
                  }
                  if (item.name.includes("DarkGray")) {
                    item.metalness = 1;
                    item.fog = false;
                    item.emissive = new THREE.Color(0x000000);
                  }
                });
              }
            }
          });
          mesh.rotation.y = Math.PI / 2;
          mesh.position.set(40, 0, -50);
          mesh.scale.set(1, 1, 1);
          city = mesh;
          cityGroup.add(mesh);
          // 添加交互点
          interactablePoints.map((item) => {
            let point = makeCycleTextSprite(item.key);
            point.name = item.value;
            point.scale.set(1, 1, 1);
            point.position.set(
              item.location.x,
              item.location.y,
              item.location.z
            );
            cityGroup.add(point);
            interactableMeshes.push(point);
          });
          scene.add(cityGroup);
        },
        (res) => {
          if (Number(((res.loaded / res.total) * 100).toFixed(0)) === 100) {
            Animations.animateCamera(
              camera,
              controls,
              { x: 0, y: 10, z: 20 },
              { x: 0, y: 0, z: 0 },
              4000,
              () => {}
            );
          }
          setLoadingProcess(Math.floor((res.loaded / res.total) * 100));
        },
        (err) => {
          console.log(err);
        }
      );

      controls = new OrbitControls(camera, renderer.domElement);
      controls.target.set(0, 0, 0);
      controls.enableDamping = true;
      window.addEventListener("resize", onWindowResize, false);

      stats = new Stats();
      Stat = stats;
      document.documentElement.appendChild(stats.dom);
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      labelRenderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      labelRenderer.render(scene, camera);
      stats && stats.update();
      TWEEN && TWEEN.update();
      controls && controls.update();
    }

    // 增加点击事件，声明raycaster和mouse变量
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    function handleMouseClick(event) {
      console.log(event);
      // 通过鼠标点击的位置计算出raycaster所需要的点的位置，以屏幕中心为原点，值的范围为-1到1.
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
      raycaster.setFromCamera(mouse, camera);
      // 获取raycaster直线和所有模型相交的数组集合
      var intersects = raycaster.intersectObjects(interactableMeshes);
      if (intersects.length > 0) {
        console.log(intersects[0].object);
        let mesh = intersects[0].object;
        Animations.animateCamera(
          camera,
          controls,
          {
            x: mesh.position.x,
            y: mesh.position.y + 4,
            z: mesh.position.z + 12,
          },
          { x: 0, y: 0, z: 0 },
          1200,
          () => {
            let billboardDiv = document.createElement("div");
            billboardDiv.className = "billboard";
            billboardDiv.textContent = mesh.name;
            billboardDiv.style.marginTop = "1em";
            let billboardLabel = new CSS2DObject(billboardDiv);
            billboardLabel.position.set(0, 0, 0);
            BillboardLabel = billboardLabel;
            mesh.add(billboardLabel);
          }
        );
      } else {
        interactableMeshes.map((item) => {
          item.remove(BillboardLabel);
        });
      }
    }
    function handleMouseEnter(event) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      var intersects = raycaster.intersectObjects(interactableMeshes, true);
      if (intersects.length > 0) {
        let mesh = intersects[0].object;
        mesh.material.color = new THREE.Color(0x03c03c);
      } else {
        interactableMeshes.map((item) => {
          item.material.color = new THREE.Color(0xffffff);
        });
      }
    }
    renderer.domElement.style.touchAction = "none";
    renderer.domElement.addEventListener("click", handleMouseClick, false);
    renderer.domElement.addEventListener(
      "pointermove",
      handleMouseEnter,
      false
    );
  };

  return (
    <div>
      <div id="container"></div>
      {loadingProcess === 100 ? (
        ""
      ) : (
        <div id="loading">
          <div className="box">{loadingProcess} %</div>
        </div>
      )}
    </div>
  );
};
export default City;
