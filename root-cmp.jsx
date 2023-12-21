import { AppFooter } from './cmps/AppFooter.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { AboutPage } from './pages/AboutPage.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { TodoIndex } from './pages/TodoIndex.jsx'

const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM
const { Provider } = ReactRedux

import { store } from './store/store.js'

export class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <section className="app">
            <AppHeader />
            <main className='app-main'>
              <Routes>
                <Route element={<HomePage />} path="/" />
                <Route element={<TodoIndex />} path="/todo" />
                <Route element={<AboutPage />} path="/about" />
              </Routes>
            </main>
          <AppFooter />
          </section>
        </Router>
      </Provider>
    )
  }
}
