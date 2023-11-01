import { useEffect, useState } from "react"
import * as Font from "expo-font"

const useFonts = () => {
  const [appLoading, setAppLoading] = useState(true)
  
  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          normal: require("../../assets/fonts/OpenSans-Regular.ttf"),
          medium: require("../../assets/fonts/OpenSans-Medium.ttf"),
          bold: require("../../assets/fonts/OpenSans-Bold.ttf"),
          extraBold: require("../../assets/fonts/OpenSans-ExtraBold.ttf"),
          italic: require("../../assets/fonts/OpenSans-Italic.ttf"),
          italicBold: require("../../assets/fonts/OpenSans-BoldItalic.ttf"),
        })
      } catch (e) {
        console.warn(e)
      } finally {
        setAppLoading(false)
      }
    }
    loadFonts()
  }, [])
  
  return appLoading;
}

export default useFonts