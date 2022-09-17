import { BrowserRouter, Switch, Route } from 'react-router-dom';


import { Search } from './pages/search/Search';
import { History } from './pages/history/History';

export const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/search" exact component={Search} />
        <Route path="/history" exact component={History} />
        <Route path="/" exact component={Search} />
      </Switch>
    </BrowserRouter>
  );
}
