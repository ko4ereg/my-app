import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    speed={1}
    width={820}
    height={960}
    viewBox="0 0 820 960"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    style={{marginLeft: "32px"}}
    {...props}
  >
    <rect x="168" y="244" rx="0" ry="0" width="88" height="20" /> 
    <rect x="168" y="216" rx="0" ry="0" width="88" height="20" /> 
    <rect x="0" y="216" rx="0" ry="0" width="88" height="24" /> 
    <rect x="168" y="40" rx="0" ry="0" width="240" height="20" /> 
    <circle cx="74" cy="114" r="74" /> 
    <rect x="168" y="68" rx="0" ry="0" width="320" height="20" /> 
    <rect x="168" y="96" rx="0" ry="0" width="400" height="24" /> 
    <circle cx="184" cy="144" r="16" /> 
    <circle cx="224" cy="144" r="16" /> 
    <circle cx="264" cy="144" r="16" /> 
    <rect x="168" y="272" rx="0" ry="0" width="88" height="20" /> 
    <rect x="692" y="216" rx="0" ry="0" width="88" height="20" /> 
    <rect x="692" y="244" rx="0" ry="0" width="88" height="20" /> 
    <rect x="0" y="375" rx="0" ry="0" width="88" height="24" /> 
    <rect x="168" y="372" rx="0" ry="0" width="194" height="194" /> 
    <rect x="378" y="372" rx="0" ry="0" width="194" height="194" /> 
    <rect x="588" y="372" rx="0" ry="0" width="194" height="194" /> 
    <rect x="692" y="272" rx="0" ry="0" width="88" height="20" /> 
    <rect x="168" y="582" rx="0" ry="0" width="194" height="194" /> 
    <rect x="378" y="582" rx="0" ry="0" width="194" height="194" /> 
    <rect x="588" y="582" rx="0" ry="0" width="194" height="194" />
  </ContentLoader>
)

export default Skeleton


