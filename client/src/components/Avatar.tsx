
function Avatar({ src,width,height}:{src?:string,width?:number,height?:number}) {
  if(!src) return null
  return (
    <img
      src={src}
     style={{ width:(width||56)+"px", height:(height||56)+"px", borderRadius: "50%"}}
    />
  )
}

export default Avatar