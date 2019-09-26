import React from "react";
import styled from "styled-components";
import i18next from "i18next";

import isMobile from "../../utils/isMobile";

class Debug extends React.Component {
  state = {
    language: i18next.language || "",
    universalLinks: false
  }
  componentDidMount() {
    const universalLinks = sessionStorage.getItem("uPortlandia_universal_links");
    this.setState({
      universalLinks: Boolean(universalLinks)
    });
  }
  isEnglish = () => this.state.language.indexOf("en") === 0
  isSpanish = () => this.state.language.indexOf("es") === 0
  changeLang = lang => ev => {
    if(ev.target.checked) {
      sessionStorage.setItem("uPortlandia_lng", lang);
      this.setState({ language: lang });
    }
  }
  resetLang = () => {
    sessionStorage.removeItem("uPortlandia_lng");
  }
  toggleUniversalLinks = ev => {
    if(ev.target.checked) {
      sessionStorage.setItem("uPortlandia_universal_links", true);
      this.setState({ universalLinks: true });
    } else {
      sessionStorage.removeItem("uPortlandia_universal_links");
      this.setState({ universalLinks: false });
    }
  }
  render() {
    const { universalLinks } = this.state;
    return (<Main>
        <h1>User Agent</h1>
        <p>{navigator.userAgent}</p>
        <br />
        Is Mobile: {isMobile() ? "yes" : "no"}
        <hr />

        <h1>Language</h1>
        <label>
          <input type="radio" name="lang" checked={this.isEnglish()} onChange={this.changeLang("en")} />
          English
        </label>
        <label>
          <input type="radio" name="lang" checked={this.isSpanish()} onChange={this.changeLang("es")} />
          Español
        </label>
        <br/>
        <br/>
        <div>
          <button onClick={this.resetLang}>Reset Language</button>
        </div>
        <hr />
        <label>
          <input type="checkbox" checked={universalLinks} onChange={this.toggleUniversalLinks} />
          Use Universal Links
        </label>
    </Main>);
  }
}

const Main = styled.main`
  padding: 20px;
  h1 {
    font-weight: 600;
    font-size: 1.25rem;
    margin: 10px 0;
  }
  label {
    font-weight: 600;
    margin-right: 10px;
  }
`;

export default Debug;
