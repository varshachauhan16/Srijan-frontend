// import React, { useEffect, useRef, useState } from "react";
// import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
// import PauseBreakPopup, { SelectedBreaksReport } from "./PauseBreakPopup";
// import { IoArrowRedoOutline } from "react-icons/io5";
// import { FaRegCirclePlay } from "react-icons/fa6";
// import styles from "./Pause.module.css";
// import axios from "axios";
// import Prefix from "../../../config/ApiPrefix";
// import SecureStorage from "../../../config/SecureStorage";
// import { useDispatch } from "react-redux";
// import snackBarUpdate from "../../../actions/snackBarActions";

// const PauseBreakBtn = ({ width }) => {
//   const dispatch = useDispatch();
//   const debounceRef = useRef(null);

//   const [selectedBreaks, setSelectedBreaks] = useState<
//     { break_type: string; allowed_time: number; duration_minutes: number }[]
//   >([]);
//   const [timeLeft, setTimeLeft] = useState<number>(0);
//   const [dangerMode, setDangerMode] = useState<boolean>(false);
//   const [openPausePopup, setOpenPausePopup] = useState<boolean>();
//   const [openBreakReport, setOpenBreakReport] = useState<boolean>(false);
//   const [totalBreakTime, setTotalBreakTime] = useState<number>(0);
//   const [breakStartTime, setBreakStartTime] = useState<number | null>(null);
//   const [breakClicked, setBreakClicked] = useState<boolean>(false);
//   const [breakOptions, setBreakOptions] = useState<
//     { break_type: string; allowed_time: number }[]
//   >([]);
//   const [lastBreakEnd, setLastBreakEnd] = useState<boolean>(false);
//   const [systemBreakData, setSysBreakData] = useState<{
//     break_type: string;
//     allowed_time: string;
//   } | null>(null);

//   const popupHeading =
//     openPausePopup && !breakClicked && lastBreakEnd
//       ? "Select One"
//       : dangerMode || !lastBreakEnd ? "Ohh Time's Up! Please take action immediately." : null;

//   useEffect(() => {
//     let timer: NodeJS.Timeout | null = null;

//     if (timeLeft > 0) {
//       timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
//     } else if (timeLeft === 0) {
//       if (!lastBreakEnd || breakClicked) {
//         setDangerMode(true);
//       } else {
//         setDangerMode(false);
//       }
//     }

//     return () => {
//       if (timer) clearTimeout(timer);
//     };
//   }, [timeLeft, breakClicked, lastBreakEnd]);

//   // Auto Api Hitting for System Break
//   // useEffect(() => {
//   //   if (!systemBreakData?.allowed_time) return;

//   //   let inactivityTimeout: NodeJS.Timeout;

//   //   // Convert "hh:mm:ss" → milliseconds
//   //   const parseTimeToMs = (timeStr: string) => {
//   //     const [hh, mm, ss] = timeStr.split(':').map(Number);
//   //     return ((hh * 60 * 60) + (mm * 60) + ss) * 1000;
//   //   };

//   //   const handleInactivity = () => {
//   //     handleBreakSelect({
//   //       break_type: systemBreakData.break_type,
//   //       allowed_time: null,
//   //     });

//   //     setDangerMode(true);
//   //     setOpenPausePopup(true);
//   //   };

//   //   const resetTimer = () => {
//   //     clearTimeout(inactivityTimeout);
//   //     const timeoutMs = parseTimeToMs(systemBreakData.allowed_time);
//   //     inactivityTimeout = setTimeout(handleInactivity, timeoutMs);
//   //   };

//   //   const activityEvents = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'];
//   //   activityEvents.forEach((event) => {
//   //     window.addEventListener(event, resetTimer);
//   //   });

//   //   resetTimer();

//   //   return () => {
//   //     activityEvents.forEach((event) => {
//   //       window.removeEventListener(event, resetTimer);
//   //     });
//   //     clearTimeout(inactivityTimeout);
//   //   };
//   // }, [systemBreakData]);

//   const fetchPauseData = () => {
//     axios.get(`${Prefix.api}/panel/pause-break/`, {
//       headers: {
//         Authorization: `Token ${SecureStorage.getItem("token")}`,
//       },
//     })
//       .then((response) => {
//         const data = response?.data;
//         setBreakOptions(data?.break_policies || []);
//         setSelectedBreaks(data?.breaks || []);
//         setTotalBreakTime(data?.today_break_used || 0);

//         const breakStart = data?.break_start;
//         const breakEnd = data?.break_end;

//         // Check if break is ongoing
//         const isBreakOngoing = breakStart && ((!breakEnd || breakEnd === null || breakEnd === ""));
//         setLastBreakEnd(!isBreakOngoing);

//         if (isBreakOngoing) {
//           setOpenPausePopup(true);
//         } else {
//           setOpenPausePopup(false);
//         }

//         // ✅ Filter for System Break data and store it
//         const systemBreak = (data?.break_policies || []).find(
//           (item: any) => item.break_type === "System Break"
//         );

//         if (systemBreak) {
//           setSysBreakData(systemBreak);
//         } else {
//           setSysBreakData(null);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   };

