import { useEffect } from "react";

export default function ConsoleSignature() {
  useEffect(() => {
    const showSignature = () => {
      console.log(
        "%c   █████╗ ██████╗ ██╗   ██╗",
        "color:#99f3ed; font-size: 16px; font-weight: bold;"
      );
      console.log(
        "%c  ██╔══██╗██╔══██╗╚██╗ ██╔╝",
        "color: #4ECDC4; font-size: 16px; font-weight: bold;"
      );
      console.log(
        "%c  ███████║██████╔╝ ╚████╔╝ ",
        "color: #45B7D1; font-size: 16px; font-weight: bold;"
      );
      console.log(
        "%c  ██╔══██║██╔══██╗  ╚██╔╝  ",
        "color: #96CEB4; font-size: 16px; font-weight: bold;"
      );
      console.log(
        "%c  ██║  ██║██║  ██║   ██║   ",
        "color: #FFEAA7; font-size: 16px; font-weight: bold;"
      );
      console.log(
        "%c  ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ",
        "color: #99f3ed; font-size: 16px; font-weight: bold;"
      );
      console.log("%c                              ", "font-size: 8px;");
      console.log(
        "%c📝 ThinkBoard App",
        "color: #2196F3; font-size: 18px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);"
      );
      console.log(
        "%c   Developed by Ali Ramazan Yildirim",
        "color: #666; font-size: 14px; font-style: italic;"
      );
      console.log(
        "%c🚀 Verwalten Sie Ihre Notizen ganz einfach!",
        "color: #4CAF50; font-size: 14px; font-weight: bold;"
      );
      console.log(
        "%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
        "color: #2196F3;"
      );
      console.log(
        "%c🎯 ThinkBoard | Created by ARY",
        "color: #FF6B35; font-size: 16px; font-weight: bold; background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); padding: 10px; border-radius: 5px;"
      );
      console.log(
        "%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
        "color: #2196F3;"
      );
    };

    showSignature();
  }, []);

  return null;
}
