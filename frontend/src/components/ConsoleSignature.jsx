import { useEffect } from "react";

export default function ConsoleSignature() {
  useEffect(() => {
    const showSignature = () => {
      const ascii = `
                  ÆÆÆÆÆÆÆÆÆÆÆÆÆÆ                                           
              ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ                                       
           ÆÆÆÆÆÆ                 ÆÆÆÆÆÆ                                    
         ÆÆÆÆ                         ÆÆÆÆ                                  
       ÆÆÆÆ                             ÆÆÆÆ                                
      ÆÆÆ                                 ÆÆÆÆ                              
    ÆÆÆÆ                                    ÆÆÆ                             
   ÆÆÆ                 ÆÆ                    ÆÆÆ                            
  ÆÆÆ  ÆÆÆ          ÆÆÆÆÆÆ                    ÆÆÆ                           
 ÆÆÆ ÆÆ Æ          ÆÆÆ  ÆÆ                     ÆÆÆ                          
 ÆÆÆ Æ  ÆÆ Æ      Æ ÆÆ ÆÆÆ                     ÆÆÆ                          
 ÆÆ Æ  ÆÆÆ Æ     ÆÆ ÆÆÆÆÆÆÆ ÆÆÆÆÆ ÆÆ  ÆÆ   ÆÆ ÆÆÆÆ                          
ÆÆÆÆÆÆÆÆÆÆÆÆ Æ   Æ ÆÆÆ  ÆÆÆÆÆÆ ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ                         
ÆÆÆÆÆ  Æ ÆÆ Æ     ÆÆÆÆ          Æ     ÆÆÆ        ÆÆ                         
ÆÆÆÆ   Æ            Æ ÆÆÆ             ÆÆÆ       ÆÆÆ                         
ÆÆÆ    Æ            Æ   ÆÆÆ          ÆÆ         ÆÆÆ                         
 ÆÆ    Æ            Æ                           ÆÆ                          
 ÆÆÆ                                           ÆÆÆ                          
 ÆÆÆ                                           ÆÆÆ                          
  ÆÆÆ                                         ÆÆÆ                           
   ÆÆÆ                                       ÆÆÆ                            
    ÆÆÆ                                     ÆÆÆ                             
     ÆÆ Æ                                 ÆÆÆÆ                              
       ÆÆÆ                              ÆÆÆÆÆ                               
            Æ                        Æ   ÆÆ                                 
           ÆÆ   Æ               ÆÆ   ÆÆ                                     
               ÆÆ    ÆÆÆ   Æ   ÆÆÆÆ                                         
                ÆÆ   ÆÆÆ   ÆÆ   Æ
      `;

      console.log(
        "%c " + ascii,
        "font-family: monospace; font-size: 8px; color: #1eb854; white-space: pre; line-height: 1.2;"
      );

      console.log(
        "%c📝 ThinkBoard App",
        "color: #1eb854; font-size: 18px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);"
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
        "%c🎯 ThinkBoard | Created by ARY",
        "color: #FF6B35; font-size: 16px; font-weight: bold; background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); padding: 10px; border-radius: 5px;"
      );
    };

    showSignature();
  }, []);

  return null;
}
