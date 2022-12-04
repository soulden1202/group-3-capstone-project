// navBar.test.js
import React from "react";
// screen newer way to utilize query in 2020
import { render, screen } from "@testing-library/react";
import { NavBar } from "./components";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
test("render about link", () => {
  render(<NavBar />, { wrapper: MemoryRouter });
  expect(screen.getByText(/About/)).toBeInTheDocument();
});
