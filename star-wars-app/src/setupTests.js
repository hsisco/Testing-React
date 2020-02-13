// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import React from "react";
import * as rtl from "@testing-library/react";
import App from "./App";
import axios from 'axios';

const wrapper = rtl.render(<App />);

const wait = (seconds, callback) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
      callback("callback")
    }, seconds * 1000);
  })
}

jest.mock("axios", () => {
  return {
    get: jest.fn(() => Promise.resolve({
      data: {
        message: ["foo.jpg","bar.jpg"]
      }
    }))
  }
});

test("Wait for promise to resolve", async () => {
  const waitFn = wait(5, jest.fn());

  const res = await waitFn;

  expect(res).toBe("resolved");
})

test("Made an api call", async () => {
  await wrapper.findByText(/Luke Skywalker/i);
  expect(axios.get).toHaveBeenCalled(); 
})