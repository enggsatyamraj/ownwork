"use client";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const SCHEMA_OPTIONS = [
  { value: "string", label: "String" },
  { value: "email", label: "Email" },
  { value: "ipaddress", label: "IP Address" },
  // Add more schema options as needed
];

const API_URL = "https://ownwork.onrender.com/api/v1/uploadjson";

const SchemaBasedJSONCreator = () => {
  const [fields, setFields] = useState([]);
  const [currentField, setCurrentField] = useState("");
  const [currentSchema, setCurrentSchema] = useState("string");
  const [formattedData, setFormattedData] = useState("");
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(null);
  const [copyStatus, setCopyStatus] = useState("Copy");
  const [jsonLength, setJsonLength] = useState(1); // State for JSON length
  const [wordCount, setWordCount] = useState(5); // State for word count in string fields

  useEffect(() => {
    generateJSON();
  }, [fields, jsonLength, wordCount]);

  const handleAddField = () => {
    if (currentField) {
      setFields((prevFields) => [
        ...prevFields,
        { field: currentField, schema: currentSchema, wordCount },
      ]);
      setCurrentField("");
      setCurrentSchema("string");
      setWordCount(5); // Reset word count after adding a field
    }
  };

  const generateRandomText = (numWords, index) => {
    const words =
      "Lorem ipsum dolor sit amet consectetur adipiscing elit".split(" ");
    const uniqueWords = new Set();
    while (uniqueWords.size < numWords) {
      uniqueWords.add(words[Math.floor(Math.random() * words.length)]);
    }
    return Array.from(uniqueWords).join(" ") + ` ${index}`; // Append index to ensure uniqueness
  };

  const generateJSON = () => {
    const jsonArray = [];
    for (let i = 0; i < jsonLength; i++) {
      const jsonObject = { id: i + 1 };
      fields.forEach(({ field, schema, wordCount }) => {
        let value;
        switch (schema) {
          case "email":
            value = `example${i + 1}@example.com`;
            break;
          case "ipaddress":
            value = `192.168.0.${i + 1}`;
            break;
          case "string":
            value = generateRandomText(wordCount, i + 1);
            break;
          default:
            value = "";
        }
        jsonObject[field] = value;
      });
      jsonArray.push(jsonObject);
    }

    setFormattedData(JSON.stringify(jsonArray, null, 2));
  };

  const uploadData = async () => {
    setLoading(true);
    setUrl(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(JSON.parse(formattedData)),
      });
      const responseData = await response.json();
      if (response.ok) {
        setUrl(responseData.url);
        toast.success("Data uploaded successfully");
      } else {
        throw new Error(responseData.message || "Upload failed");
      }
    } catch (error) {
      toast.error(error.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeField = (e) => setCurrentField(e.target.value);
  const handleChangeSchema = (e) => setCurrentSchema(e.target.value);
  const handleChangeLength = (e) => setJsonLength(Number(e.target.value));
  const handleChangeWordCount = (e) => setWordCount(Number(e.target.value));
  const handleCopy = () => {
    if (url) {
      navigator.clipboard.writeText(url);
      setCopyStatus("Copied");
      setTimeout(() => setCopyStatus("Copy"), 3000);
    }
  };

  return (
    <>
      <div className="bg-[#ddc28f]">
        <div className="max-w-[1280px] flex items-center justify-center gap-6 flex-col md:flex-row mx-auto px-3 min-h-[60vh] py-12">
          <div className="flex-1">
            <h1 className="text-2xl font-semibold mb-2">
              Schema-Based JSON Creator
            </h1>
            <div className="mb-4">
              <input
                type="text"
                value={currentField}
                onChange={handleChangeField}
                placeholder="Field Name"
                className="border-2 px-3 py-1 rounded-lg border-[#996c37] w-[90%]"
              />
              <select
                value={currentSchema}
                onChange={handleChangeSchema}
                className="border-2 px-3 py-1 rounded-lg border-[#996c37] w-[90%] mt-2"
              >
                {SCHEMA_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {currentSchema === "string" && (
                <div className="mt-2">
                  <label className="block text-sm font-semibold mb-2">
                    Number of Words
                  </label>
                  <input
                    type="number"
                    value={wordCount}
                    onChange={handleChangeWordCount}
                    min="1"
                    className="border-2 px-3 py-1 rounded-lg border-[#996c37] w-[90%]"
                  />
                </div>
              )}
              <button
                className="bg-[#996c37] my-4 py-2 px-4 rounded-lg text-white"
                onClick={handleAddField}
              >
                Add Field
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                Number of Items in JSON
              </label>
              <input
                type="number"
                value={jsonLength}
                onChange={handleChangeLength}
                min="1"
                className="border-2 px-3 py-1 rounded-lg border-[#996c37] w-[90%]"
              />
            </div>
            <textarea
              className="border-2 px-3 py-1 rounded-lg border-[#996c37] h-[150px] w-[90%] overflow-y-auto"
              type="text"
              value={formattedData}
              readOnly
              placeholder="Generated JSON will appear here"
              style={{ fontFamily: "monospace", whiteSpace: "pre", tabSize: 2 }}
            />
            <br />
            <button
              className="bg-[#996c37] my-4 py-2 px-4 rounded-lg text-white flex items-center"
              onClick={uploadData}
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm mr-2"></span>
              ) : (
                "Upload Data"
              )}
            </button>
            {url && (
              <p className="font-bold text-xl">
                URL:{" "}
                <a
                  className="hover:underline font-normal text-[16px]"
                  href={url}
                  target="_blank"
                >
                  {url}
                </a>
                <button
                  className="ml-2 bg-[#996c37] py-1 px-2 rounded-lg text-white"
                  onClick={handleCopy}
                >
                  {copyStatus}
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default SchemaBasedJSONCreator;
