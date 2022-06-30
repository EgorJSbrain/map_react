import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import * as redux from "react-redux";
import { App } from "../../App";
import { store } from "../../store/store";
import { Navbar } from "./Navbar";

const routerRender = () => {
  render(
    <MemoryRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </MemoryRouter>
  );
};

jest.mock("react-i18next", () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
    };
  },
}));

jest.mock("react-redux", () => {
  const ActualReactRedux = jest.requireActual("react-redux");
  return {
    ...ActualReactRedux,
    useSelector: jest.fn().mockImplementation(() => {
      return {};
    }),
  };
});

describe("HEADER TEST", () => {
  let spyOnUseSelector;

  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(redux, "useSelector");
    spyOnUseSelector.mockReturnValue({ id: 1 });
  });

  test("render links", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
  });

  test("home link", () => {
    routerRender();

    const homeLink = screen.getByTestId("home-link");
    userEvent.click(homeLink);
    // eslint-disable-next-line
    expect(screen.getByTestId('home-page')).toBeInTheDocument;
  });

  test("search link", () => {
    routerRender();

    const searchLink = screen.getByTestId("search-link");
    userEvent.click(searchLink);
    // eslint-disable-next-line
    expect(screen.getByTestId('search-page')).toBeInTheDocument;
  });
});
