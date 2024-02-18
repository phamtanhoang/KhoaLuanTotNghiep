import { useRef, useState } from "react";
import { CaptchaConstants } from "@/utils/constants/captchaConstants";

const useCaptchaGenerator = () => {
  const [captchaText, setCaptchaText] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const generateRandomChar = (min: number, max: number): string =>
    String.fromCharCode(Math.floor(Math.random() * (max - min + 1) + min));

  const generateCaptchaText = (): string => {
    let captcha = "";
    for (let i = 0; i < CaptchaConstants.DEFAULTS.lengthCaptcha; i++) {
      const randomRange =
        CaptchaConstants.ASCIIS[
          Math.floor(Math.random() * CaptchaConstants.ASCIIS.length)
        ];
      captcha += generateRandomChar(randomRange[0], randomRange[1]);
    }
    return captcha
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  };

  const drawCaptchaOnCanvas = (
    ctx: CanvasRenderingContext2D,
    captcha: string
  ): void => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const initialSpace = 13;
    const letterSpace = (ctx.canvas.width - initialSpace * 2) / captcha.length;

    for (let i = 0; i < captcha.length; i++) {
      const xPosition = initialSpace + i * letterSpace;
      const random = Math.floor(
        Math.random() * (ctx.canvas.height - initialSpace)
      );
      const yPosition = initialSpace + random;

      ctx.font = CaptchaConstants.DEFAULTS.typeFace;

      ctx.fillStyle =
        CaptchaConstants.TEXTCOLORS[
          Math.floor(Math.random() * CaptchaConstants.TEXTCOLORS.length)
        ];

      ctx.fillText(captcha[i], xPosition, yPosition);
    }
  };

  const initializeCaptcha = (ctx: CanvasRenderingContext2D | null): void => {
    if (!ctx) return;
    const newCaptcha = generateCaptchaText();
    setCaptchaText(newCaptcha);
    drawCaptchaOnCanvas(ctx, newCaptcha);
  };

  const reloadCaptcha = (): void => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      initializeCaptcha(ctx);
    }
  };

  return { captchaText, canvasRef, reloadCaptcha };
};

export default useCaptchaGenerator;
