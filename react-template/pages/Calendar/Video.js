import React, { Component } from "react";
import { PrismCode } from "react-prism";
import {
  Player,
  ControlBar,
  PlayToggle, // PlayToggle 播放/暂停按钮 若需禁止加 disabled
  ReplayControl, // 后退按钮
  ForwardControl, // 前进按钮
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton, // 倍速播放选项
  VolumeMenuButton,
  BigPlayButton,
} from "video-react";
import { Button } from "antd";
import "../../node_modules/video-react/dist/video-react.css";
import videoImg from "../../assets/video.png";
import axios from "axios";

import request from "@/utils/request";

const sources = {
  sintelTrailer: "http://media.w3.org/2010/05/sintel/trailer.mp4",
  bunnyTrailer: "http://media.w3.org/2010/05/bunny/trailer.mp4",
  bunnyMovie: "http://media.w3.org/2010/05/bunny/movie.mp4",
  test: "http://media.w3.org/2010/05/video/movie_300.webm",
  defaultMovie:
    "https://b2bfileserviceqa01.blob.core.chinacloudapi.cn/cmp-public/20224/27f3f16054aa442ba4e8beaef3af41b1.mp4",
};

export default class PlayerControlExample extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      source: sources.defaultMovie,
    };

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.load = this.load.bind(this);
    this.changeCurrentTime = this.changeCurrentTime.bind(this);
    this.seek = this.seek.bind(this);
    this.changePlaybackRateRate = this.changePlaybackRateRate.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.setMuted = this.setMuted.bind(this);
  }

  axiosRequest({ url, method = "get" }) {
    axios.interceptors.request.use((config) => {
      //在utils/request里面配置了请求头
      return config;
    });
    axios.interceptors.response.use(
      (response) => {
        //处理data
        // response=response.data;
        return response.data;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    return new Promise((resolve, reject) => {
      axios({
        url,
        method,
        mode: "cors",
        headers: {
          "content-type": "video/mpeg4",
          Accept: "video/mpeg4",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Origin": "*",
          "Accept-Ranges": "bytes",
          type: "blob",
        },
        timeOut: 10000, //配置超时10s
        responseType: "arraybuffer",
        // responseType: "stream",
      })
        .then((res) => {
          resolve(res);
          console.log(res, "ggggss");
        })
        .catch((err) => {
          console.log(err, "kkkk");
          reject(err.data);
        });
    });
  }

  componentDidMount() {
    // subscribe state change
    this.player.subscribeToStateChange(this.handleStateChange.bind(this));
    this.fetchBlobUrl();
  }

  fetchBlobUrl() {
    return this.axiosRequest({
      url:
        "https://b2bfileserviceqa01.blob.core.chinacloudapi.cn/cmp-public/20224/27f3f16054aa442ba4e8beaef3af41b1.mp4",
      method: "get",
    });
  }

  fetchBlobUrl1() {
    const xhr = new XMLHttpRequest();
    const play_url =
      "https://b2bfileserviceqa01.blob.core.chinacloudapi.cn/cmp-public/20224/27f3f16054aa442ba4e8beaef3af41b1.mp4";
    xhr.open("GET", play_url, true);
    xhr.responseType = "blob";
    xhr.onload = function() {
      if (this.status == 200) {
        var blob = this.response;
        video.onload = function(e) {
          window.URL.revokeObjectURL(video.src);
        };
        console.log(window.URL.createObjectURL(blob), "gggg");
        this.setState({
          source: window.URL.createObjectURL(blob),
        });
      }
    };
    xhr.send();
  }

  setMuted(muted) {
    return () => {
      this.player.muted = muted;
    };
  }

  handleStateChange(state) {
    // copy player state to this component's state
    this.setState({
      player: state,
    });
  }

  play() {
    this.player.play();
  }

  pause() {
    this.player.pause();
  }

  load() {
    this.player.load();
  }
  jump() {
    this.player.forward(20);
  }

  changeCurrentTime(seconds) {
    return () => {
      const { player } = this.player.getState();
      this.player.seek(player.currentTime + seconds);
    };
  }

  seek(seconds) {
    return () => {
      this.player.seek(seconds);
    };
  }

  changePlaybackRateRate(steps) {
    return () => {
      const { player } = this.player.getState();
      this.player.playbackRate = player.playbackRate + steps;
    };
  }

  changeVolume(steps) {
    return () => {
      const { player } = this.player.getState();
      this.player.volume = player.volume + steps;
    };
  }

  changeSource(name) {
    return () => {
      this.setState({
        source: sources[name],
      });
      this.player.load();
    };
  }

  render() {
    return (
      <div>
        <video width="500" height="300" controls>
          <source src={this.state.source} type="video/mp4" />
        </video>
        <Player
          ref={(player) => {
            this.player = player;
          }}
          autoPlay
          playsInline="true"
          preload={"auto"}
          fluid={false}
          width={500}
          height={300}
          poster={videoImg}
        >
          <source src={this.state.source} />
          <ControlBar autoHide={false} />
        </Player>
        <div className="py-3">
          <Button onClick={this.play} className="mr-3">
            play()
          </Button>
          <Button onClick={this.pause} className="mr-3">
            pause()
          </Button>
          <Button onClick={this.load} className="mr-3">
            load()
          </Button>
        </div>
        <div className="pb-3">
          <Button onClick={this.changeCurrentTime(10)} className="mr-3">
            currentTime += 10
          </Button>
          <Button onClick={this.changeCurrentTime(-10)} className="mr-3">
            currentTime -= 10
          </Button>
          <Button onClick={this.seek(50)} className="mr-3">
            currentTime = 50
          </Button>
        </div>
        <div className="pb-3">
          <Button onClick={this.changePlaybackRateRate(1)} className="mr-3">
            playbackRate++
          </Button>
          <Button onClick={this.changePlaybackRateRate(-1)} className="mr-3">
            playbackRate--
          </Button>
          <Button onClick={this.changePlaybackRateRate(0.1)} className="mr-3">
            playbackRate+=0.1
          </Button>
          <Button onClick={this.changePlaybackRateRate(-0.1)} className="mr-3">
            playbackRate-=0.1
          </Button>
        </div>
        <div className="pb-3">
          <Button onClick={this.changeVolume(0.1)} className="mr-3">
            volume+=0.1
          </Button>
          <Button onClick={this.changeVolume(-0.1)} className="mr-3">
            volume-=0.1
          </Button>
          <Button onClick={this.setMuted(true)} className="mr-3">
            muted=true
          </Button>
          <Button onClick={this.setMuted(false)} className="mr-3">
            muted=false
          </Button>
        </div>
        <div className="pb-3">
          <Button onClick={this.changeSource("sintelTrailer")} className="mr-3">
            Sintel teaser
          </Button>
          <Button onClick={this.changeSource("bunnyTrailer")} className="mr-3">
            Bunny trailer
          </Button>
          <Button onClick={this.changeSource("bunnyMovie")} className="mr-3">
            Bunny movie
          </Button>
          <Button onClick={this.changeSource("test")} className="mr-3">
            Test movie
          </Button>
        </div>
      </div>
    );

    // return (
    //   <div>
    //     <Player
    //       ref={(player) => {
    //         this.player = player;
    //       }}
    //       autoPlay
    //       playsInline="true"
    //       preload={"auto"}
    //       fluid={false}
    //       width={500}
    //       height={300}
    //       poster={videoImg}
    //     >
    //       <BigPlayButton position="center" />
    //       <source src={this.state.source} />
    //       <ControlBar autoHide={false} disableDefaultControls={false}>
    //         <ReplayControl seconds={10} order={1.1} />
    //         <ForwardControl seconds={30} order={1.2} />
    //         <PlayToggle />
    //         <CurrentTimeDisplay order={4.1} />
    //         <TimeDivider order={4.2} />
    //         <PlaybackRateMenuButton rates={[5, 2, 1.5, 1, 0.5]} order={7.1} />
    //         {/*倍率*/}
    //         <VolumeMenuButton />
    //         {/*声音改变方向*/}
    //       </ControlBar>
    //     </Player>
    //   </div>
    // );
  }
}
