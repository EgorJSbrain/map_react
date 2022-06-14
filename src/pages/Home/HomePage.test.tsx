import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { HomePage } from "./HomePage";
import * as redux from 'react-redux';
import { MemoryRouter } from "react-router-dom";

const routerRender = () => {
  render(
    <MemoryRouter>
      <Provider store={store}>
        <HomePage />
      </Provider>
    </MemoryRouter>
  );
}

jest.mock("react-i18next", () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
    };
  },
}));

jest.mock('react-redux', () => {
  const ActualReactRedux = jest.requireActual('react-redux');
  return {
      ...ActualReactRedux,
      useSelector: jest.fn().mockImplementation(() => {
          return {};
      }),
  }
});

describe("Home Page", () => {
  let spyOnUseSelector;

  // beforeEach(() => {
  //   spyOnUseSelector = jest.spyOn(redux, 'useSelector');
  //   spyOnUseSelector.mockReturnValue({ id: 1 });
  // });

  it("Home Page render", () => {
    render(<HomePage />);

    expect(screen.getByTestId('home-page')).toBeInTheDocument;
  });

  it("Home Page modal opened", async () => {
    routerRender();

    const homeBtn = screen.getByTestId('home-button');
    userEvent.click(homeBtn);

    const homeModal = await screen.findByTestId('home-modal');
    expect(homeModal).toBeInTheDocument;
  });
});
