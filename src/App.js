import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

// MUI
import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CloudIcon from "@mui/icons-material/Cloud";
import CircularProgress from "@mui/material/CircularProgress"; // Importing the loader
import { useSelector, useDispatch } from "react-redux";
import { fetchWeather } from "./weatherAPISlice";

// Libraries
import moment from "moment";
import "moment/min/locales";
import "./i18n";
import { useTranslation } from "react-i18next";

const theme = createTheme({
  typography: { fontFamily: ["IBM"] },
});

function App() {
  // Redux
  const dispatch = useDispatch();
  const result = useSelector((state) => state.weather.weather);
  const isLoading = useSelector((state) => state.weather.status === "loading");

  const [dateAndTime, setDateAndTime] = useState("");
  const [locale, setLocale] = useState("ar");

  const { t, i18n } = useTranslation();

  moment.locale("ar");

  useEffect(() => {
    setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
  }, []);

  useEffect(() => {
    console.log("dispatching fetch weather function");
    dispatch(fetchWeather());
  }, [dispatch]);

  // handlers
  function handleLanguageClick() {
    if (locale === "ar") {
      setLocale("en");
      moment.locale("en");
      i18n.changeLanguage("en");
    } else if (locale === "en") {
      setLocale("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    }
    setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
  }

  return (
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
              direction: locale === "ar" ? "rtl" : "ltr",
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
                  alignItems: "end",
                  justifyContent: "start",
                }}
              >
                <Typography variant="h1" style={{ marginRight: "20px" }}>
                  {t("Riyadh")}
                </Typography>
                <Typography variant="h5" style={{ marginRight: "20px" }}>
                  {dateAndTime}
                </Typography>
              </div>
              <hr />

              {/* degree and description */}
              {/* container of description and icon */}
              {isLoading ? (
                <CircularProgress style={{ color: "white" }} /> // Show loader if loading
              ) : (
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
                        {result.num || "--"}
                      </Typography>
                    </div>
                    <Typography variant="h5">
                      {result.description || "--"}
                    </Typography>
                    {/* MIN & MAX */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h5>
                        {t("min")}:{result.min || "--"}
                      </h5>
                      <h5>
                        {t("max")}:{result.max || "--"}
                      </h5>
                    </div>
                  </div>
                  <CloudIcon style={{ color: "white", fontSize: "200px" }} />
                </div>
              )}
            </div>
          </div>
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
              {locale === "en" ? "Arabic" : "الإنجليزية"}
            </Button>
          </div>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default App;
