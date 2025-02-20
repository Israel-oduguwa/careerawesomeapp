// import React, {
//   useEffect,
//   useCallback,
//   useMemo,
//   useRef,
//   useState,
// } from "react";

// function usePrevious(value: any) {
//   const ref = useRef();

//   useEffect(() => {
//     ref.current = value;
//   });
//   return ref.current;
// }

// function ResumePreview() {
//   const refs: any = useRef();
//   const ref2: any = useRef();

//   const paperWidth = 250;
//   const [scale, setScale] = useState(0.3); //0 before
//   const [marginBot, setMarginBot] = useState(1);
//   const [zoomInProgress, setZoomInProgress] = useState(false);
//   const [originalScale, setOriginalScale] = useState(scale);
//   const [zoomPercent, setZoomPercent]: any = useState(100);

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
//         setOriginalScale(scaled);
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
//         setOriginalScale(scaled);
//         setMarginBot(0);
//         // props.onInputResume(1, "resumeData.EditPageStates.resumePreviewScale");
//         // props.onInputResume(0, "resumeData.EditPageStates.resumeMarginBottom");
//       }
//     }
//   };
//   useEffect(() => {
//     setScaleFunction();
//     setZoomPercent("100");
//   }, [paperWidth]);

//   const zoomIn = () => {
//     setZoomInProgress(true);
//     setScale((prevScale) => {
//       const newScale = Math.min(prevScale + 0.1, 3.0); // Limit zoom to 300%
//       const marginBottom =
//         newScale * refs.current.clientHeight - refs.current.clientHeight;
//       setMarginBot(marginBottom);
//       setZoomPercent(Math.round(newScale * 100)); // update zoom percent
//       return newScale;
//     });
//     // setTimeout(() => setZoomInProgress(false), 500); // Reset zoomInProgress after 500ms
//   };

//   const zoomOut = () => {
//     setZoomInProgress(true);
//     setScale((prevScale) => {
//       const newScale = Math.max(prevScale - 0.1, 0.1); // Limit zoom to 10%
//       const marginBottom =
//         newScale * refs.current.clientHeight - refs.current.clientHeight;
//       setMarginBot(marginBottom);
//       setZoomPercent(Math.round(newScale * 100)); // update zoom percent
//       return newScale;
//     });
//   };

//   const handleZoomGesture = (event: any) => {
//     if (!event.ctrlKey) return;
//     event.preventDefault(); // Prevent default action only when pinch-to-zoom is detected
//     setZoomInProgress(true);

//     const delta = event.deltaY;
//     if (delta < 0) {
//       // Zoom in
//       setScale((prevScale) => {
//         const newScale = Math.min(prevScale + 0.03, 2.0); // Decrease zoom step to 0.05 for a slower zoom
//         setZoomPercent(Math.round(newScale * 100)); // update zoom percent
//         return newScale;
//       });
//     } else {
//       // Zoom out
//       setScale((prevScale) => {
//         const newScale = Math.max(prevScale - 0.03, 0.3); // Decrease zoom step to 0.05 for a slower zoom
//         setZoomPercent(Math.round(newScale * 100)); // update zoom percent
//         return newScale;
//       });
//     }
//     setTimeout(() => setZoomInProgress(false), 500); // Reset zoomInProgress after 500ms
//   };

