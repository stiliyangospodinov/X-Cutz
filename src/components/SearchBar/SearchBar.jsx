import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://x-cutz.onrender.com/data/");
        const collections = await response.json();

        const allData = [];

        for (const collection of collections) {
          const collectionResponse = await fetch(
            `https://x-cutz.onrender.com/data/${collection}`
          );
          const collectionData = await collectionResponse.json();
          allData.push(
            ...collectionData.map((item) => ({
              ...item,
              collection,
            }))
          );
        }

        setData(allData); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const match = data.find((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );

      if (match) {
        const route = `/${match.collection}`;
        navigate(route); 
      } else {
        alert("No matches found!");
      }
    }
  };

  return (
    <form className="search_form">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleSearch}
      />
    </form>
  );
};

export default SearchBar;
