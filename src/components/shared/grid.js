import styled from "styled-components";

/**
  Media Query Helpers to be used with styled-components
  const Box = styled.div`
    margin: 20px;
    padding: 20px;
    ${medium(`
      margin: 0 auto;
      padding: 100px 50px;
    `)}
  `
  */

export const xlarge = styles => `
  @media all and (min-width: 1440px) {
    ${styles}
  }
`;
export const large = styles => `
  @media all and (min-width: 1024px) {
    ${styles}
  }
`;
export const medium = styles => `
  @media all and (min-width: 768px) {
    ${styles}
  }
`;
export const mediumOnly = styles => `
  @media all and (min-width: 768px) and (max-width: 1023px) {
    ${styles}
  }
`;
export const small = styles => `
  @media all and (max-width: 767px) {
    ${styles}
  }
`;
export const xsmall = styles => `
  @media all and (max-width: 500px) {
    ${styles}
  }
`;
export const xxsmall = styles => `
  @media all and (max-width: 400px) {
    ${styles}
  }
`;

/**
  Use the Container to set a uniform content width and margin
  <Container>
    // content goes here
  </Container>
  */

export const Container = styled.div`
  margin: 0;
  max-width: 1200px;
  padding: 0 20px;
  width: 100%;
  ${xlarge(`
    margin: 0 auto;
  `)}
`;

/**
  12-column Grid; breaks to 4-column on small screens
  */

export const Grid = styled.div`
  display: grid;
  grid-gap: 30px 20px;
  grid-template-columns: repeat(4, 1fr);
  ${small("width: 100%;")}
  ${medium(`
    grid-gap: 30px;
    grid-template-columns: repeat(12, 1fr);
  `)}
`;

/**
  Use Col to define columns inside a Grid
  Grids can be nested inside Cols
  <Grid>
    <Col span={8}>
      <Grid>
        <Col span={12}>
          header
        </Col>
        <Col span={6}>
          Content A-1
        </Col>
        <Col span={6}>
          Content A-2
        </Col>
      </Grid>
    </Col>
    <Col span={4}>
      Content B
    </Col>
  </Grid>
  Breaks on medium, by default(ie, cols get flattened out into rows)
  To break on the large breakpoint, pass `large` as a prop:
  <Grid>
    <Col span={6} large>
      ...
    </Col>
    <Col span={6} large>
      ...
    </Col>
  </Grid>
  */

export const Col = styled.div`
  grid-column: span 4;
  ${props => {
    if(props.large) {
      return `
        grid-column: span 12;
        ${small("grid-column: span 4;")}
        ${large(`grid-column: span ${props.span || 1};`)}
      `
    }
    return `
      ${medium(`grid-column: span ${props.span || 1};`)}
      ${props["span-md"]
        ? `${mediumOnly(`grid-column: span ${props["span-md"]};`)}`
        : ""}
    `
  }}
`;

export const Spacer = styled.div`
  ${small(`display: none;`)}
  ${props => `
    grid-column: span ${props.span || 1};
    ${props.large
      ? `
        display: none;
        ${large("display: block")}
      `
      : medium("display: block")}
  `}
`;
