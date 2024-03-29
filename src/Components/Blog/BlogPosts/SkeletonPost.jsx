import React from "react"
import ContentLoader from "react-content-loader"

const SkeletonPost = (props) => (
  <ContentLoader 
    speed={1}
    width={560}
    height={184}
    viewBox="0 0 560 184"
    backgroundColor="#f3f3f3"
    foregroundColor="#c7c5c5"
    {...props}
  >
    <rect x="60" y="16" rx="0" ry="0" width="152" height="16" /> 
    <rect x="60" y="40" rx="0" ry="0" width="99" height="16" /> 
    <rect x="24" y="72" rx="0" ry="0" width="512" height="16" /> 
    <rect x="24" y="116" rx="0" ry="0" width="400" height="16" /> 
    <rect x="24" y="148" rx="0" ry="0" width="20" height="20" /> 
    <rect x="24" y="94" rx="0" ry="0" width="464" height="16" /> 
    <circle cx="36" cy="28" r="12" /> 
    <rect x="68" y="148" rx="0" ry="0" width="20" height="20" />
  </ContentLoader>
)

export default SkeletonPost

