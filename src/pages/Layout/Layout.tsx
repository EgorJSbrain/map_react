import { Outlet } from "react-router-dom"
import { Header } from "../../components"
import { AppWrapper } from "./styled"

export const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}