import { useEffect, useState } from "react";

interface INums {
  radicand?: string;
  radix?: number;
}

const App = () => {
  const [nums, setNums] = useState<INums>({ radicand: "" });
  const [open, setOpen] = useState<Boolean>(false);
  const [negAlert, setNegAlert] = useState<Boolean>(false);
  const [digital, setDigital] = useState<String>();

  const updateRadicand = (event: { target: HTMLInputElement }): void => {
    setDigital("");
    const value = event.target.value;
    setNums({
      ...nums,
      radicand: value
    });
  };

  useEffect(() => {
    setDigital("");
  }, [nums]);

  useEffect(() => {
    if (negAlert) {
      const timer = setTimeout(() => {
        setNegAlert(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [negAlert]);

  const optionNumbers = (): JSX.Element[] => {
    let array = [];
    for (let i = 3; i < 17; i++) {
      array.push(
        <option
          className="options"
          style={{ borderRight: "1px solid black ", backgroundColor: "white" }}
          key={i}
          value={i}
          onClick={() => setNums({ ...nums, radix: i })}
        >
          {i}
        </option>
      );
    }
    return array;
  };

  const digitalRoot = (): void => {
    if (!nums?.radicand || !nums?.radix) {
      return;
    }
    if (nums.radicand.includes("-") || nums.radicand.includes(".")) {
      setNegAlert(true);
      setNums({ ...nums, radicand: "" });
    } else {
      let radi = Number(nums.radicand);
      let base = radi.toString(nums.radix);
      while (base.length > 1) {
        let sum = 0;
        for (let i = 0; i < base.length; i++) {
          let numVal = Number(base[i]);
          sum = sum + numVal;
        }
        base = sum.toString();
      }
      setDigital(base);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: "#7fc241"
        }}
      >
        <label style={{ marginTop: "10px", marginBottom: "10px" }}>
          Input any number, as the randicand:{" "}
        </label>
        {negAlert ? (
          <div
            style={{
              width: "200px",
              height: "40px",
              backgroundColor: "white",
              color: "red",
              fontSize: "12px"
            }}
          >
            <p style={{ marginTop: "2px", marginBottom: "2px" }}>
              {" "}
              The radicand
            </p>
            <p style={{ marginTop: "2px", marginBottom: "2px" }}>
              {" "}
              Must be a positive integer.
            </p>
          </div>
        ) : (
          <input
            type="number"
            value={nums?.radicand}
            name="radicand"
            onChange={updateRadicand}
            style={{ marginBottom: "15px", width: "50px" }}
          />
        )}

        <div
          onMouseEnter={() => {
            setOpen(true);
          }}
          onMouseLeave={() => {
            setOpen(false);
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            marginBottom: "15px"
          }}
        >
          <label style={{ marginBottom: "5px" }}>
            Select a radix:
            <span style={{ backgroundColor: "white" }}> {nums?.radix} </span>
          </label>
          <div style={{ display: "flex", backgroundColor: "white" }}>
            {open ? optionNumbers() : ""}
          </div>
        </div>
        <input
          type="submit"
          value="Submit"
          onClick={digitalRoot}
          style={{ marginBottom: "15px" }}
        />
        {digital ? (
          <div
            style={{
              marginTop: "15px",
              marginBottom: "15px",
              padding: "5%",
              backgroundColor: "#004300",
              color: "white"
            }}
          >
            The digital root is:
            <span> {digital} </span>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default App;
