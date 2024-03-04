import { useEffect, useRef, useState } from "react";
// import {
//   FaCaretDown,
//   FaCaretLeft,
//   FaCaretRight,
//   FaCaretUp,
// } from "react-icons/fa";
import { AiFillCaretLeft } from "react-icons/ai";
import { BsMoisture } from "react-icons/bs";
import { CiTempHigh } from "react-icons/ci";
import { PiPlant } from "react-icons/pi";
import { SiAtom } from "react-icons/si";
import "./App.css";
import MarsImage from "./assets/mars image.jpg";
import MarsArm from "./assets/mars rover arm.jpg";
import Rat from "./assets/rat.jpg";
import RemoteBtn from "./assets/remote button.svg";
import VideoFrame from "./assets/video frame.svg";
import Warframe from "./assets/waterbed warframe.svg";

const App = () => {
  // servo states
  const [servo1, setServo1] = useState(90);
  const [servo2, setServo2] = useState(90);
  const [servo3, setServo3] = useState(90);
  const [servo4, setServo4] = useState(90);

  // rover control states
  const [forward, setForward] = useState(false);
  const [backward, setBackward] = useState(false);
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);

  // handle servo control
  const handleServo1 = (event) => {
    setServo1(Number(event.target.value));
  };

  const handleServo2 = (event) => {
    setServo2(Number(event.target.value));
  };

  const handleServo3 = (event) => {
    setServo3(Number(event.target.value));
  };

  const handleServo4 = (event) => {
    setServo4(Number(event.target.value));
  };

  // handle rover control with mouse
  const handleMouseDown = (direction) => {
    switch (direction) {
      case "forward":
        setForward(true);
        break;
      case "backward":
        setBackward(true);
        break;
      case "left":
        setLeft(true);
        break;
      case "right":
        setRight(true);
        break;
      default:
        break;
    }
  };

  const handleMouseUp = (direction) => {
    switch (direction) {
      case "forward":
      case "backward":
      case "left":
      case "right":
        setForward(false);
        setBackward(false);
        setLeft(false);
        setRight(false);
        break;
      default:
        break;
    }
  };

  // handle rover control with arrow keys
  const handleKeyDown = (event) => {
    switch (event.key) {
      case "w":
        setForward(true);
        break;
      case "s":
        setBackward(true);
        break;
      case "a":
        setLeft(true);
        break;
      case "d":
        setRight(true);
        break;
      case "1":
        setServo1((prevValue) => Math.min(prevValue + 1, 180));
        break;
      case "!":
        setServo1((prevValue) => Math.max(prevValue - 1, 0));
        break;
      case "2":
        setServo2((prevValue) => Math.min(prevValue + 1, 180));
        break;
      case "@":
        setServo2((prevValue) => Math.max(prevValue - 1, 0));
        break;
      case "3":
        setServo3((prevValue) => Math.min(prevValue + 1, 180));
        break;
      case "#":
        setServo3((prevValue) => Math.max(prevValue - 1, 0));
        break;
      case "4":
        setServo4((prevValue) => Math.min(prevValue + 1, 180));
        break;
      case "$":
        setServo4((prevValue) => Math.max(prevValue - 1, 0));
        break;
      default:
        break;
    }
  };

  const handleKeyUp = (event) => {
    switch (event.key) {
      case "w":
      case "s":
      case "a":
      case "d":
        setForward(false);
        setBackward(false);
        setLeft(false);
        setRight(false);
        break;
      default:
        break;
    }
  };

  const handleKeyDownRef = useRef(null);
  const handleKeyUpRef = useRef(null);

  useEffect(() => {
    handleKeyDownRef.current = handleKeyDown;
    handleKeyUpRef.current = handleKeyUp;

    window.addEventListener("keydown", handleKeyDownRef.current);
    window.addEventListener("keyup", handleKeyUpRef.current);

    return () => {
      window.removeEventListener("keydown", handleKeyDownRef.current);
      window.removeEventListener("keyup", handleKeyUpRef.current);
    };
  }, []);

  // const sendServoControl = (angle) => {
  //   // Replace 'YOUR_ESP32_IP' with the actual IP address of your ESP32
  //   const apiUrl = `http://192.168.1.20/setServo`;

  //   fetch(apiUrl, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "text/plain",
  //     },
  //     body: angle.toString(),
  //   })
  //     .then((response) => response.text())
  //     .then((data) => console.log(data))
  //     .catch((error) => console.error("Error:", error));
  // };

  return (
    <div
      className="relative h-screen w-screen"
      style={{
        background:
          "radial-gradient(circle, rgba(28,45,85,1) 0%, rgba(21,27,38,1) 100%)",
      }}
    >
      <main
        className="fixed left-0 top-0 grid h-full w-full select-none grid-cols-7 grid-rows-4 gap-5 p-5 text-slate-200"
        style={{
          backgroundImage: `url('${Warframe}')`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom",
          backgroundSize: "contain",
        }}
      >
        <div className="item6 col-span-2 flex items-center justify-between gap-5 overflow-hidden rounded-xl border border-[#a6aab5] bg-[#13162780] p-3">
          <div className="aspect-square h-full w-full overflow-hidden rounded-lg">
            <img src={Rat} alt="rat detected" className="h-full" />
          </div>
          <div className="flex w-full items-center justify-center text-xl font-semibold tracking-widest text-sky-600 hover:scale-105">
            Rat Detected...
          </div>
        </div>
        <div className="arm_cam relative col-span-3 row-span-2 flex items-center justify-center overflow-hidden rounded-xl border border-[#a6aab5] bg-[#13162780]">
          <img src={MarsArm} alt="mars image" className="w-full" />
          <div className="absolute left-[50%] top-[51%] z-10 w-[90%] -translate-x-[50%] -translate-y-[50%]">
            <img src={VideoFrame} alt="video frame" className="" />
          </div>
          <div className="absolute left-0 top-0 h-full w-full bg-[#3730a380]"></div>
          <div className="absolute left-[50%] top-[30px] -translate-x-[50%] text-lg tracking-widest text-cyan-300">
            Arm Control Camera
          </div>
        </div>
        <div className="item3 relative z-50 col-span-2 row-span-2 rounded-xl border border-[#a6aab5] bg-[#13162780] p-5">
          <div className="slider_wrapper absolute left-[50%] top-[52%] grid h-[400px] w-[400px] -translate-x-[50%] -translate-y-[50%] -rotate-90 grid-cols-1 grid-rows-4 justify-between text-gray-300">
            <div className="slider_container flex flex-row-reverse items-center">
              <input
                min="0"
                max="180"
                value={servo1}
                onChange={handleServo1}
                type="range"
                name=""
                className="slider"
                id=""
                orient="vertical"
              />
              <div className="text w-[80px] rotate-90 text-center">
                <p>{servo1}&deg;</p>
                <p className="text-sm text-slate-500">Servo 1</p>
              </div>
            </div>
            <div className="slider_container flex flex-row-reverse items-center">
              <input
                min="0"
                max="180"
                value={servo2}
                onChange={handleServo2}
                type="range"
                name=""
                className="slider"
                id=""
                orient="vertical"
              />
              <div className="text w-[80px] rotate-90 text-center">
                <p>{servo2}&deg;</p>
                <p className="text-sm text-slate-500">Servo 2</p>
              </div>
            </div>
            <div className="slider_container flex flex-row-reverse items-center">
              <input
                min="0"
                max="180"
                value={servo3}
                onChange={handleServo3}
                type="range"
                name=""
                className="slider"
                id=""
                orient="vertical"
              />
              <div className="text w-[80px] rotate-90 text-center">
                <p>{servo3}&deg;</p>
                <p className="text-sm text-slate-500">Servo 3</p>
              </div>
            </div>
            <div className="slider_container flex flex-row-reverse items-center">
              <input
                min="0"
                max="180"
                value={servo4}
                onChange={handleServo4}
                type="range"
                name=""
                className="slider"
                id=""
                orient="vertical"
              />
              <div className="text w-[80px] rotate-90 text-center">
                <p>{servo4}&deg;</p>
                <p className="text-sm text-slate-500">Servo 4</p>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="item3 col-span-1 row-span-2 overflow-hidden rounded-xl border border-[#a6aab5] bg-[#13162780] p-5">
          {}
        </div> */}
        <div className="item4 col-span-2 flex items-center justify-center overflow-hidden rounded-xl border border-[#a6aab5] bg-[#13162780] p-5 text-center tracking-widest text-sky-600">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur
          molestiae omnis officiis adipisci, unde cupiditate id, voluptatem
          repudiandae dolore soluta.
        </div>
        <div className="item5 col-span-2 overflow-hidden rounded-xl border border-[#a6aab5] bg-[#13162780] p-5 tracking-widest">
          <h2 className="text-center text-lg font-bold text-slate-500">
            Chemical Data
          </h2>
          <div className="flex h-[90%] w-full flex-col items-center justify-around">
            <div className="item flex items-center gap-3">
              <div className="icon">
                <SiAtom className="text-xl" />
              </div>
              <div className="text w-[100px]">Hydrogen</div>
              <div className="level_container h-[16px] w-[280px] overflow-hidden rounded-full bg-[#2e3349]">
                <div
                  className="level h-full w-[30%] rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(9,250,145,1) 0%, rgba(86,195,226,1) 100%)",
                  }}
                ></div>
              </div>
              <div className="percent">30%</div>
            </div>
            <div className="item flex items-center gap-3">
              <div className="icon">
                <SiAtom className="text-xl" />
              </div>
              <div className="text w-[100px]">Alcohol</div>
              <div className="level_container h-[16px] w-[280px] overflow-hidden rounded-full bg-[#2e3349]">
                <div
                  className="level h-full w-[60%] rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(9,250,145,1) 0%, rgba(86,195,226,1) 100%)",
                  }}
                ></div>
              </div>
              <div className="percent">60%</div>
            </div>
            <div className="item flex items-center gap-3">
              <div className="icon">
                <SiAtom className="text-xl" />
              </div>
              <div className="text w-[100px]">Methane</div>
              <div className="level_container h-[16px] w-[280px] overflow-hidden rounded-full bg-[#2e3349]">
                <div
                  className="level h-full w-[40%] rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(9,250,145,1) 0%, rgba(86,195,226,1) 100%)",
                  }}
                ></div>
              </div>
              <div className="percent">40%</div>
            </div>
          </div>
        </div>
        <div className="body_cam relative col-span-3 row-span-2 flex items-center justify-center overflow-hidden rounded-xl border border-[#a6aab5] bg-[#13162780]">
          <img src={MarsImage} alt="mars image" className="cover h-full" />
          <div className="absolute left-[50%] top-[51%] z-10 w-[90%] -translate-x-[50%] -translate-y-[50%]">
            <img src={VideoFrame} alt="video frame" className="" />
          </div>
          <div className="absolute left-0 top-0 h-full w-full bg-[#b4530950]"></div>
          <div className="absolute left-[50%] top-[30px] -translate-x-[50%] text-lg tracking-widest text-amber-300">
            360&deg; Camera
          </div>
        </div>
        <div className="item8 col-span-2 row-span-2 overflow-hidden rounded-xl border border-[#a6aab5] bg-[#13162780] p-5">
          <h2 className="text-center text-lg font-bold text-slate-500">
            Rover Control
          </h2>
          <div className="flex h-full w-full items-center justify-center">
            <div
              className="joystic_wrapper grid aspect-square h-[90%]  grid-cols-3 grid-rows-3 overflow-hidden rounded-full border border-slate-600"
              style={{
                backgroundImage: `url('${RemoteBtn}')`,
                backgroundRepeat: "no-repeat",
              }}
            >
              <button
                type="button"
                className="order-2 flex rotate-90 items-center justify-center"
                onMouseDown={() => handleMouseDown("forward")}
                onMouseUp={() => handleMouseUp("forward")}
              >
                <AiFillCaretLeft
                  className={`text-[100px] text-gray-300 ${forward && "text-slate-800"}`}
                />
              </button>
              <button
                type="button"
                className="order-8 flex rotate-[270deg] items-center justify-center"
                onMouseDown={() => handleMouseDown("backward")}
                onMouseUp={() => handleMouseUp("backward")}
              >
                <AiFillCaretLeft
                  className={`text-[100px] text-gray-300 ${backward && "text-slate-800"}`}
                />
              </button>
              <button
                type="button"
                className="order-4 flex items-center justify-center"
                onMouseDown={() => handleMouseDown("left")}
                onMouseUp={() => handleMouseUp("left")}
              >
                <AiFillCaretLeft
                  className={`text-[100px] text-gray-300 ${left && "text-slate-800"}`}
                />
              </button>
              <button
                type="button"
                className="order-6 flex rotate-180 items-center justify-center"
                onMouseDown={() => handleMouseDown("right")}
                onMouseUp={() => handleMouseUp("right")}
              >
                <AiFillCaretLeft
                  className={`text-[100px] text-gray-300 ${right && "text-slate-800"}`}
                />
              </button>
              <div className="order-1"></div>
              <div className="order-3"></div>
              <div className="order-5 flex items-center justify-center">
                <p
                  className={`text-md text-center font-semibold uppercase tracking-widest text-red-800`}
                >
                  {forward && "Going Forward"}
                  {backward && "Going Backward"}
                  {left && "Turning Left"}
                  {right && "Turning Right"}
                </p>
              </div>
              <div className="order-7"></div>
              <div className="order-9"></div>
            </div>
          </div>
        </div>
        <div className="item8 col-span-2 overflow-hidden rounded-xl border border-[#a6aab5] bg-[#13162780] p-5">
          <h2 className="text-center text-lg font-bold text-slate-500">
            Environmental Data
          </h2>
          <div className="flex h-[90%] w-full flex-col justify-around">
            <div className="item flex items-center justify-start gap-3">
              <div className="icon">
                <CiTempHigh className="w-[25px] text-2xl" />
              </div>
              <div className="text w-[120px]">Temperature</div>
              <div className="level_container h-[16px] w-[240px] overflow-hidden rounded-full bg-[#2e3349]">
                <div
                  className="level h-full w-[45%] rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(252,176,69,1) 0%, rgba(253,29,29,1) 50%)",
                  }}
                ></div>
              </div>
              <div className="percent">29&deg; C</div>
            </div>
            <div className="item flex items-center justify-start gap-3">
              <div className="icon">
                <BsMoisture className="w-[25px] text-xl" />
              </div>
              <div className="text w-[120px]">Humidity</div>
              <div className="level_container h-[16px] w-[240px] overflow-hidden rounded-full bg-[#2e3349]">
                <div
                  className="level h-full w-[75%] rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)",
                  }}
                ></div>
              </div>
              <div className="percent">75%</div>
            </div>
            <div className="item flex items-center justify-start gap-3">
              <div className="icon">
                <PiPlant className="w-[25px] text-xl" />
              </div>
              <div className="text w-[120px]">Soil Moisture</div>
              <div className="level_container h-[16px] w-[240px] overflow-hidden rounded-full bg-[#2e3349]">
                <div
                  className="level h-full w-[40%] rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(0, 145, 36,1) 0%, rgba(0, 149, 255,1) 100%)",
                  }}
                ></div>
              </div>
              <div className="percent">40%</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
