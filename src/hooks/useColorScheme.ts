const useColorScheme = (dashboardDarkTheme: boolean, colorScheme: string) => {
    let bgValue = dashboardDarkTheme ? "#0B1437" : "#f3f4f6";
    let darkValue = dashboardDarkTheme ? "#111C44" : "white";
    let lightValue = dashboardDarkTheme ? "#1B254B" : "rgb(232, 232, 252)";
    let textValue = dashboardDarkTheme ? "rgb(232, 232, 232)" : "rgb(61, 61, 158)";
    if(colorScheme === "color2"){
      bgValue = dashboardDarkTheme ? "rgb(61, 165, 104)" : "#f3f4f6";
      darkValue = dashboardDarkTheme ? "rgb(36, 96, 60)" : "white";
      lightValue = dashboardDarkTheme ? "rgb(13, 114, 54)" : "rgb(167, 249, 200)";
      textValue = dashboardDarkTheme ? "rgb(232, 232, 232)" : "rgb(36, 96, 60)";
    }
    return {
      normal: "rgb(148, 148, 219)",
      light: lightValue,
      dark: darkValue,
      bg: bgValue,
      text: textValue,
      color1: "rgb(232, 232, 252)",
      color2: "rgb(167, 249, 200)"
    };
  };
  
  export default useColorScheme;