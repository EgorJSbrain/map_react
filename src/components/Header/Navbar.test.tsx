import { render, screen } from "@testing-library/react";
import { Navbar } from "./Navbar";
import { MemoryRouter } from 'react-router-dom';
import userEvent from "@testing-library/user-event";
import { App } from '../../App'
import { Provider } from 'react-redux';
import { store } from "../../store/store";
import * as redux from 'react-redux';

const routerRender = () => {
  render(
    <MemoryRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </MemoryRouter>
  );
}

jest.mock('react-i18next', () => ({
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

describe("HEADER TEST", () => {
  let spyOnUseSelector;

  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(redux, 'useSelector');
    spyOnUseSelector.mockReturnValue({ id: 1 });
  });

  test("render links", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
  });

  test('test home link', () => {
    routerRender();

    const homeLink = screen.getByTestId('home-link')
    userEvent.click(homeLink);
    expect(screen.getByTestId('home-page')).toBeInTheDocument;
  })

  test('test search link', () => {
    routerRender();

    const searchLink = screen.getByTestId('search-link')
    userEvent.click(searchLink);
    expect(screen.getByTestId('search-page')).toBeInTheDocument;
  })
});