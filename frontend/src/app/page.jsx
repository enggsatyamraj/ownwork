"use client";
import Link from "next/link";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [inputData, setInputData] = useState("");
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(null);

  const uploadData = async () => {
    setLoading(true);
    try {
      const parsedData = JSON.parse(inputData);
      if (parsedData && typeof parsedData === "object") {
        setUrl(null);
        // Data is valid JSON
        const response = await fetch(
          "https://ownwork.onrender.com/api/v1/uploadjson",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(parsedData), // Send parsedData directly
          }
        );
        const responseData = await response.json();
        console.log(responseData); // Log the response from the server
        setUrl(responseData.url);
        toast.success("Data uploaded successfully");
      } else {
        toast.error("Invalid JSON format.");
      }
    } catch (error) {
      setResultMessage("Invalid JSON format.");
      toast.error("Invalid JSON format");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-[#ddc28f]">
        <div className="max-w-[1280px] flex items-center justify-center gap-6 flex-col md:flex-row mx-auto px-3 min-h-[60vh] py-12">
          <div className="flex-1">
            <h1 className="text-2xl font-semibold mb-2">API Editor</h1>
            <p className="md:text-[18px] text-[16px] mb-7">
              Need a quick API for testing? Look no further. With OurWebsite,
              it&apos;s as easy as entering your desired response body below and
              hitting &apos;Create API&apos;. No complex setups, no database hassle – just
              instant access to your custom API URL. Simplify your testing
              process and get your API up and running in seconds. Try it now!
            </p>
            <textarea
              className="border-2 px-3 py-1 rounded-lg border-[#996c37] h-[150px] w-[90%]"
              type="text"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              placeholder="Enter JSON Data"
            />
            <br />
            <button
              className="bg-[#996c37] my-4 py-2 px-4 rounded-lg text-white"
              onClick={uploadData}
            >
              Upload Data
            </button>
            {loading && <p>Loading...</p>}
            {url && (
              <p className="font-bold text-xl">
                URL:{" "}
                <Link
                  className="hover:underline font-normal text-[16px]"
                  href={url}
                  target="_blank"
                >
                  {url}
                </Link>
              </p>
            )}
          </div>
          <div className="flex-1 bg-[#996c37] p-4 rounded-lg text-[#ddc28f]">
            <h1 className="text-[18px] md:text-[22px] mb-4 font-bold">
              Create Custom APIs in Seconds
            </h1>
            <p className="opacity-70 mb-3">
              With OurWebsite, API creation has never been easier. Simply paste
              your JSON data below, and watch as we generate a fully functional
              API for you. Say goodbye to manual backend setups and tedious
              database configurations, our platform automates the process,
              giving you more time to focus on what matters most. Whether you&apos;re
              a developer looking to streamline your workflow or a business
              seeking to leverage your data, OurWebsite is your one-stop
              solution. Get started today and unleash the power of your JSON
              data like never before.
            </p>
            <h2 className="text-[20px] font-bold mb-1">Benefits</h2>
            <ul class="list-disc list-inside">
              <li class="mb-2">
                <span class="font-semibold">Instant Creation: </span>
                <p className="opacity-70">
                  Say goodbye to lengthy setup processes. Our platform generates
                  custom APIs instantly, saving you valuable time and effort.
                </p>
              </li>
              <li class="mb-2">
                <span class="font-semibold">No Backend Required: </span>
                <p className="opacity-70">
                  Forget about setting up databases or configuring backend
                  servers. OurWebsite handles everything for you, so you can
                  focus on what matters most building great applications.
                </p>
              </li>
              <li class="mb-2">
                <span class="font-semibold">Multiple Endpoints: </span>
                <p className="opacity-70">
                  Need to create APIs for different endpoints? Our platform
                  supports multiple endpoints, allowing you to manage and
                  customize each API according to your requirements.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default App;
