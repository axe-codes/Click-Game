import React, { useEffect, useRef, useState } from "react";

export const ClickGame = () => {
  const rows = 3;
  const colums = 3;
  const [grid, setGrid] = useState(
    //Array.from({ length: 3 }, () => new Array(3).fill(false))
    Array.from({ length: rows }, () => new Array(colums).fill(false))
  );
  console.log(grid);
  const gridRef = useRef([]);
  const disableRef = useRef(false);
  const timmerRef = useRef([]);

  //console.log("gridRef - ", gridRef);
  //console.log("disableRef - ", disableRef);

  const handleOnClick = (ri, ci, flag) => {
    if (disableRef.current === true && flag) return;

    if (grid[ri][ci] && flag) return;

    setGrid((prevGrid) => {
      const gridDeepCopy = prevGrid.map((row) => [...row]);
      gridDeepCopy[ri][ci] = flag;
      if (flag) gridRef.current.push([ri, ci]);
      return gridDeepCopy;
    });
  };

  useEffect(() => {
    if (gridRef.current.length === 9) {
      disableRef.current = true;
      gridRef.current.forEach(([ri, ci], idx) => {
        timmerRef.current[idx] = setTimeout(() => {
          handleOnClick(ri, ci, false);
          if (idx === 8) disableRef.current = false;
        }, 1000 * idx + 1);
      });
      gridRef.current = [];
    }
  }, [grid]);

  useEffect(() => {
    return () => {
      timmerRef.current.forEach((id) => clearTimeout(id));
    };
  }, []);

  return (
    <div className="container">
      {grid.map((row, rowIdx) => {
        return row.map((cell, colIdx) => {
          return (
            <div
              className={`cell ${cell ? "active" : ""}`}
              key={`${rowIdx}-${colIdx}`}
              onClick={() => handleOnClick(rowIdx, colIdx, true)}
            ></div>
          );
        });
      })}
    </div>
  );
};
