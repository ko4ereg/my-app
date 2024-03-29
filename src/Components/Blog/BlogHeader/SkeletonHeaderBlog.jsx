import React from "react"
import ContentLoader from "react-content-loader"

const SkeletonHeaderBlog = (props) => (
  <ContentLoader 
    speed={1}
    width={624}
    height={76}
    viewBox="0 0 624 76"
    backgroundColor="#f3f3f3"
    foregroundColor="#c7c5c5"
    {...props}
  >
    <rect x="32" y="0" rx="0" ry="0" width="64" height="20" /> 
    <rect x="120" y="0" rx="0" ry="0" width="64" height="20" /> 
    <rect x="208" y="0" rx="0" ry="0" width="64" height="20" /> 
    <rect x="296" y="0" rx="0" ry="0" width="64" height="20" /> 
    <rect x="384" y="0" rx="0" ry="0" width="64" height="20" /> 
    <rect x="472" y="0" rx="0" ry="0" width="64" height="20" /> 
    <rect x="32" y="46" rx="0" ry="0" width="560" height="36" />
  </ContentLoader>
)

export default SkeletonHeaderBlog

