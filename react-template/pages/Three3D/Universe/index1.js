import React, { useEffect } from "react";
import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
import img from "./images/bg.jpg";
import mars1 from "./images/Mars1.png";
import mars2 from "./images/Mars2.png";
import earth from "./images/Earth.png";
import earthNormal from "./images/EarthNormal.png";
import earthSpec from "./images/EarthSpec.png";
import { createMultiMaterialObject } from "three/examples/jsm/utils/SceneUtils";

import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import {
  ClearMaskPass,
  MaskPass,
} from "three/examples/jsm/postprocessing/MaskPass";
import { CopyShader } from "three/examples/jsm/shaders/CopyShader";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { SepiaShader } from "three/examples/jsm/shaders/SepiaShader";
import { ColorifyShader } from "three/examples/jsm/shaders/ColorifyShader";

const Universe = () => {
  useEffect(() => {
    init();
  }, 0);
  const init = () => {
    var stats = initStats();

    //创建场景
    var sceneEarth = new THREE.Scene();
    var sceneMars = new THREE.Scene();
    var sceneBG = new THREE.Scene();

    // create a camera, which defines where we're looking at.
    var camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    var cameraBG = new THREE.OrthographicCamera(
      -window.innerWidth,
      window.innerWidth,
      window.innerHeight,
      -window.innerHeight,
      -10000,
      10000
    );
    cameraBG.position.z = 50;
    // create a render and set the size
    var webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setClearColor(new THREE.Color(0x000, 1.0));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    webGLRenderer.shadowMapEnabled = true;
    var sphere = createEarthMesh(new THREE.SphereGeometry(7, 40, 40));
    sphere.position.x = -10;
    var sphere2 = createMarshMesh(new THREE.SphereGeometry(5, 40, 40));
    sphere2.position.x = 10;
    sceneEarth.add(sphere);
    sceneMars.add(sphere2);

    camera.position.x = -10;
    camera.position.y = 15;
    camera.position.z = 25;

    camera.lookAt(new THREE.Vector3(0, 0, 0));

    var orbitControls = new OrbitControls(camera, webGLRenderer.domElement);
    orbitControls.autoRotate = false;
    var clock = new THREE.Clock();
    var ambi = new THREE.AmbientLight(0x181818);
    var ambi2 = new THREE.AmbientLight(0x181818);
    sceneEarth.add(ambi);
    sceneMars.add(ambi2);

    var spotLight = new THREE.DirectionalLight(0xffffff);
    spotLight.position.set(550, 100, 550);
    spotLight.intensity = 0.6;

    var spotLight2 = new THREE.DirectionalLight(0xffffff);
    // spotLight2.position.set(550, 100, 550);
    // spotLight2.intensity = 0.6;

    sceneEarth.add(spotLight);
    sceneMars.add(spotLight2);

    var materialColor = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(img),
      depthTest: false, //深度测试即不设置成false就拥有类似透视的效果
    });
    var bgPlane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), materialColor);
    bgPlane.position.z = -10;
    bgPlane.scale.set(window.innerWidth * 2, window.innerHeight * 2, 1);
    sceneBG.add(bgPlane);

    // add the output of the renderer to the html element
    document
      .getElementById("WebGL-output")
      .appendChild(webGLRenderer.domElement);
    var bgPass = new RenderPass(sceneBG, cameraBG);

    var renderPass = new RenderPass(sceneEarth, camera);
    renderPass.clear = false;
    var renderPass2 = new RenderPass(sceneMars, camera);
    renderPass2.clear = false;

    var effectCopy = new ShaderPass(CopyShader);
    effectCopy.renderToScreen = true;
    var clearMask = new ClearMaskPass();
    var earthMask = new MaskPass(sceneEarth, camera);
    //        earthMask.inverse = true;
    // mars mask
    var marsMask = new MaskPass(sceneMars, camera);
    var effectSepia = new ShaderPass(SepiaShader);
    effectSepia.uniforms["amount"].value = 0.8;
    var effectColorify = new ShaderPass(ColorifyShader);
    effectColorify.uniforms["color"].value.setRGB(0.5, 0.5, 1);

    var composer = new EffectComposer(webGLRenderer);
    composer.renderTarget1.stencilBuffer = true;
    composer.renderTarget2.stencilBuffer = true;

    composer.addPass(bgPass);
    composer.addPass(renderPass);
    composer.addPass(renderPass2);
    composer.addPass(marsMask); //添加掩码，后续通道只会影响掩码区域，取消掩码需要加入THREE.ClearMaskPass通道
    composer.addPass(effectColorify);
    composer.addPass(clearMask);
    composer.addPass(earthMask);
    composer.addPass(effectSepia);
    composer.addPass(clearMask);
    composer.addPass(effectCopy);

    render();
    //创建火星
    function createMarshMesh(geom) {
      var planetTexture = new THREE.TextureLoader().load(mars1);
      var normalTexture = new THREE.TextureLoader().load(mars2);

      var planetMaterial = new THREE.MeshPhongMaterial();
      planetMaterial.normalMap = normalTexture;
      planetMaterial.map = planetTexture;
      //               planetMaterial.shininess = 150;

      // create a multimaterial
      var mesh = createMultiMaterialObject(geom, [planetMaterial]);

      return mesh;
    }
    //创建地球
    function createEarthMesh(geom) {
      var planetTexture = new THREE.TextureLoader().load(earth);
      var specularTexture = new THREE.TextureLoader().load(earthSpec);
      var normalTexture = new THREE.TextureLoader().load(earthNormal);

      var planetMaterial = new THREE.MeshPhongMaterial();
      planetMaterial.specularMap = specularTexture;
      planetMaterial.specular = new THREE.Color(0x4444aa);

      planetMaterial.normalMap = normalTexture;
      planetMaterial.map = planetTexture;
      //   planetMaterial.shininess = 150;

      // create a multimaterial
      var mesh = createMultiMaterialObject(geom, [planetMaterial]);

      return mesh;
    }

    function render() {
      webGLRenderer.autoClear = false;

      stats.update();

      //sphere.rotation.y=step+=0.01;
      var delta = clock.getDelta();
      orbitControls.update(delta);

      sphere.rotation.y += 0.002;
      sphere2.rotation.y += 0.002;

      // render using requestAnimationFrame
      requestAnimationFrame(render);
      //   webGLRenderer.render(scene, camera);
      composer.render(delta);
    }
    function initStats() {
      var stats = new Stats();
      stats.setMode(0); // 0: fps, 1: ms

      // Align top-left
      stats.domElement.style.position = "absolute";
      stats.domElement.style.left = "0px";
      stats.domElement.style.top = "0px";

      document.getElementById("Stats-output").appendChild(stats.domElement);

      return stats;
    }
  };
  return (
    <div>
      <div id="WebGL-output"></div>
      <div id="Stats-output"></div>
    </div>
  );
};
export default Universe;
