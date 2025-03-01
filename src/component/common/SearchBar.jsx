import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <InputGroup className="my-3 border border-pilllaw-primary rounded">
      <Form.Control
        aria-label="검색어 입력"
        placeholder="검색어를 입력하세요"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="fs-11"
      />
      <InputGroup.Text>
        <FontAwesomeIcon icon={faMagnifyingGlass} className="fs-14" />
      </InputGroup.Text>
    </InputGroup>
  );
};

export default SearchBar;
