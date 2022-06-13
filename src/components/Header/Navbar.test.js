import { render, screen } from "@testing-library/react"
import { Navbar } from "./Navbar"
import { MemoryRouter } from 'react-router-dom'
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
        <Navbar />
      </Provider>
    </MemoryRouter>
  );
}

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str) => str,
    };
  },
}));

jest.mock('react-redux', () => {
  const ActualReactRedux = jest.requireActual('react-redux');
  return {
      ...ActualReactRedux,
      useSelector: jest.fn().mockImplementation(() => {
          return mockState;
      }),
  };
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

    const homeLink = screen.getAllByTestId('home-link')
    userEvent.click(homeLink[0]);
    expect(screen.getByTestId('home-page')).toBeInTheDocument;
  })

  test('test search link', () => {
    routerRender();

    const homeLink = screen.getAllByTestId('search-link')
    userEvent.click(homeLink[0]);
    expect(screen.getByTestId('search-page')).toBeInTheDocument;
  })
});