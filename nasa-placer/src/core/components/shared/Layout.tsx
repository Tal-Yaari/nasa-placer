import React, { useEffect, useState } from "react";
import TableDate from "../TableData/TableData";

import axios from "axios";
import ColumnChart from "../ColumnChart/ColumnChart";
import { NasaData } from "../../interfaces/Models";
import SearchInputs from "../SearchInputs/SearchInputs";

const Layout = () => {
  const [nasaData, setNasaData] = useState<NasaData[]>();
  const [nasaFilterData, setNasFilteraData] = useState<NasaData[]>();

  useEffect(() => {
    axios
      .get("https://data.nasa.gov/resource/y77d-th95.json")
      .then((res) => res.data)
      .then((data) => {
        data.sort((a: NasaData, b: NasaData) => {
        return new Date(a.year).getTime() - new Date(b.year).getTime()
        }
        );
        setNasaData(data);
        setNasFilteraData(data);
      });
  }, []);

  const filterHandler = (f: { year: number; mass: number }) => {
    if (nasaFilterData && nasaData) {
      let filterArr: NasaData[] = nasaData.filter((ns) => {
        return f.year && !f.mass
          ? new Date(ns.year).getFullYear() === f.year
          : !f.year && f.mass
          ? +ns.mass > f.mass
          : f.year && f.mass
          ? new Date(ns.year).getFullYear() === f.year && +ns.mass > f.mass
          : null;
      });

      filterArr.sort((a: NasaData, b: NasaData) => {
        return new Date(a.year).getTime() - new Date(b.year).getTime()
        });

      if (filterArr.length === 0) {
        if (f.year !== 0 && f.mass !== 0) {
          let firstYear = nasaData.find((ns) => +ns.mass > f.mass);
          if (firstYear) {
            filterArr.push(firstYear);
            alert(
              `In ${f.year} there weren't any meteors weighted ${
                f.mass
              }g, but we found a similiar meteor in ${new Date(
                filterArr[0].year
              ).getFullYear()}`
            );
            setNasFilteraData(filterArr);
          } else {
            alert(`No criteria found`);
          }
        } else if (
          (f.year !== 0 && f.mass === 0) ||
          (f.year === 0 && f.mass !== 0)
        ) {
          alert(`No criteria found`);
          setNasFilteraData(nasaData);
        } else {
            setNasFilteraData(nasaData);
        }
      } else {
        setNasFilteraData(filterArr);
      }
    } else {
      setNasFilteraData(nasaData);
    }
  };

  return (
    <div className="main">
      <div className="containerFluid">
        <div className="meteorsCount">
          METEORS: {nasaFilterData ? nasaFilterData.length : 0}
        </div>
        <SearchInputs handleFilter={(filter) => filterHandler(filter)} />
        {nasaFilterData && <ColumnChart chartData={nasaFilterData} />}
        {nasaFilterData && <TableDate tableData={nasaFilterData} />}
      </div>
    </div>
  );
};

export default Layout;
