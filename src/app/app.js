import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Refast,{ Component} from 'refast';

import { render } from 'react-dom';
import FastClick from 'fastclick';
import reward from 'pages/rewardpc';
import 'antd/dist/antd.css'; 
import DB from 'db';


const customHistory = hashHistory;



// bind fastclick
FastClick.attach(document.body);

// 这里使用 use 来配置 Refast
// Refast 文档 https://recore.github.io/refast-docs/
Refast.use('fn', {
  DB,
  history: customHistory,
});



class App extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

render(
  <Router history={customHistory}>
    <Route name="app" path="/" component={App}>
      <IndexRoute component={reward} />
    </Route>
  </Router>,
  document.getElementById('App'),
);