//   useEffect(() => {
//     clearTimeout(debounceRef.current);

//     debounceRef.current = setTimeout(() => {
//       fetchPauseData()
//     }, 800);
//     return () => clearTimeout(debounceRef.current);
//   }, []);

//   const handlePauseClick = () => {
//     setOpenPausePopup(true);
//   };

//   const formatedTime = (input: string | number): number => {
//     const timeString = typeof input === "string" ? input : String(input);
//     const timeParts = timeString.split(":");
//     if (timeParts.length !== 3) {
//       console.error("Invalid time format. Expected hh:mm:ss");
//       return 0;
//     }

//     const [hours, minutes, seconds] = timeParts.map((part) =>
//       parseInt(part, 10)
//     );
//     if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
//       console.error("Invalid numeric values in time format.");
//       return 0;
//     }

//     const totalMinutes = hours * 60 + minutes + Math.floor(seconds / 60);
//     return totalMinutes;
//   };

//   const handleBreakSelect = (option: {
//     break_type: string;
//     allowed_time: number;
//   }) => {
//     if (breakClicked) return; // prevent multiple selections

//     setBreakClicked(true);
//     setSelectedBreaks((prev) => [
//       ...prev,
//       {
//         break_type: option.break_type,
//         allowed_time: option.allowed_time,
//         duration_minutes: 0,
//       },
//     ]);

//     setBreakStartTime(Date.now());
//     setTimeLeft(formatedTime(option.allowed_time) * 60); // Convert break_type allowed_time minutes to seconds
//     const payload = {
//       break_type: option.break_type.toLowerCase().split(" ")[0],
//     };

//     AXIOS.post(`${Prefix.api}/panel/start-break/`, payload, {
//       headers: {
//         Authorization: `Token ${SecureStorage.getItem("token")}`,
//       },
//     })
//       .then((response) => {
//         dispatch(snackBarUpdate({
//           payload: {
//             message: response?.data?.message || `${option.break_type} started`,
//             status: true,
//             type: "success",
//           },
//         }));
//       })
//       .catch((error) => {
//         console.error("Error starting break:", error);
//       });
//   };

//   const handleCloseBreak = () => {
//     if (!selectedBreaks.length) {
//       console.warn("No breaks available to close");
//       return;
//     }

//     const payload = {
//       // break_type: firstWordOftheBreak,
//       // start_time: startTime,
//       // end_time: endTime,
//     };

//     AXIOS.post(`${Prefix.api}/panel/pause-break/`, payload, {
//       headers: {
//         Authorization: `Token ${SecureStorage.getItem("token")}`,
//       },
//     })
//       .then((response) => {
//         return AXIOS.get(`${Prefix.api}/panel/pause-break/`, {
//           headers: {
//             Authorization: `Token ${SecureStorage.getItem("token")}`,
//           },
//         });
//       })
//       .then((response) => {
//         const data = response.data;
//         setSelectedBreaks(data?.breaks || []);
//         setTotalBreakTime(data?.total_break_used || 0);
//       })
//       .catch((error) => {
//         console.error("Error in API call:", error);
//       });

//     setTimeLeft(0);
//     setDangerMode(false);
//     setBreakStartTime(null);
//     setOpenPausePopup(false);
//     setBreakClicked(false);
//   };

//   const handleBreakReport = () => {
//     setOpenBreakReport(true);
//   };

//   return (
//     <div className={styles.container}>
//       <button
//         className={styles.btn}
//         onClick={handlePauseClick}
//         style={{
//           backgroundColor: breakClicked || dangerMode ? "red" : "#25d366",
//           width: `${width}`,
//         }}
//       >
//         {breakClicked ? <FaRegCirclePlay /> : !dangerMode ? <PauseCircleFilledIcon /> : <FaRegCirclePlay />}
//         {breakClicked ? "Paused" : !dangerMode ? "Pause" : "Paused"}
//       </button>
//       <PauseBreakPopup
//         heading={popupHeading}
//         openPausePopup={openPausePopup}
//         breakClicked={breakClicked}
//         selectedBreaks={selectedBreaks}
//         timeLeft={timeLeft}
//         dangerMode={dangerMode}
//         breakOptions={breakOptions}
//         handleCloseBreak={handleCloseBreak}
//         handleBreakSelect={handleBreakSelect}
//         formatedTime={formatedTime}
//         lastBreakEnd={lastBreakEnd}
//       />
//       {selectedBreaks?.length > 0 && (
//         <button
//           className={styles.btn}
//           onClick={handleBreakReport}
//           style={{
//             backgroundColor: openBreakReport ? "#25d366" : "#8f4c8b",
//             width: `${width}`,
//           }}
//         >
//           All Break Report
//           <IoArrowRedoOutline />
//         </button>
//       )}
//       <SelectedBreaksReport
//         openBreakReport={openBreakReport}
//         setOpenBreakReport={setOpenBreakReport}
//         selectedBreaks={selectedBreaks}
//         totalBreakTime={totalBreakTime}
//       />
//     </div>
//   );
// };

// export default PauseBreakBtn;