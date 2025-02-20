import React from 'react'

function Basic({containerRef}:any) {
    
//   const ref: any = useRef();

//   const paperWidth = 250;
//   const [scale, setScale] = useState(0.3); //0 before
//   const [marginBot, setMarginBot] = useState(1);
//   const previousWidth = usePrevious(paperWidth);

//   const setScaleFunction = () => {
//     if (previousWidth !== paperWidth) {
//       const scaled = Math.min(
//         ref2.current.clientWidth / refs.current.clientWidth,
//         refs.current.clientHeight / refs.current.clientHeight
//       );
//       const marginBottom =
//         scaled * refs.current.clientHeight - refs.current.clientHeight;
//       if (scaled < 1) {
//         setScale(scaled);

//         setMarginBot(marginBottom);
//         // props.onInputResume(
//         //   scaled,
//         //   "resumeData.EditPageStates.resumePreviewScale"
//         // );
//         // props.onInputResume(
//         //   marginBottom,
//         //   "resumeData.EditPageStates.resumeMarginBottom"
//         // );
//       } else {
//         setScale(1);

//         setMarginBot(0);
//         // props.onInputResume(1, "resumeData.EditPageStates.resumePreviewScale");
//         // props.onInputResume(0, "resumeData.EditPageStates.resumeMarginBottom");
//       }
//     }
//   };
//   useEffect(() => {
//     setScaleFunction();
//   }, [paperWidth]);

console.log(containerRef.current)
  return (
    <div id="resume">
        <div className="paper">

        </div>
    </div>
  )
}

export default Basic


// <div className="mb-4">
// <div
//   ref={refs}
//   style={{
//     // transform: `translateX(-50%) scale(${scale})`,
//     transform: `translate3d(-50%, 0, 0) scale(${scale})`,
//     // transform: `translate3d(calc(50% - ${scale * 50}%), 0, 0) scale(${scale})`,
//     marginBottom: `${marginBot}px`,
//     width: `${215.9}mm`,
//     position: "relative",
//     boxSizing: "inherit",
//     transformOrigin: "center top",
//     left: "50%",
//     height: "279.4mm",
//     // box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
//     // box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
//     boxShadow:
//       " rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px", // simulate paper look
//     background: "white", // ensure paper is white,
//     transition: "transform 0.2s ease", //
//   }}
// >
//   <p className="p-9 text-gray-900">
//     Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad nobis
//     beatae temporibus tenetur, cumque nemo dicta maiores quam quisquam
//     labore? Lorem ipsum dolor, sit amet consectetur adipisicing elit.
//     A=
//     Eligendi, dignissimo
//   </p>
// </div>
// </div>
// <div className="mb-4">
// <div
//   ref={refs}
//   style={{
//     // transform: `translateX(-50%) scale(${scale})`,
//     transform: `translate3d(-50%, 0, 0) scale(${scale})`,
//     // transform: `translate3d(calc(50% - ${scale * 50}%), 0, 0) scale(${scale})`,
//     marginBottom: `${marginBot}px`,
//     width: `${215.9}mm`,
//     position: "relative",
//     boxSizing: "inherit",
//     transformOrigin: "center top",
//     left: "50%",
//     height: "279.4mm",
//     // box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
//     // box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
//     boxShadow:
//       " rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px", // simulate paper look
//     background: "white", // ensure paper is white,
//     transition: "transform 0.2s ease", //
//   }}
// >
//   <p className="p-9 text-gray-900">
//     Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad nobis
//     quod
//     exercitationem dolore, maxime debitis expedita veniam pariatur
//     quisquam quas in eveniet ipsa quam dignissimos. Tenetur debitis
//     saepe voluptates quam dolorum modi natus repudiandae asperiores,
//     animi ea nobis harum expedita, illum est ipsam. Non assumenda
//     praesentium molestias explicabo laborum exercitationem anim
//   </p>
// </div>
// </div>