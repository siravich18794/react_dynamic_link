import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { async } from "@firebase/util";
import LinkServices from "../services/link.services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import LinkList from "./LinkList";

export default function Form() {
  const [page, setPage] = useState("");
  const [link, setLink] = useState("");
  const [campaign, setCampaign] = useState("");

  // Function for getting short dynamic link
  const addLinkToDB = async () => {
    console.log(`Link : ${link}`);
    const newLink = {
      campaign,
      page,
      link,
    };

    try {
      await LinkServices.addLink(newLink);
    } catch (error) {
      console.log("Error for adding the link to database");
    }
  };

  const getShortLink = async (page) => {
    try {
      const response = await axios.post(
        "https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyAZgCDUe4L--X1YzfgeK7WM5t_tRXpP0zE",
        {
          dynamicLinkInfo: {
            domainUriPrefix: "https://siravich.page.link",
            link: `https://siravich.page.link/${page}`,
            androidInfo: {
              androidPackageName: "com.example.uni_link",
              androidMinPackageVersionCode: "0",
            },
          },
        }
      );

      console.log(`Short Dynamic Link : ${response.data.shortLink}`);
      console.log(`Page : ${page}`);

      setLink(response.data.shortLink);
      console.log("Do addLinktoDB");
      addLinkToDB();
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="w-full max-w-md max-h-full">
      <form className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
        <div className="flex justify-center">
          <label
            className="block text-gray-700 text-2xl text font-bold mb-10"
            for="username"
          >
            Create Dynamic Link
          </label>
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-4"
            for="username"
          >
            Enter your campaign
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Campaign"
            onChange={(e) => setCampaign(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-4"
            for="username"
          >
            Enter page
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Page"
            onChange={(e) => setPage(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-end">
          <button
            onClick={() => {
              getShortLink(page);
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Create Link
          </button>
        </div>
        {link != "" ? (
          <div className="flex mt-5 space-x-3 justify-center">
            <a href={link} className="text text-sm font-semibold text-blue-600">
              {link}
            </a>
            {/* <FontAwesomeIcon
              icon={faCopy}
              size="lg"
              className=" hover:text-blue-600"
            ></FontAwesomeIcon> */}
          </div>
        ) : null}
      </form>
    </div>
  );
}
