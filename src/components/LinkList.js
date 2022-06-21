import React, { useEffect, useState } from "react";
import LinkServices from "../services/link.services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

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
    <div className="bg-white p-7 border rounded-lg shadow-lg flex flex-col justify-center">
      <div className="flex justify-end">
        <button
          onClick={() => {
            getLinks();
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Refresh
        </button>
      </div>
      <div className="border rounded-lg inline-block mt-3 overflow-auto">
        <table className="table-auto border rounded-lg overflow-hidden">
          <thead className="border rounded-lg">
            <tr className="bg-gray-200 border rounded">
              <th className="p-2">#</th>
              <th className="p-2">Campaign</th>
              <th className="p-2">Page</th>
              <th className="p-2">Short Link</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {links.map((doc, index) => {
              return (
                <tr
                  key={doc.id}
                  className="border border-separate border-gray-300 "
                >
                  <td className="p-3 ">{index + 1}</td>
                  <td className="p-3 text-center">{doc.campaign}</td>
                  <td className="p-3">{doc.page}</td>
                  <td className="p-3">
                    <a href={doc.link} className="text-blue-600">
                      {doc.link}
                    </a>
                  </td>
                  <td className="p-3">
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
    </div>
  );
}
