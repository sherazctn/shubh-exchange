const useColorScheme = (dashboardDarkTheme: boolean, colorScheme: string) => {
    // general
    let lineValue = dashboardDarkTheme ? "rgb(58, 58, 58)" : "rgb(235, 235, 235)";
    // color1
    let bgValue = dashboardDarkTheme ? "#0B1437" : "#f3f4f6";
    let darkValue = dashboardDarkTheme ? "#111C44" : "white";
    let lightValue = dashboardDarkTheme ? "#1B254B" : "rgb(232, 232, 252)";
    let textValue = dashboardDarkTheme ? "rgb(232, 232, 232)" : "rgb(61, 61, 158)";
    let subTextValue = dashboardDarkTheme ? "rgb(150, 150, 150)" : "black";
    // color2
    if(colorScheme === "color2"){
      bgValue = dashboardDarkTheme ? "rgb(61, 165, 104)" : "#f3f4f6";
      darkValue = dashboardDarkTheme ? "rgb(36, 96, 60)" : "white";
      lightValue = dashboardDarkTheme ? "rgb(13, 114, 54)" : "rgb(167, 249, 200)";
      textValue = dashboardDarkTheme ? "rgb(232, 232, 232)" : "rgb(36, 96, 60)";
      subTextValue = dashboardDarkTheme ? "rgb(200, 200, 200)" : "black";
    }
    return {
      normal: "rgb(148, 148, 219)",
      light: lightValue,
      dark: darkValue,
      bg: bgValue,
      text: textValue,
      line: lineValue,
      subText: subTextValue,
      color1: "rgb(232, 232, 252)",
      color2: "rgb(167, 249, 200)"
    };
  };
  
  export default useColorScheme;