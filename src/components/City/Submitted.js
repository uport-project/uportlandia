import React from "react";
import styled from "styled-components";

import * as theme from "../shared/theme";
import { Container } from "../shared/grid";
import Card from "../shared/ContentCard";
import { Button } from "../shared/elements";
import isValid from "../../utils/validateCityIdInfo";
import SuccessIcon from "../../images/smiley-face.svg";
import AttestationModal from "./SendAttestationContainer";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attestationModal: false
    };
  }
  componentDidMount() {
    if(!this.props.isLoggedIn) {
      this.props.redirectToCityHome();
    } else if(!isValid(this.props.data)) {
      this.props.redirectToCityIdForm();
    }
  }
  hideAttestationModal = () => {
    this.setState({
      attestationModal: false
    });
  }
  showAttestationModal = () => {
    this.setState({
      attestationModal: true
    });
  }
  render() {
    const { attestationModal } = this.state;
    const { data } = this.props;
    if(!this.props.isLoggedIn || !isValid(this.props.data))
      return null;
    return (<Wrapper>
      <Card>
        <h2>Good News!</h2>
        <p>Your information has been succesfully verified. Your City ID is
          ready to be issued.</p>

        <SuccessImage src={SuccessIcon} />
        <hr />
        <h4>What’s next?</h4>
        <p>
          Let’s make sure you have an access to your Cleverland City ID
          whenever and wherever you need them. The City of Cleverland is
          going to send your new ID claims to your uPort app.
        </p>
        <Button secondary onClick={this.showAttestationModal}>Receive City ID</Button>
      </Card>
      <AttestationModal
        show={data && attestationModal}
        onClose={this.hideAttestationModal}
        claim={data} />
    </Wrapper>)
  }
}

const Wrapper = styled.div`
  ul {
    list-style: disc;
    margin-left: 20px;
    li + li {
      margin-top: 15px;
    }
  }
`;
const SuccessImage = styled.img`
  display: block;
  margin: 40px auto 0;
`;

export default Landing;
