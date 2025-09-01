import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [num, setNum] = useState(12);
  const [type, setType] = useState("linear");
  const [gradients, setGradients] = useState([]);

  const getHexColorCode = () => {
    // Sab se pehle red - green - blue ku * kro tu ak num generate huga HEX code nikalne ke liye
    const rgb = 255 * 255 * 255;
    // ab ju bhi result aai ga ye random us num ke sath multi* kre ga. our decimal value ku remove krne ke liye Floor use
    const random = Math.floor(Math.random() * rgb);
    // ye ak string me convert krta hai our value 16 dene ki waja ke ye toString(16) // "ff5"  (hexadecimal)
    const hexCode = random.toString(16);
    // ab is me ak problem hai ke ye hamesha 6 num genrate kr ke nhi de ga tu mujhe set krna hu ga
    // is ke liye ham use krte hai padStart, padEnd
    // padEnd ka matlab hai pehli value kitni honi cahye agr nhi hai to dusri value add kr du jab tak 1 value ke braber na hu jai
    const hexColor = hexCode.padEnd(6, "0");
    return `#${hexColor}`;
    // console.log(hexColor)
  };

  // Gradient Generate
  const generateGradient = () => {
    const colors = [];
    for (let i = 0; i < num; i++) {
      const color1 = getHexColorCode();
      const color2 = getHexColorCode();
      const degree = Math.floor(Math.random() * 360);
      const degreeString = `${degree}deg`;

      if (type === "linear") {
        colors.push({
          gradient: `linear-gradient(${degreeString}, ${color1}, ${color2})`,
          css: `background : 'linear-gradient(${degreeString}, ${color1}, ${color2})'`,
        });
      } else {
        colors.push({
          gradient: `radial-gradient(circle, ${color1}, ${color2})`,
          css: `background : 'radial-gradient(circle, ${color1}, ${color2})'`,
        });
      }
    }
    setGradients(colors);
  };

  const onCopy = (css) => {
    // ye text ku copy ke liye use hota hai
    navigator.clipboard.writeText(css);
    toast.success("Gradient Code Coped !", { position: "top-center" });
  };

  useEffect(() => {
    generateGradient();
  }, [num, type]);

  return (
    <>
      <div className="min-h-screen py-12">
        <div className="w-9/12 mx-auto space-y-12">
          <div className="flex justify-between">
            <h1 className="text-4xl font-bold">
              🎨 Gradient Generator 
            </h1>
            <div className="flex gap-6">
              <input
                value={num}
                type="text"
                placeholder="12"
                className="border border-slate-300 rounded-lg w-[100px] p-2"
                onChange={(e) => setNum(Number(e.target.value))}
              />
              <select
                className="border border-slate-300 rounded-lg w-[100px] p-2"
                onChange={(e) => setType(e.target.value)}
                value={type}
              >
                <option value="linear">Linear</option>
                <option value="radial">Radial</option>
              </select>
            <button className="py-2 px-16 bg-rose-500 rounded font-bold text-white" onClick={generateGradient}>Generate</button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {gradients?.map((item, i) => (
              <div
                key={i}
                className="h-[180px] rounded-xl relative "
                style={{ background: item?.gradient }}
              >
                <button
                  className="bg-black/50 hover:bg-black text-white  rounded text-[10px] px-2 py-1 absolute bottom-2 right-3 "
                  onClick={() => onCopy(item.css)}
                >
                  COPY
                </button>
              </div>
            ))}
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;