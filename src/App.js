import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

//MUI
import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CloudIcon from "@mui/icons-material/Cloud";

// Libraries
import axios from "axios";
import moment from "moment";
import "moment/min/locales";
import "./i18n";
import { useTranslation } from "react-i18next";

const theme = createTheme({
  typography: { fontFamily: ["IBM"] },
});

function App() {
  const [temp, setTemp] = useState({
    num: null,
    description: "",
    min: null,
    max: null,
  });

  const [dateAndTime, setDateAndTime] = useState("");
  const [locale, setLocale] = useState("ar");

  const { t, i18n } = useTranslation();

  let cancelAxios;
  moment.locale("ar");
  useEffect(() => {
    setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/24.774265,46.738586?key=DHE4WQ4E88HXMKH9YKTT4FT7E",
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        }
      )
      .then(function (response) {
        // handle success

        // const responseTemp = Math.round(
        //   (response.data.currentConditions.temp - 32) / 1.8
        // );

        // const responseDescription ;
        setTemp({
          num: response.data.currentConditions.temp,
          description: response.data.description,
          min: response.data.days[0].tempmin,
          max: response.data.days[0].tempmax,
        });
        console.log(response.data.currentConditions.temp);
        console.log(response.data.description);
        console.log(response.data.days[0].tempmin);
        console.log(response.data.days[0].tempmax);
        console.log(response.data.currentConditions.icon);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
    return () => {
      cancelAxios();
    };
  }, []);

  // handlers
  function handleLanguageClick() {
    if (locale == "ar") {
      setLocale("en");
      moment.locale("en");
      i18n.changeLanguage("en");
    } else if (locale == "en") {
      setLocale("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    }

    setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm" style={{ textAlign: "center" }}>
          {/* CONTENT CONTAINER */}
          <div
            style={{
              height: "100vh",

              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* CARD */}
            <div
              style={{
                backgroundColor: "rgba(28, 52, 91, 0.36)",
                color: "white",
                padding: "10px",
                borderRadius: "15px",
                boxShadow: "0 11px 1px rgb(0, 0, 0, 0.05)",
                width: "100%",
                direction: locale == "ar" ? "rtl" : "ltr",
              }}
            >
              {/* content */}
              <div>
                {/* city and time */}
                <div
                  style={{
                    display: "flex",
                    boxShadow: "0 11px 1px rgb(0, 0, 0, 0.05)",
                    width: "100%",
                    direction: locale == "ar" ? "rtl" : "ltr",
                    alignItems: "end",
                    justifyContent: "starts",
                  }}
                >
                  <Typography variant="h1" style={{ marginRight: "20px" }}>
                    {t("Riyadh")}
                  </Typography>
                  <Typography variant="h5" style={{ marginRight: "20px" }}>
                    {dateAndTime}
                  </Typography>
                </div>
                {/*===== city and time */}
                <hr />

                {/* degree and description */}
                {/* container of describtion and icon */}
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <div>
                    {/* TEMP */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="h1" style={{ textAlign: "right" }}>
                        {temp.num}
                      </Typography>

                      {/* <img src={}> */}
                    </div>

                    {/* ===TEMP */}

                    <Typography variant="h5"> {temp.description}</Typography>

                    {/* MIN & MAX */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <h5>
                        {t("min")}:{temp.min}
                      </h5>
                      <h5>
                        {" "}
                        {t("max")}:{temp.max}
                      </h5>
                    </div>

                    {/*==== MIN & MAX */}
                  </div>
                  {/* ==== degree and description */}

                  <CloudIcon
                    style={{ color: "white", fontSize: "200px" }}
                  ></CloudIcon>
                </div>
                {/* ===container of describtion and icon */}
              </div>
              {/* ====content */}
            </div>
            {/*==== CARD */}
            {/* translation */}
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                width: "100%",
              }}
            >
              <Button
                variant="text"
                style={{ color: "white" }}
                onClick={handleLanguageClick}
              >
                {locale == "en" ? "Arabic" : "الإنجليزية"}
              </Button>
            </div>
            {/* ===translation */}
          </div>

          {/* ===CONTENT CONTAINER */}
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
