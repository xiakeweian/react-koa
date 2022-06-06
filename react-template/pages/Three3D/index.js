import React, { useEeffect, useState } from "react";
import Link from "umi/link";
import city from "../../assets/city.png";
import human from "../../assets/human.png";
import earth from "../../assets/earth.png";
import star from "../../assets/star.png";
import "./index.less";
import Star from "./Star";

const Three3D = () => {
  const arr = [
    {
      title: "数字城市",
      img: city,
      id: 0,
      content: "城市化建设",
      link: "/city",
    },
    {
      title: "Metahuman",
      img: human,
      id: 1,
      content: "元宇宙数字人类",
      link: "/human",
    },
    {
      title: "地球",
      img: earth,
      id: 2,
      content: "人类赖以生存的家园",
      link: "/earth",
    },
    {
      title: "星空",
      img: star,
      id: 3,
      content: "人类探索宇宙的梦想",
      link: "/star",
    },
  ];
  const renderList = (arr) => {
    return arr.map((item) => {
      return (
        <div key={item.id} className="three-3d-item">
          <Link to={item.link}>
            <img src={item.img} />
            <div className="text">
              <h4>{item.title}</h4>
              <p>{item.content}</p>
            </div>
          </Link>
        </div>
      );
    });
  };
  return (
    <div className="three-3d">
      <h3>three List</h3>
      <div className="three-3d-wrap">
        <div className="three-3d-list">{renderList(arr)}</div>
      </div>
    </div>
  );
};
export default Three3D;
