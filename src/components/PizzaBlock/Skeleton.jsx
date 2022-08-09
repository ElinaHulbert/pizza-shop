import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="139" cy="120" r="120" />
    <rect x="0" y="307" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="417" rx="10" ry="10" width="95" height="27" />
    <rect x="163" y="412" rx="10" ry="10" width="117" height="45" />
    <rect x="0" y="257" rx="10" ry="10" width="280" height="23" />
  </ContentLoader>
);

export default Skeleton;
