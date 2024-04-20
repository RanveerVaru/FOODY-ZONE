import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResult from "./components/SearchResult/SearchResult";

export const BASE_URL = "http://localhost:9000";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filteredData, setFilteredData] = useState();
  const [selectedBtn, setSelectedBtn] = useState();

  useEffect(() => {
    const FetchFoodData = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();
        setData(json); // Update to setData(json)
        setFilteredData(json);
        setLoading(false);
      } catch (error) {
        setError(error); // Update to setError(error)
      }
    };
    FetchFoodData();
  }, [setData, setLoading, setError]); // Include dependencies in the array

  const searchFood = (e) => {
    const searchValue = e.target.value;

    if (searchValue === "") {
      setFilteredData(data);
      return;
    }

    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filter);
  };

  const filterFood = (type) => {
    if (type === "all") {
      setFilteredData(data);
      setSelectedBtn("all");
      return;
    }

    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );

    setFilteredData(filter);
    setSelectedBtn(type);
  };

  if (loading) return <div>Loading.....</div>;

  const filterBtns = [
    { name: "All", type: "all" },
    { name: "breakfast", type: "breakfast" },
    { name: "Lunch", type: "lunch" },
    { name: "Dinner", type: "dinner" },
  ];

  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="/logo.png" alt="" srcSet="" /> {/* Fix typo srcSet */}
          </div>
          <div className="search">
            <input
              type="text"
              onChange={searchFood}
              placeholder="Search Food..."
            />
          </div>
        </TopContainer>

        <FilterContainer>
          {filterBtns.map((value) => (
            <Button
              isSelected={selectedBtn === value.type}
              key={value.name}
              onClick={() => filterFood(value.type)}
            >
              {value.name}
            </Button>
          ))}
        </FilterContainer>
      </Container>
      <SearchResult data={filteredData} />
    </>
  );
};

export default App;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  height: 100px;
  .search {
    input {
      background-color: transparent;
      height: 40px;
      border: 2px solid white;
      border-radius: 12px;
      color: white;
      font-size: 16px;
      padding: 0 10px;
      &::placeholder{
        color: white;
      }
    }
  }

  @media (max-width: 600px) {
    flex-direction: column;
    height: 100px;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end; /* Fix align-items */
  gap: 12px;
  padding-bottom: 40px;
`;

export const Button = styled.div`
  background-color: ${(props) => (props.isSelected ? "#f22f2f" : "#ff4343")};
  outline: 3px solid ${(props) => (props.isSelected ? "white" : "#ff4343")};
  border-radius: 5px;
  padding: 6px 12px;
  cursor: pointer;
  &:hover {
    background-color: #f22f2f;
  }
`;