//   return (
//     <div id="resume-container">
//       <div
//         // onWheel={handleZoomGesture}
//         ref={ref2}
//         style={{
//           margin: "10px 10px 10px 10px",
//           resize: "both",
//           position: "relative",
//           height: `${refs.current?.clientHeight + marginBot}px`,
//           // overflow: 'scroll'// allow the user to scroll when zoomed in
//         }}
//         className="bar"
//       >
//         <div className="mb-4">
//           <div
//             ref={refs}
//             style={{
//               // transform: `translateX(-50%) scale(${scale})`,
//               transform: `translate3d(-50%, 0, 0) scale(${scale})`,
//               // transform: `translate3d(calc(50% - ${scale * 50}%), 0, 0) scale(${scale})`,
//               marginBottom: `${marginBot}px`,
//               width: `${215.9}mm`,
//               position: "relative",
//               boxSizing: "inherit",
//               transformOrigin: scale <= 1 ? "center" : "top left",
//               left: "50%",
//               height: "279.4mm",
//               // box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
//               // box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
//               boxShadow:
//                 " rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px", // simulate paper look
//               background: "white", // ensure paper is white,
//               transition: "transform 0.2s ease", //
//             }}
//           >
//             <p className="p-9 text-gray-900">
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad nobis
//               beatae temporibus tenetur, cumque nemo dicta maiores quam quisquam
//               labore? Lorem ipsum dolor, sit amet consectetur adipisicing elit.
//               Adipisci, velit! Lorem ipsum dolor sit amet consectetur
//               adipisicing elit. Obcaecati velit consequuntur ab id laboriosam
//               eligendi consectetur magnam aspernatur porro vero, corporis
//               quaerat delectus sunt beatae exercitationem molestias vitae
//               temporibus quo? Explicabo error quis aliquid? A blanditiis ipsam
//               officia ullam autem vero non aut, hic ratione, expedita quis
//               libero sapiente facilis? Rem, ut exercitationem eligendi hic earum
//               sequi nam iusto nulla, quaerat voluptates fugit praesentium porro
//               veritatis corporis ad expedita mollitia cumque. Iure doloremque
//               ipsam, tempore, cupiditate est debitis illum labore perferendis
//               quibusdam ullam dolorem! Corrupti laborum reprehenderit
//               praesentium maiores. Animi quod distinctio, sunt laborum facilis
//               corporis laudantium repudiandae earum perferendis quas? Repellat
//               temporibus iste, ea facilis, quis ratione expedita est modi qui
//               quasi blanditiis quos autem dolor eos. Ex ipsam fuga fugiat veniam
//               recusandae voluptatum quos similique reprehenderit molestiae
//               beatae architecto, adipisci ipsum necessitatibus quam, doloribus
//               earum voluptates deserunt assumenda facilis. Doloremque itaque
//               dolor saepe iure at iusto dolorum explicabo dicta voluptatem quod
//               exercitationem dolore, maxime debitis expedita veniam pariatur
//               quisquam quas in eveniet ipsa quam dignissimos. Tenetur debitis
//               saepe voluptates quam dolorum modi natus repudiandae asperiores,
//               animi ea nobis harum expedita, illum est ipsam. Non assumenda
//               praesentium molestias explicabo laborum exercitationem animi eos
//               sed iste iusto earum voluptatem corporis architecto, sunt harum
//               nobis rerum. Possimus veritatis nisi ad quam dolorum, qui sit
//               porro voluptatum! Molestiae dolore harum minus modi aspernatur!
//               Tenetur quidem, consequuntur nulla perspiciatis alias incidunt ab
//               sed aut dicta quos asperiores, repellat voluptate reiciendis.
//               Eligendi, dignissimos atque dolorum similique commodi enim porro
//               cumque repellat animi dolore debitis laborum, consequuntur
//               corrupti saepe et. Vel magnam adipisci magni nihil nostrum!
//               Suscipit, facilis sed. Facere, saepe veritatis harum placeat
//               repudiandae temporibus tempora vero aut consequatur error in quis.
//               Distinctio maxime laborum sed corrupti repellat ut dolorum quam
//               odit. Veniam nesciunt quod esse voluptas odio. Natus corporis
//               autem aut iste, incidunt maxime laudantium laboriosam accusantium
//               fugiat sint enim veniam explicabo dolorum odit! Ut libero adipisci
//               voluptatibus animi sint, repudiandae tempora voluptate cumque
//               tempore saepe consequuntur nemo nisi! In temporibus omnis dolorem
//               voluptatibus, blanditiis deserunt quae voluptate. Quod enim rerum
//               minima dolorem aliquid ut nam deserunt, quam facere
//               necessitatibus! Corrupti commodi illo facilis. Fuga error hic
//               dolore facere, assumenda atque itaque qui. Rem excepturi dolor nam
//               id explicabo ab sapiente. Aut nobis soluta inventore nihil quia
//               autem non vero illo minus reiciendis. Saepe, veritatis? Nostrum ad
//               aliquam qui, rerum modi dicta accusamus, quia animi est magni
//               maxime nihil alias aspernatur! Odio dolore numquam, maiores quos
//               veniam voluptate in distinctio sunt saepe voluptas non mollitia!
//               Numquam reiciendis soluta modi a nulla, quibusdam dolor facere
//               facilis rerum minus, repudiandae praesentium optio est laudantium
//               labore, corrupti temporibus sint? Quibusdam commodi minus
//               similique ipsum maiores, ullam distinctio sequi ratione. Iure non
//               unde voluptas dignissimos. Eius quidem quibusdam facere dolore
//               porro, possimus veniam voluptates aperiam error soluta eligendi
//               mollitia iure magnam hic consequuntur omnis.
//             </p>
//           </div>
//         </div>
//         <div className="mb-4">
//           <div
//             ref={refs}
//             style={{
//               // transform: `translateX(-50%) scale(${scale})`,
//               transform: `translate3d(-50%, 0, 0) scale(${scale})`,
//               // transform: `translate3d(calc(50% - ${scale * 50}%), 0, 0) scale(${scale})`,
//               marginBottom: `${marginBot}px`,
//               width: `${215.9}mm`,
//               position: "relative",
//               boxSizing: "inherit",
//               transformOrigin: scale <= 1 ? "center" : "top left",
//               left: "50%",
//               height: "279.4mm",
//               // box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
//               // box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
//               boxShadow:
//                 " rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px", // simulate paper look
//               background: "white", // ensure paper is white,
//               transition: "transform 0.2s ease", //
//             }}
//           >
//             <p className="p-9 text-gray-900">
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad nobis
//               beatae temporibus tenetur, cumque nemo dicta maiores quam quisquam
//               labore? Lorem ipsum dolor, sit amet consectetur adipisicing elit.
//               Adipisci, velit! Lorem ipsum dolor sit amet consectetur
//               adipisicing elit. Obcaecati velit consequuntur ab id laboriosam
//               eligendi consectetur magnam aspernatur porro vero, corporis
//               quaerat delectus sunt beatae exercitationem molestias vitae
//               temporibus quo? Explicabo error quis aliquid? A blanditiis ipsam
//               officia ullam autem vero non aut, hic ratione, expedita quis
//               libero sapiente facilis? Rem, ut exercitationem eligendi hic earum
//               sequi nam iusto nulla, quaerat voluptates fugit praesentium porro
//               veritatis corporis ad expedita mollitia cumque. Iure doloremque
//               ipsam, tempore, cupiditate est debitis illum labore perferendis
//               quibusdam ullam dolorem! Corrupti laborum reprehenderit
//               praesentium maiores. Animi quod distinctio, sunt laborum facilis
//               corporis laudantium repudiandae earum perferendis quas? Repellat
//               temporibus iste, ea facilis, quis ratione expedita est modi qui
//               quasi blanditiis quos autem dolor eos. Ex ipsam fuga fugiat veniam
//               recusandae voluptatum quos similique reprehenderit molestiae
//               beatae architecto, adipisci ipsum necessitatibus quam, doloribus
//               earum voluptates deserunt assumenda facilis. Doloremque itaque
//               dolor saepe iure at iusto dolorum explicabo dicta voluptatem quod
//               exercitationem dolore, maxime debitis expedita veniam pariatur
//               quisquam quas in eveniet ipsa quam dignissimos. Tenetur debitis
//               saepe voluptates quam dolorum modi natus repudiandae asperiores,
//               animi ea nobis harum expedita, illum est ipsam. Non assumenda
//               praesentium molestias explicabo laborum exercitationem animi eos
//               sed iste iusto earum voluptatem corporis architecto, sunt harum
//               nobis rerum. Possimus veritatis nisi ad quam dolorum, qui sit
//               porro voluptatum! Molestiae dolore harum minus modi aspernatur!
//               Tenetur quidem, consequuntur nulla perspiciatis alias incidunt ab
//               sed aut dicta quos asperiores, repellat voluptate reiciendis.
//               Eligendi, dignissimos atque dolorum similique commodi enim porro
//               cumque repellat animi dolore debitis laborum, consequuntur
//               corrupti saepe et. Vel magnam adipisci magni nihil nostrum!
//               Suscipit, facilis sed. Facere, saepe veritatis harum placeat
//               repudiandae temporibus tempora vero aut consequatur error in quis.
//               Distinctio maxime laborum sed corrupti repellat ut dolorum quam
//               odit. Veniam nesciunt quod esse voluptas odio. Natus corporis
//               autem aut iste, incidunt maxime laudantium laboriosam accusantium
//               fugiat sint enim veniam explicabo dolorum odit! Ut libero adipisci
//               voluptatibus animi sint, repudiandae tempora voluptate cumque
//               tempore saepe consequuntur nemo nisi! In temporibus omnis dolorem
//               tempora voluptates unde aliquid praesentium magnam nulla
//               perferendis, necessitatibus, deserunt explicabo error commodi
//               quasi quas iusto. Alias nobis excepturi culpa, impedit eligendi
//               nam nostrum eaque blanditiis accusamus esse asperiores minus ut
//               aliquam, repudiandae laborum maiores! Repudiandae eos minus
//               inventore sint porro ea, hic animi, consequatur labore atque
//               sapiente alias vel aliquam qui voluptatibus, blanditiis deserunt
//               quae voluptate. Quod enim rerum minima dolorem aliquid ut nam
//               deserunt, quam facere necessitatibus! Corrupti commodi illo
//               facilis. Fuga error hic dolore facere, assumenda atque itaque qui.
//               Rem excepturi dolor nam id explicabo ab sapiente. Aut nobis soluta
//               inventore nihil quia autem non vero illo minus reiciendis. Saepe,
//               veritatis? Nostrum ad aliquam qui, rerum modi dicta accusamus,
//               quia animi est magni maxime nihil alias aspernatur! Odio dolore
//               numquam, maiores quos veniam voluptate in distinctio sunt saepe
//               voluptas non mollitia! Numquam reiciendis soluta modi a nulla,
//               quibusdam dolor facere facilis rerum minus, repudiandae
//               praesentium optio est laudantium labore, corrupti temporibus sint?
//               Quibusdam commodi minus similique ipsum maiores, ullam distinctio
//               sequi ratione. Iure non unde voluptas dignissimos. Eius quidem
//               quibusdam facere dolore porro, possimus veniam voluptates aperiam
//               error soluta eligendi mollitia iure magnam hic consequuntur omnis.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ResumePreview;


import React, {
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import Resume from "./Resume";
import Basic from "./Templates/Basic";

function usePrevious(value: any) {
  const ref = useRef(undefined);

  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function ResumePreview() {
  const containerRef:any = useRef(undefined);
  // console.log(containerRef.current)
  return (
    <div id="resume-container">
      <div
        ref={containerRef}
        style={{
          margin: "10px 10px 10px 10px",
          resize: "both",
          position: "relative",
          // height: `${refs.current?.clientHeight + marginBot}px`,
        }}
        className="bar"
      >
          <Basic containerRef={containerRef}  />
      </div>
    </div>
  );
}

export default ResumePreview;
