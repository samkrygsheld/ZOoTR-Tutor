export default function ToolTip(props: any) {
  return (
    <>
      <div
        style={{
          transform: `translate(${props.left}px, ${props.top}px)`,
          display: props.text ? 'block' : 'none',
        }}
      >
        {props.text}
      </div>
      <style jsx>{`
        div {
          position: absolute;
          text-align: center;
          top: -37px;
          left: -75px;
          min-width: 150px;
          /* height: 100px; */
          padding: 5px 15px;
          border: 3px var(--light-brown) solid;
          border-radius: 5px;
          background: black;
          color: white;
          text-shadow: none;
          /* opacity: 0.85; */
        }
      `}</style>
    </>
  );
}
