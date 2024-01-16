'use effect'
import { useEffect, useState } from "react";

const App = () => {
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [workSecond, setWorkSecond] = useState(1500);
  const [breakSecond, setBreakSecond] = useState(300);
  const [type, setType] = useState("work");
  const [resetFlag, setResetFlag] = useState(true);
  const [flag, setFlag] = useState();

  useEffect(() => {
    if (flag && type === "work") {
      if (workSecond > 0) {
        const timer = setTimeout(() => setWorkSecond(workSecond - 1), 1000);
        return () => clearTimeout(timer);
      }
      if (workSecond === 0) {
        alert("Work duration is over");
        setType("break");
        setWorkSecond(workDuration * 60);
      }
    }
    if (flag && type === "break") {
      if (breakSecond > 0) {
        const timer = setTimeout(() => setBreakSecond(breakSecond - 1), 1000);
        return () => clearTimeout(timer);
      }
      if (breakSecond === 0) {
        alert("Break duration is over");
        setType("work");
        setBreakSecond(breakDuration * 60);
      }
    }
  }, [workSecond, breakSecond, breakDuration, workDuration, type, flag]);

  const convertToStandardFormat = (sec) => {
    let m = parseInt(sec / 60).toString();
    let s = parseInt(sec % 60).toString();
    if (m.length === 1) m = "0" + m;
    if (s.length === 1) s = "0" + s;
    return m + ":" + s;
  };

  const validateData = (data) => {
    if (!isNaN(data) && parseInt(data) >= 0) {
      return parseInt(data);
    } else {
      return "";
    }
  };

  const reset = () => {
    setResetFlag(true);
    setFlag(false);
    setType("work");
    setWorkDuration(25);
    setBreakDuration(5);
    setBreakSecond(300);
    setWorkSecond(1500);
  };

  const setDuration = (e) => {
    e.preventDefault();
    setResetFlag(false);
    setType("work");
    setWorkSecond(workDuration * 60);
    setBreakSecond(breakDuration * 60);
  };

  return (
    <div id="main" style={{ textAlign: "center" }}>
      <div className="clock">
        <h1>{type === "work" ? convertToStandardFormat(workSecond) : convertToStandardFormat(breakSecond)}</h1>
        <h3>{type === "work" ? "Work" : "Break"}-Time</h3>
      </div>
      <div>
        <button data-testid="start-btn" onClick={() => { setFlag(true); setResetFlag(false) }} disabled={flag}>
          Start
        </button>
        <button data-testid="stop-btn" onClick={() => { setFlag(false); setResetFlag(false) }} disabled={!flag}>
          Stop
        </button>
        <button data-testid="reset-btn" onClick={() => { reset() }} disabled={resetFlag}>
          Reset
        </button>
      </div>
      <div>
        <form onSubmit={setDuration}>
          <input
            type="number"
            data-testid="work-duration"
            placeholder="Work duration"
            required
            value={workDuration}
            disabled={flag}
            onChange={(e) => setWorkDuration(validateData(e.target.value))}
          />
          <input
            type="number"
            data-testid="break-duration"
            placeholder="Break duration"
            required
            value={breakDuration}
            disabled={flag}
            onChange={(e) => {
              setBreakDuration(validateData(e.target.value));
            }}
          />
          <button data-testid="set-btn" disabled={flag}>
            Set
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
