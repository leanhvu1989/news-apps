import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import { buildQueryByFilter } from "./queryBuilder";

// Create a context object
const UserContext = React.createContext({
  user: { "username": "", "email": "" },
  settings: {
    "isTop": true,
    "topNews": {
      "category": "business",
      "country": "us",
      "sources": ""
    },
    "optional": {
      "q": "",
      "sortBy": "",
      "from": "",
      "to": "",
      "domain": ""
    }
  }
});

class UserProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      settings: {
        "isTop": true,
        "topNews": {
          "category": "business",
          "country": "us",
          "sources": ""
        },
        "optional": {
          "q": "",
          "sortBy": "",
          "from": "",
          "to": "",
          "domain": ""
        }
      },
      onUpdateUser: (user) => {
        if (user) {
          this.setState(state => ({ user: user }));
        }
        localStorage.setItem('localuser', JSON.stringify(this.state));
      },
      onUpdateSettings: (settings) => {
        if (settings) {
          this.setState(state => ({ settings: settings }));
        }
        localStorage.setItem('localuser', JSON.stringify(this.state));
      },
      onUserLogoff: () => {
        //clear the user settings
        localStorage.removeItem("localuser");
        this.setState(state => ({
          user: {},
          settings: {
            "isTop": true,
            "topNews": {
              "category": "business",
              "country": "us",
              "sources": ""
            },
            "optional": {
              "q": "",
              "sortBy": "",
              "from": "",
              "to": "",
              "domain": ""
            }
          }
        }));
      },
      updateData: () => {
        this.fetchData();
      },
      loadData: () => {
        return JSON.parse(localStorage.getItem("localdata") || '{"data": {"articles": []}}');
      },
    };
  }

  fetchData = async () => {
    let oFilter = { ...this.state.settings };
    const url = buildQueryByFilter(oFilter);
    const requestOne = axios.get(url);
    //const requestTwo = axios.get(SERVICE_URL.TOP_HEADLINE_TECHCRUNCH);
    await axios.all([requestOne])
      .then(axios.spread((...responses) => {
        const articleOne = responses[0].data.articles;
        //const articleTwo = responses[1].data.articles;
        localStorage.setItem('localdata', JSON.stringify({ articles: articleOne }));
      })).catch(errors => {
        // react on errors.
      })
  };

  onPageRefresh = () => {
    const localuser = JSON.parse(localStorage.getItem("localuser") ||
      `{ "user": {"username" : "", "email": ""},
      "settings": {
        "isTop": true,
        "topNews": {
          "category": "business",
          "country": "us",
          "sources": ""
        },
        "optional": {
          "q": "",
          "sortBy": "",
          "from": "",
          "to": "",
          "domain": ""
        }
      }}`);
    this.setState(state => ({
      user: localuser["user"],
      settings: localuser["settings"]
    }));
  }

  componentWillMount() {
    this.onPageRefresh();
    this.fetchData();
  }

  static propTypes = {
    prop: PropTypes
  };

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

const UserConsumer = UserContext.Consumer;

export { UserProvider, UserConsumer };