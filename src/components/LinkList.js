import React, { useEffect, useState } from "react";
import LinkServices from "../services/link.services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { async } from "@firebase/util";

export default function LinkList() {
  const [links, setLinks] = useState([]);

  const getLinks = async () => {
    const data = await LinkServices.getAllLinks();
    setLinks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(data.docs);
  };

  const deleteHandler = async (id) => {
    await LinkServices.deleteLink(id);
    getLinks();
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <div className="bg-white p-7 border rounded-lg shadow-lg">
      <div className="flex justify-end">
        <button
          className="bg-blue-200 p-2 hover:text-white border rounded-md text font-semibold"
          onClick={() => {
            getLinks();
          }}
        >
          Refresh
        </button>
      </div>
      <table className="table-auto border-separate [border-spacing:0.75rem]">
        <thead>
          <tr>
            <th>Campaign</th>
            <th>Page</th>
            <th>Short Link</th>
          </tr>
        </thead>
        <tbody>
          {links.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td className="flex justify-center">{doc.campaign}</td>
                <td>{doc.page}</td>
                <td>
                  <a href={doc.link} className="text-blue-600">
                    {doc.link}
                  </a>
                </td>
                <td>
                  <FontAwesomeIcon
                    onClick={() => {
                      deleteHandler(doc.id);
                    }}
                    icon={faTrashCan}
                    className="hover:text-red-500"
                  ></FontAwesomeIcon>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
