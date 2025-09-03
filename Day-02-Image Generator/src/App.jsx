import React, { useEffect, useState } from "react";
import "animate.css";
import { ToastContainer, toast } from 'react-toastify';

const data = [
  {
    label: "Illustration",
    value: "illustration",
    url: "https://api.dicebear.com/9.x/avataaars/svg?seed=",
  },
  {
    label: "Cartoon",
    value: "cartoon",
    url: "https://api.dicebear.com/9.x/adventurer/svg?seed=",
  },
  {
    label: "Sketchy",
    value: "sketchy",
    url: "https://api.dicebear.com/9.x/croodles/svg?seed=",
  },
  {
    label: "Robots",
    value: "robots",
    url: "https://api.dicebear.com/9.x/bottts/svg?seed=",
  },
  {
    label: "Art",
    value: "art",
    url: "https://api.dicebear.com/9.x/pixel-art/svg?seed=",
  },
  {
    label: "Male",
    value: "male",
    url: "https://randomuser.me/api/portraits/men",
  },
  {
    label: "Female",
    value: "female",
    url: "https://randomuser.me/api/portraits/female",
  },
];

function App() {
  const [src, setSrc] = useState(null);
  const [option, setOption] = useState("male");

  const onOptionChange = (e) => {
    const value = e.target.value;
    setOption(value);
  };

  const numGenerater = () => {
    const r = Math.floor(Math.random() * 99)+1 
    return r
  }

  const generate = () => {
    const obj = data.find((item) => item.value === option);
    const url = obj.url;
    if (option === "male" || option === "female") {
      const imgUrl = `${url}/${numGenerater()}.jpg`
      setSrc(imgUrl)
      // console.log(imgUrl)
    } else {
      const uniqueValue = Date.now();
      const imageUrl = `${url}${uniqueValue}`;
      setSrc(imageUrl);
    }
  };

  const download = (url) => {
    const a = document.createElement("a")
    a.href = url
    a.download = `${Date.now()}.jpg`
    a.click()
    a.remove()
  }
  const copy = (url) => {
   navigator.clipboard.writeText(url)
   toast.success('Image URL Copied' , {position : 'top-center'})
  }

  useEffect(() => {
    generate();
  }, [option]);

  return (
    <>
      <div className="animate__animated animate__fadeIn overflow-hidden min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex justify-center items-center ">
        <div className="animate__animated animate__slideInUp w-full max-w-md flex flex-col justify-center items-center gap-4 border border-slate-700 p-10 rounded-2xl shadow-xl backdrop-blur-xl ">
          <img
            src={src || "/public/avt.jpeg"}
            alt="Avatar"
            className="w-32 h-32 rounded-full border border-slate-700 shadow-lg object-cover"
          />
          <div className="text-center text-white">
            <h1 className="text-3xl font-bold tracking-wide">
              Avatar Generator
            </h1>
            <p className="text-slate-300">
              Generator unlimited avatars for your website
            </p>
          </div>

          <div className="w-full space-y-4 text-white">
            <select
              value={option}
              onChange={onOptionChange}
              className="bg-slate-900/60 w-full p-3 rounded-xl"
            >
              {data?.map((item, i) => {
                return (
                  <option key={i} value={item.value}>
                    {item.label}
                  </option>
                );
              })}
            </select>

            <div className="bg-slate-900/60 w-full p-3 rounded-xl">
            {src}
            </div>
          </div>

          <div className="flex w-full gap-2">
            <button onClick={generate} className="flex-1 bg-gradient-to-r from-rose-500 to bg-orange-600 font-medium rounded-lg p-2 hover:scale-105 transition-transform ">
              Change
            </button>
            <button onClick={() => download(src)} className="flex-1 bg-gradient-to-r from-green-500 to bg-cyan-600 font-medium rounded-lg p-2 hover:scale-105 transition-transform ">
              Download-
            </button>
            <button onClick={() => copy(src)} className="flex-1 bg-gradient-to-r from-orange-500 to bg-amber-600 font-medium rounded-lg p-2 hover:scale-105 transition-transform ">
              Copy
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
