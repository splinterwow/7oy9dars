import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { TbSend } from "react-icons/tb";
import { PiChartLineThin } from "react-icons/pi";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { useState, useEffect } from "react";
import data from "../assets/data.json";
import { Select } from "antd";

const { Option } = Select;

function CurrentCountry() {
  const [option, setOption] = useState([]);
  const [toCurrency, setToCurrency] = useState("USD");
  const [fromCurrencyValue, setFromCurrencyValue] = useState("");
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setOption(data);
    } else {
      console.error("error");
    }
  }, []);

  const handleConvert = () => {
    const fromCurrency = option.find(curr => curr.currencies && Object.keys(curr.currencies)[0] === fromCurrencyValue);
    const toCurrencyData = option.find(curr => curr.currencies && Object.keys(curr.currencies)[0] === toCurrency);
    
    if (fromCurrency && toCurrencyData) {
      const fromRate = parseFloat(fromCurrency.currencies[Object.keys(fromCurrency.currencies)[0]].rateToUSD); // Convert string to number
      const toRate = parseFloat(toCurrencyData.currencies[Object.keys(toCurrencyData.currencies)[0]].rateToUSD); // Convert string to number
      
      // Check if rates are valid numbers
      if (!isNaN(fromRate) && !isNaN(toRate)) {
        const result = (amount / fromRate) * toRate;
        setConvertedAmount(result);
      } else {
        console.error("Invalid conversion rates");
        setConvertedAmount(null);
      }
    } else {
      console.error("Selected currencies not found");
      setConvertedAmount(null);
    }
  };

  return (
    <>
      <div className="container mx-auto bg-indigo-900 h-20 pt-3 flex items-center justify-between">
        <div className="flex items-center ml-28 -mt-4">
          <div className="text-white font-bold text-xl">Logo</div>
          <h1 className="text-gray-50 font-bold ml-4">
            Personal |
            <span className="text-gray-300 text-ellipsis">Business</span>
          </h1>
        </div>

        <ul className="flex gap-8 text-gray-50 font-bold cursor-pointer -mt-4">
          <li>Send Money</li>
          <li>Converter</li>
          <li>Currency API</li>
          <li>Tools</li>
          <li>Resources</li>
        </ul>

        <div className="flex gap-4 mr-16 -mt-4">
          <button className="text-gray-50">Sign In</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Register
          </button>
        </div>
      </div>

      <div className="bg-indigo-800 h-96 mx-auto flex flex-col items-center justify-center container">
        <div className="flex flex-col items-center absolute -mt-40">
          <h1 className="text-gray-50 font-bold text-3xl mb-2">
            Trusted Global Currency Converter & Money Transfers
          </h1>
          <p className="text-gray-50">
            Best source for currency conversion, sending money online and
            tracking exchange rates
          </p>
        </div>

        <div className="bg-white p-4 rounded shadow-md w-2/3 mt-80">
          <div className="mb-14">
            <ul className="flex justify-between p-4 bg-[#F0F5FA] border-none text-gray-800 border">
              <li className="flex items-center cursor-pointer text-indigo-600">
                <FaMoneyBillTrendUp /> Convert
              </li>
              <li className="flex items-center cursor-pointer">
                <TbSend /> Send
              </li>
              <li className="flex items-center cursor-pointer">
                <PiChartLineThin /> Charts
              </li>
              <li className="flex items-center cursor-pointer">
                <HiOutlineBellAlert /> Alerts
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-4 m-4">
            <div className="flex flex-col w-1/3">
              <label>Amount</label>
              <input
                type="number"
                placeholder="$100.0"
                className="priceInput border border-gray-300 p-2 w-full"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="flex flex-col w-1/3">
              <label>From</label>
              <Select
                className="custom-dropdown"
                showSearch
                placeholder="Select Currency"
                optionFilterProp="children"
                onChange={(value) => setFromCurrencyValue(value)}
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                {option.map((currency, index) => (
                  <Option
                    key={currency.id || index}
                    value={
                      currency.currencies
                        ? Object.keys(currency.currencies)[0]
                        : ""
                    }
                  >
                    <div className="contry-wr flex">
                      {currency.flag && (
                        <img
                          className="img w-6 h-6"
                          src={currency.flag}
                          alt=""
                        />
                      )}
                      {currency.currencies && (
                        <>
                          <h4>{Object.keys(currency.currencies)[0]}-</h4>
                          <h4>{Object.values(currency.currencies)[0].name}</h4>
                        </>
                      )}
                    </div>
                  </Option>
                ))}
              </Select>
            </div>

            <div className="flex items-center justify-center">
              <span className="mx-2">→</span>
            </div>

            <div className="flex flex-col w-1/3">
              <label>To</label>
              <Select
                className="custom-dropdown"
                showSearch
                defaultValue={toCurrency}
                optionFilterProp="children"
                onChange={(value) => setToCurrency(value)}
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                {option.map((currency, index) => (
                  <Option
                    key={currency.id || index}
                    value={
                      currency.currencies
                        ? Object.keys(currency.currencies)[0]
                        : ""
                    }
                  >
                    <div className="contry-wr flex">
                      {currency.flag && (
                        <img
                          className="img w-6 h-6 mt-[2px] ml-2"
                          src={currency.flag}
                          alt=""
                        />
                      )}
                      {currency.currencies && (
                        <>
                          <h4>{Object.keys(currency.currencies)[0]}-</h4>
                          <h4>{Object.values(currency.currencies)[0].name}</h4>
                        </>
                      )}
                    </div>
                  </Option>
                ))}
              </Select>
            </div>

            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-5" onClick={handleConvert}>
              Convert
            </button>
          </div>
          {convertedAmount !== null && <div>Converted Amount: {convertedAmount.toFixed(2)}</div>}
        </div>
      </div>
    </>
  );
}

export default CurrentCountry;