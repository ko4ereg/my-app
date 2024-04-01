import React from "react"
import ContentLoader from "react-content-loader"

const SkeletonMasters = (props) => (
  <ContentLoader 
    speed={1}
    width={780}
    height={152}
    viewBox="0 0 780 152"
    backgroundColor="#f3f3f3"
    foregroundColor="#c7c5c5"
    {...props}
  >
    <rect x="168" y="50" rx="0" ry="0" width="100" height="16" /> 
    <rect x="168" y="84" rx="0" ry="0" width="250" height="16" /> 
    <circle cx="82" cy="90" r="50" /> 
    <rect x="168" y="118" rx="0" ry="0" width="300" height="16" />
  </ContentLoader>
)

export default SkeletonMasters

