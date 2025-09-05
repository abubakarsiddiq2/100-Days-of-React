import { useState } from "react";
import "animate.css";
import getYouTubeID from "get-youtube-id";
import { toast, ToastContainer } from "react-toastify";

function App() {
  const [url, setUrl] = useState();
  const [thumbnail, setThumbnail] = useState([]);

  const urlModal = [
    {
      width: 120,
      height: 90,
      url: "https://img.youtube.com/vi",
      fileName: "default.jpg",
    },
    {
      width: 320,
      height: 180,
      url: "https://img.youtube.com/vi",
      fileName: "mqdefault.jpg",
    },
    {
      width: 480,
      height: 360,
      url: "https://img.youtube.com/vi",
      fileName: "hqdefault.jpg",
    },
    {
      width: 640,
      height: 480,
      url: "https://img.youtube.com/vi",
      fileName: "sddefault.jpg",
    },
    {
      width: 1280,
      height: 720,
      url: "https://img.youtube.com/vi",
      fileName: "mexresdefault.jpg",
    },
  ];

  const fetchThumbnail = (e) => {
    e.preventDefault();
    const youtubeId = getYouTubeID(url);
    if (youtubeId) {
      const modal = urlModal.map((item) => ({
        ...item,
        url: `${item.url}/${youtubeId}/${item.fileName}`,
      }));
      setThumbnail(modal);
    } else {
      toast.error("Invalid Video Url");
    }
  };

  return (
    <>
      <div className="min-h-screen py-8 bg-gray-200">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Youtube Thumbnail Download</h1>
          <form className="space-x-4 mt-8" onSubmit={fetchThumbnail}>
            <input
              onChange={(e) => setUrl(e.target.value)}
              type="url"
              className="bg-white p-3 rounded-lg w-[450px]"
              required
              placeholder="Enter Youtube Video URL"
            />
            <button className="p-3 rounded-lg bg-indigo-600 text-white font-medium">
              Search
            </button>
          </form>
        </div>

        <div className="grid grid-cols-3 gap-12 w-10/12 mx-auto mt-12 rounded-lg">
          {thumbnail.map((item, i) => (
            <div key={i} className="bg-white  rounded-lg">
              <img
                className="w-full h-[250px] object-cover rounded-t-xl"
                src={item.url}
                alt=""
              />
              <div className="p-3 bg-white rounded-b-xl flex justify-between items-center">
                <h1 className="text-xl font-medium">
                  {item.width}x{item.height}
                </h1>
               <a href={item.url} target="_blank">
                 <button className="py-2 px-4 rounded-lg bg-green-600 text-white font-medium">
              Download
            </button>
               </a>
              </div>
            </div>
          ))}
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
