import { debounce, TextField } from "@material-ui/core";
import React, { useCallback, useRef } from "react";
import './SearchInputs.scss';

type SearchProps = {
  handleFilter: (filter: any) => void;
};

const SearchInputs = (props: SearchProps) => {
  const yearFilter = useRef<any>();
  const massFilter = useRef<any>();

  const request = debounce((value: { year: number; mass: number }) => {
    props.handleFilter(value);
  }, 1000);

  const debouceRequest = useCallback(
    (value) =>
      request({
        year: +yearFilter.current.value,
        mass: +massFilter.current.value,
      }),
    [ request]
  );

  const onYearChangeHandler = (e: any) => {
    debouceRequest({ year: e.target.value });
  };

  const onMassChangeHandler = (e: any) => {
    debouceRequest({ mass: e.target.value });
  };

  return (
    <form className="filterForm" noValidate autoComplete="off">
      <TextField
        type="number"
        inputRef={yearFilter}
        label="Year"
        className="textField"
        onChange={onYearChangeHandler}
      />
      <TextField
        type="number"
        inputRef={massFilter}
        label="Mass(g)"
        className="textField"
        onChange={onMassChangeHandler}
      />
    </form>
  );
};

export default SearchInputs;
