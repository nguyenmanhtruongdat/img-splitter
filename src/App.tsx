import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Slider,
  IconButton,
  Stack,
  Fade,
  Menu,
  MenuItem,
  Switch,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GitHubIcon from "@mui/icons-material/GitHub";
import Cropper from "react-easy-crop";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AddIcon from "@mui/icons-material/Add";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import SettingsIcon from "@mui/icons-material/Settings";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SaveIcon from "@mui/icons-material/Save";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const TOOLS = [
  { label: "Split Image", value: "split" },
  { label: "Circle Crop Image", value: "circle" },
  { label: "Black & White Image", value: "bw" },
  { label: "Pencil Sketch", value: "sketch" },
  { label: "Conversion Tools", value: "conversion" },
];

// Translation object
const translations = {
  en: {
    whatWeDo: "What we do",
    flipImageTitle: "Flip image",
    flipImageDesc:
      "Flip Image is an online tool to quickly flip images horizontally or vertically and download the result.",
    supportedFormatsTitle: "Supported formats",
    supportedFormatsDesc:
      "Flip Tool supports many image formats and lets you upload images easily by drag-and-drop or file selection..",
    accuracyTitle: "Accuracy",
    accuracyDesc:
      "The tool ensures accurate flipping with original image size precisely preserved and delivered every time.",
    freeTitle: "Free to use",
    freeDesc:
      "Flip Tool is completely free with no hidden costs, limitations, or demo versions — use it as many times as you want.",
    noLimitTitle: "No Limitation",
    noLimitDesc:
      "Unlike other tools, Flip Tool lets you flip unlimited images with no restrictions, while maintaining the same high level of accuracy.",
    downloadTitle: "Download",
    downloadDesc:
      "Downloading is simple and fast — flip your image, preview the result, and then just click the download button beneath the image to save it.",
    contactMe: "Contact me",
    home: "HOME",
    language: "LANGUAGE",
    english: "English",
    vietnamese: "Vietnamese",
    freeOnlineTool: "Free online tool",
    dragDrop: "Drag and drop an image here, or click to select",
    pencilShadow: "Pencil Shadow",
    crop: "Crop",
    download: "Download",
    splitImage: "Split Image",
    circleCrop: "Circle Crop Image",
    bw: "Black & White Image",
    sketch: "Pencil Sketch",
    conversion: "Conversion Tools",
    convertTo: "Convert to",
    jpegToPng: "JPEG to PNG",
    pngToJpeg: "PNG to JPEG",
    bmpToPng: "BMP to PNG",
    webpToJpeg: "WebP to JPEG",
    webpToPng: "WebP to PNG",
    gifToPng: "GIF to PNG",
    icoToPng: "ICO to PNG",
  },
  vi: {
    whatWeDo: "Chúng tôi làm gì",
    flipImageTitle: "Lật ảnh",
    flipImageDesc:
      "Công cụ lật ảnh trực tuyến giúp bạn lật ảnh ngang hoặc dọc và tải về kết quả dễ dàng.",
    supportedFormatsTitle: "Định dạng hỗ trợ",
    supportedFormatsDesc:
      "Công cụ hỗ trợ nhiều định dạng ảnh và cho phép bạn tải ảnh lên dễ dàng bằng kéo thả hoặc chọn tệp.",
    accuracyTitle: "Độ chính xác",
    accuracyDesc:
      "Công cụ đảm bảo lật ảnh chính xác, giữ nguyên kích thước gốc của ảnh.",
    freeTitle: "Miễn phí",
    freeDesc:
      "Công cụ hoàn toàn miễn phí, không giới hạn, không bản demo — sử dụng không giới hạn.",
    noLimitTitle: "Không giới hạn",
    noLimitDesc:
      "Không như các công cụ khác, bạn có thể lật ảnh không giới hạn với độ chính xác cao.",
    downloadTitle: "Tải về",
    downloadDesc:
      "Tải về dễ dàng — chỉ cần lật, xem trước và nhấn nút tải về bên dưới ảnh.",
    contactMe: "Liên hệ",
    home: "TRANG CHỦ",
    language: "NGÔN NGỮ",
    english: "Tiếng Anh",
    vietnamese: "Tiếng Việt",
    freeOnlineTool: "Công cụ trực tuyến miễn phí",
    dragDrop: "Kéo và thả ảnh vào đây, hoặc nhấn để chọn",
    pencilShadow: "Bóng bút chì",
    crop: "Cắt",
    download: "Tải về",
    splitImage: "Chia ảnh",
    circleCrop: "Cắt ảnh tròn",
    bw: "Ảnh đen trắng",
    sketch: "Phác thảo bút chì",
    conversion: "Công cụ chuyển đổi",
    convertTo: "Chuyển đổi sang",
    jpegToPng: "JPEG sang PNG",
    pngToJpeg: "PNG sang JPEG",
    bmpToPng: "BMP sang PNG",
    webpToJpeg: "WebP sang JPEG",
    webpToPng: "WebP sang PNG",
    gifToPng: "GIF sang PNG",
    icoToPng: "ICO sang PNG",
  },
};

// Map tool values to translation keys
const toolLabelKey: Record<string, keyof (typeof translations)["en"]> = {
  split: "splitImage",
  circle: "circleCrop",
  bw: "bw",
  sketch: "sketch",
  conversion: "conversion",
};

function SplashScreen() {
  return (
    <div
      style={{
        position: "fixed",
        zIndex: 2000,
        inset: 0,
        background: "linear-gradient(135deg, #f8cfd5 0%, #39364f 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 0.7s",
        animation: "fadeInOut 1s",
      }}
    >
      <img
        src="/scissors.svg"
        alt="logo"
        style={{
          width: 80,
          height: 80,
          marginBottom: 24,
          filter: "drop-shadow(0 4px 16px #fff8)",
          animation: "spin 1.5s linear infinite",
        }}
      />
      <h1
        style={{
          color: "#fff",
          fontWeight: 800,
          fontSize: 36,
          letterSpacing: 2,
          textShadow: "0 2px 16px #39364f88",
          margin: 0,
        }}
      >
        IMAGE EDITOR
      </h1>
      <style>
        {`
          @keyframes fadeInOut {
            0% { opacity: 0; }
            15% { opacity: 1; }
            85% { opacity: 1; }
            100% { opacity: 0; }
          }
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}
      </style>
    </div>
  );
}

function App() {
  const [tool, setTool] = useState("split");
  const [image, setImage] = useState<string | null>(null);
  const [splitImages, setSplitImages] = useState<{
    left: string;
    right: string;
  } | null>(null);
  const [splitPosition, setSplitPosition] = useState<number>(50);
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [conversionType, setConversionType] = useState<string>("jpegToPng");
  const [currentFileType, setCurrentFileType] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [circleCrop, setCircleCrop] = useState({
    crop: { x: 0, y: 0 },
    zoom: 1,
    croppedAreaPixels: null as any,
  });
  const [pencilShadow, setPencilShadow] = useState(1);
  const [language, setLanguage] = useState<"en" | "vi">("en");
  const [langAnchorEl, setLangAnchorEl] = useState<null | HTMLElement>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  // --- Debounce for Split Image ---
  const splitDebounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (imageRef.current) {
      const img = imageRef.current;
      setImageDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    }
  }, [image]);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1000); // 1s
    return () => clearTimeout(timer);
  }, []);

  // --- Split Image ---
  const splitImage = () => {
    if (!image || !imageDimensions) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const splitPoint = Math.floor(
        (imageDimensions.width * splitPosition) / 100
      );
      // Left
      canvas.width = splitPoint;
      canvas.height = img.height;
      ctx.drawImage(
        img,
        0,
        0,
        splitPoint,
        img.height,
        0,
        0,
        splitPoint,
        img.height
      );
      const leftImage = canvas.toDataURL();
      // Right
      canvas.width = img.width - splitPoint;
      canvas.height = img.height;
      ctx.drawImage(
        img,
        splitPoint,
        0,
        img.width - splitPoint,
        img.height,
        0,
        0,
        img.width - splitPoint,
        img.height
      );
      const rightImage = canvas.toDataURL();
      setSplitImages({ left: leftImage, right: rightImage });
    };
    img.src = image;
  };

  // --- Circle Crop ---
  const onCircleCropComplete = (_croppedArea: any, croppedAreaPixels: any) => {
    setCircleCrop((prev: any) => ({ ...prev, croppedAreaPixels }));
  };

  const exportCircleCroppedImage = async () => {
    if (!image || !circleCrop.croppedAreaPixels) return;
    const img = new window.Image();
    img.src = image;
    await new Promise((resolve) => {
      img.onload = resolve;
    });
    const { width, height, x, y } = circleCrop.croppedAreaPixels;
    const size = Math.min(width, height);
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.save();
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, x, y, size, size, 0, 0, size, size);
    ctx.restore();
    setProcessedImage(canvas.toDataURL());
  };

  // --- Black & White ---
  const blackWhite = () => {
    if (!image || !imageDimensions) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const avg =
          (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) /
          3;
        imageData.data[i] = avg;
        imageData.data[i + 1] = avg;
        imageData.data[i + 2] = avg;
      }
      ctx.putImageData(imageData, 0, 0);
      setProcessedImage(canvas.toDataURL());
    };
    img.src = image;
  };

  // --- Pencil Sketch ---
  const pencilSketch = () => {
    if (!image || !imageDimensions) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      // Convert to grayscale
      for (let i = 0; i < imageData.data.length; i += 4) {
        const avg =
          (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) /
          3;
        imageData.data[i] = avg;
        imageData.data[i + 1] = avg;
        imageData.data[i + 2] = avg;
      }
      // Sobel edge detection
      const width = canvas.width;
      const height = canvas.height;
      const gray = new Uint8ClampedArray(width * height);
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = (y * width + x) * 4;
          gray[y * width + x] = imageData.data[idx];
        }
      }
      const out = new Uint8ClampedArray(width * height);
      const gx = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
      const gy = [-1, -2, -1, 0, 0, 0, 1, 2, 1];
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          let sumX = 0,
            sumY = 0;
          for (let ky = -1; ky <= 1; ky++) {
            for (let kx = -1; kx <= 1; kx++) {
              const val = gray[(y + ky) * width + (x + kx)];
              sumX += val * gx[(ky + 1) * 3 + (kx + 1)];
              sumY += val * gy[(ky + 1) * 3 + (kx + 1)];
            }
          }
          let mag = Math.sqrt(sumX * sumX + sumY * sumY) * pencilShadow;
          mag = Math.max(0, Math.min(255, mag));
          out[y * width + x] = 255 - mag; // invert for sketch look
        }
      }
      // Write back to imageData
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = (y * width + x) * 4;
          imageData.data[idx] = out[y * width + x];
          imageData.data[idx + 1] = out[y * width + x];
          imageData.data[idx + 2] = out[y * width + x];
        }
      }
      ctx.putImageData(imageData, 0, 0);
      setProcessedImage(canvas.toDataURL());
    };
    img.src = image;
  };

  // Get available conversion options based on file type
  const getAvailableConversions = (fileType: string) => {
    const conversions = {
      "image/jpeg": [
        { type: "jpegToPng", label: "PNG" },
        { type: "jpegToWebp", label: "WebP" },
      ],
      "image/png": [
        { type: "pngToJpeg", label: "JPEG" },
        { type: "pngToWebp", label: "WebP" },
      ],
      "image/bmp": [
        { type: "bmpToPng", label: "PNG" },
        { type: "bmpToJpeg", label: "JPEG" },
        { type: "bmpToWebp", label: "WebP" },
      ],
      "image/webp": [
        { type: "webpToPng", label: "PNG" },
        { type: "webpToJpeg", label: "JPEG" },
      ],
      "image/gif": [
        { type: "gifToPng", label: "PNG" },
        { type: "gifToJpeg", label: "JPEG" },
        { type: "gifToWebp", label: "WebP" },
      ],
      "image/x-icon": [
        { type: "icoToPng", label: "PNG" },
        { type: "icoToJpeg", label: "JPEG" },
        { type: "icoToWebp", label: "WebP" },
      ],
    };
    return conversions[fileType as keyof typeof conversions] || [];
  };

  // Update conversion function
  const convertImage = async (type: string) => {
    if (!image) return;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);

      let mimeType = "image/png";
      let quality = 1.0;

      switch (type) {
        case "jpegToPng":
        case "bmpToPng":
        case "webpToPng":
        case "gifToPng":
        case "icoToPng":
          mimeType = "image/png";
          break;
        case "pngToJpeg":
        case "bmpToJpeg":
        case "webpToJpeg":
        case "gifToJpeg":
        case "icoToJpeg":
          mimeType = "image/jpeg";
          quality = 0.9;
          break;
        case "jpegToWebp":
        case "pngToWebp":
        case "bmpToWebp":
        case "gifToWebp":
        case "icoToWebp":
          mimeType = "image/webp";
          quality = 0.9;
          break;
      }

      const convertedImage = canvas.toDataURL(mimeType, quality);
      setProcessedImage(convertedImage);
    };
    img.src = image;
  };

  // Update file input handler
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setImage(null);
      setSplitImages(null);
      setProcessedImage(null);
      setCurrentFileType(null);
      return;
    }

    setCurrentFileType(file.type);
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImage(ev.target?.result as string);
      setSplitImages(null);
      setProcessedImage(null);
      setSplitPosition(50);

      // Set default conversion type based on file type
      const availableConversions = getAvailableConversions(file.type);
      if (availableConversions.length > 0) {
        setConversionType(availableConversions[0].type);
      }
    };
    reader.readAsDataURL(file);
  };

  // --- Download ---
  const downloadImage = (imageData: string, filename: string) => {
    const link = document.createElement("a");
    link.href = imageData;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- UI Handlers ---
  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    setSplitPosition(newValue as number);
    if (splitDebounceRef.current) clearTimeout(splitDebounceRef.current);
    splitDebounceRef.current = setTimeout(() => {
      if (image) splitImage();
    }, 20); // 20ms debounce for smoothness
  };
  const handleImageContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // --- Tool Action ---
  useEffect(() => {
    if (!image) return;
    if (tool === "split") splitImage();
    if (tool === "circle") exportCircleCroppedImage();
    if (tool === "bw") blackWhite();
    if (tool === "sketch") pencilSketch();
    if (tool === "conversion") convertImage(conversionType);
    // eslint-disable-next-line
  }, [tool, image, pencilShadow, conversionType]);

  // --- Tool Change Handler ---
  const handleToolChange = (_e: React.SyntheticEvent, newTool: string) => {
    setTool(newTool);
    setImage(null);
    setSplitImages(null);
    setProcessedImage(null);
    setCircleCrop({ crop: { x: 0, y: 0 }, zoom: 1, croppedAreaPixels: null });
    setSplitPosition(50);
  };

  // --- Language Handler ---
  const handleLangMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setLangAnchorEl(event.currentTarget);
  };
  const handleLangMenuClose = () => {
    setLangAnchorEl(null);
  };
  const handleLangChange = (lang: "en" | "vi") => {
    setLanguage(lang);
    setLangAnchorEl(null);
  };

  // --- Theme setup
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      ...(darkMode && {
        background: {
          default: "#181818",
          paper: "#232323",
        },
      }),
    },
  });

  // --- Render Tool UI ---
  let toolContent: React.ReactNode = null;
  if (!image) {
    toolContent = (
      <Typography align="center" sx={{ mt: 6, color: "text.secondary" }}>
        {translations[language].dragDrop}
      </Typography>
    );
  } else if (tool === "conversion") {
    toolContent = (
      <Box textAlign="center">
        <Box sx={{ mb: 3 }}>
          {currentFileType && (
            <>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {translations[language].convertTo}
              </Typography>
              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                flexWrap="wrap"
              >
                {getAvailableConversions(currentFileType).map((conversion) => (
                  <Button
                    key={conversion.type}
                    variant={
                      conversionType === conversion.type
                        ? "contained"
                        : "outlined"
                    }
                    onClick={() => setConversionType(conversion.type)}
                  >
                    {conversion.label}
                  </Button>
                ))}
              </Stack>
            </>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            ref={imageRef}
            src={processedImage || image}
            alt="Converted"
            style={{
              maxWidth: "100%",
              maxHeight: "400px",
              display: "block",
              margin: "0 auto",
            }}
          />
          {processedImage && (
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => {
                const extension = conversionType.includes("Png")
                  ? "png"
                  : conversionType.includes("Jpeg")
                  ? "jpg"
                  : "webp";
                downloadImage(processedImage, `converted.${extension}`);
              }}
            >
              {translations[language].download}
            </Button>
          )}
        </Box>
      </Box>
    );
  } else if (tool === "split") {
    toolContent = (
      <Box onClick={handleImageContainerClick}>
        <Box sx={{ position: "relative", display: "inline-block" }}>
          <img
            ref={imageRef}
            src={image}
            alt="Original"
            style={{ maxWidth: "100%", maxHeight: "400px" }}
          />
          {imageDimensions && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: `${splitPosition}%`,
                height: "100%",
                width: "2px",
                backgroundColor: "red",
                transform: "translateX(-50%)",
                cursor: "ew-resize",
              }}
            />
          )}
        </Box>
        <Box
          sx={{ width: "100%", maxWidth: 400, mx: "auto", mt: 2 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Slider
            value={splitPosition}
            onChange={handleSliderChange}
            aria-labelledby="split-position-slider"
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}%`}
            onClick={(e) => e.stopPropagation()}
          />
        </Box>
        {splitImages && (
          <Box
            sx={{
              display: "flex",
              gap: 4,
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Box textAlign="center">
              <img
                src={splitImages.left}
                alt="Left half"
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  display: "block",
                  margin: "0 auto",
                }}
              />
              <Button
                variant="contained"
                onClick={() => downloadImage(splitImages.left, "left-half.png")}
                sx={{ mt: 1, display: "block", mx: "auto" }}
              >
                Download
              </Button>
            </Box>
            <Box textAlign="center">
              <img
                src={splitImages.right}
                alt="Right half"
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  display: "block",
                  margin: "0 auto",
                }}
              />
              <Button
                variant="contained"
                onClick={() =>
                  downloadImage(splitImages.right, "right-half.png")
                }
                sx={{ mt: 1, display: "block", mx: "auto" }}
              >
                Download
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    );
  } else if (tool === "circle") {
    toolContent = (
      <Box textAlign="center">
        <Box
          sx={{ height: 400, position: "relative", background: "#222", mb: 3 }}
        >
          {image && (
            <>
              <Box
                sx={{ position: "absolute", width: "100%", height: "100%" }}
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <Cropper
                  image={image}
                  crop={circleCrop.crop}
                  zoom={circleCrop.zoom}
                  aspect={1}
                  cropShape="round"
                  showGrid={true}
                  onCropChange={(crop) =>
                    setCircleCrop((prev: any) => ({ ...prev, crop }))
                  }
                  onZoomChange={(zoom) =>
                    setCircleCrop((prev: any) => ({ ...prev, zoom }))
                  }
                  onCropComplete={onCircleCropComplete}
                />
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  bottom: 16,
                  left: 0,
                  right: 0,
                  display: "flex",
                  justifyContent: "center",
                  zIndex: 10,
                }}
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <Slider
                  min={1}
                  max={3}
                  step={0.01}
                  value={circleCrop.zoom}
                  onChange={(_e, v) =>
                    setCircleCrop((prev: any) => ({
                      ...prev,
                      zoom: v as number,
                    }))
                  }
                  sx={{ width: 200, color: "white" }}
                />
              </Box>
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  position: "absolute",
                  bottom: 16,
                  right: 16,
                  zIndex: 10,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  exportCircleCroppedImage();
                }}
              >
                {translations[language].crop}
              </Button>
            </>
          )}
        </Box>
        {processedImage && (
          <Box
            sx={{
              mt: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={processedImage}
              alt="Circle Cropped"
              style={{
                maxWidth: 300,
                maxHeight: 300,
                borderRadius: "50%",
                display: "block",
                margin: "0 auto",
              }}
            />
            <Button
              variant="contained"
              sx={{ mt: 2, display: "block", mx: "auto" }}
              onClick={() => downloadImage(processedImage, "circle-crop.png")}
            >
              {translations[language].download}
            </Button>
          </Box>
        )}
      </Box>
    );
  } else if (["bw", "sketch"].includes(tool)) {
    toolContent = (
      <Box
        textAlign="center"
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <img
          ref={imageRef}
          src={processedImage || image}
          alt="Processed"
          style={{
            maxWidth: "100%",
            maxHeight: "400px",
            borderRadius: tool === "circle" ? "50%" : 4,
            display: "block",
            margin: "0 auto",
          }}
        />
        {tool === "sketch" && (
          <Box
            sx={{ width: 300, mt: 2 }}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <span style={{ color: "#555", fontWeight: 500 }}>
              {translations[language].pencilShadow}
            </span>
            <Slider
              min={0.2}
              max={2}
              step={0.01}
              value={pencilShadow}
              onChange={(_e, v) => setPencilShadow(v as number)}
              valueLabelDisplay="auto"
              sx={{ ml: 2, mr: 2 }}
            />
          </Box>
        )}
        <Button
          variant="contained"
          sx={{ mt: 2, display: "block", mx: "auto" }}
          onClick={() => downloadImage(processedImage || image!, `${tool}.png`)}
        >
          {translations[language].download}
        </Button>
      </Box>
    );
  }

  return (
    <>
      {showSplash && <SplashScreen />}
      <ThemeProvider theme={theme}>
        <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
          <AppBar
            position="static"
            elevation={0}
            sx={{ bgcolor: "#39364f", borderBottom: 0 }}
          >
            <Toolbar sx={{ justifyContent: "space-between", minHeight: 56 }}>
              <Box display="flex" alignItems="center">
                <Box
                  component="img"
                  src="/scissors.svg"
                  alt="logo"
                  sx={{ height: 36, mr: 1 }}
                />
                <Typography
                  variant="h5"
                  sx={{ color: "white", fontWeight: 700, letterSpacing: 2 }}
                >
                  IMAGE EDITOR
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                <Button
                  endIcon={<ArrowDropDownIcon />}
                  sx={{
                    color: "white",
                    fontWeight: 500,
                    textTransform: "none",
                    fontSize: 16,
                  }}
                  onClick={handleLangMenuOpen}
                >
                  {translations[language].language} -{" "}
                  {language === "en"
                    ? translations[language].english
                    : translations[language].vietnamese}
                </Button>
                <Menu
                  anchorEl={langAnchorEl}
                  open={Boolean(langAnchorEl)}
                  onClose={handleLangMenuClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <MenuItem
                    selected={language === "en"}
                    onClick={() => handleLangChange("en")}
                  >
                    {translations[language].english}
                  </MenuItem>
                  <MenuItem
                    selected={language === "vi"}
                    onClick={() => handleLangChange("vi")}
                  >
                    {translations[language].vietnamese}
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </AppBar>
          <Container maxWidth="md" sx={{ py: 6 }}>
            <Tabs
              value={tool}
              onChange={handleToolChange}
              centered
              sx={{ mb: 4 }}
            >
              <Tab label={translations[language].splitImage} value="split" />
              <Tab label={translations[language].circleCrop} value="circle" />
              <Tab label={translations[language].bw} value="bw" />
              <Tab label={translations[language].sketch} value="sketch" />
              <Tab
                label={translations[language].conversion}
                value="conversion"
              />
            </Tabs>
            <Box
              sx={{
                p: 4,
                textAlign: "center",
                mb: 4,
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <input
                type="file"
                accept="image/jpeg,image/png,image/bmp,image/webp,image/gif,image/x-icon"
                style={{ marginBottom: 16 }}
                onChange={handleFileChange}
              />
              <Fade in={true} key={tool} timeout={400}>
                <div>{toolContent}</div>
              </Fade>
            </Box>
            <Typography
              variant="h4"
              align="center"
              sx={{ fontWeight: 700, mt: 4, mb: 1 }}
            >
              {translations[language][toolLabelKey[tool]]}
            </Typography>
            <Typography align="center" sx={{ color: "text.secondary", mb: 4 }}>
              {translations[language].freeOnlineTool}
            </Typography>
            {/* What we do section */}
            <Box sx={{ mt: 8, mb: 6 }}>
              <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                <Box
                  sx={{
                    height: 4,
                    width: "100%",
                    bgcolor: "#f8cfd5",
                    borderRadius: 2,
                  }}
                />
              </Box>
              <Typography
                align="center"
                sx={{
                  fontWeight: 700,
                  fontSize: 24,
                  color: "#39364f",
                  mb: 4,
                  position: "relative",
                }}
              >
                <span
                  style={{
                    padding: "0 16px",
                    position: "relative",
                    fontSize: 30,
                    zIndex: 1,
                  }}
                >
                  {translations[language].whatWeDo}
                </span>
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 3,
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    width: {
                      xs: "100%",
                      sm: "calc(50% - 12px)",
                      md: "calc(33.33% - 16px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "#fff",
                      border: "1px solid #f0e9f5",
                      borderRadius: 2,
                      p: 3,
                      textAlign: "center",
                      boxShadow: 0,
                      transition: "background 0.2s, color 0.2s",
                      "&:hover": {
                        bgcolor: "#39364f",
                        color: "#fff",
                        "& .MuiSvgIcon-root": { color: "#fff" },
                        "& .feature-title": { color: "#f8cfd5" },
                        "& .feature-desc": { color: "#fff" },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: "#f8cfd5",
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        mx: "auto",
                        mb: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <AddIcon sx={{ color: "#39364f", fontSize: 36 }} />
                    </Box>
                    <Typography
                      className="feature-title"
                      variant="h6"
                      sx={{ fontWeight: 700, color: "#39364f", mb: 1 }}
                    >
                      {translations[language].flipImageTitle}
                    </Typography>
                    <Typography
                      className="feature-desc"
                      sx={{ color: "#5a5a7a" }}
                    >
                      {translations[language].flipImageDesc}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: {
                      xs: "100%",
                      sm: "calc(50% - 12px)",
                      md: "calc(33.33% - 16px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "#fff",
                      border: "1px solid #f0e9f5",
                      borderRadius: 2,
                      p: 3,
                      textAlign: "center",
                      boxShadow: 0,
                      transition: "background 0.2s, color 0.2s",
                      "&:hover": {
                        bgcolor: "#39364f",
                        color: "#fff",
                        "& .MuiSvgIcon-root": { color: "#fff" },
                        "& .feature-title": { color: "#f8cfd5" },
                        "& .feature-desc": { color: "#fff" },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: "#f8cfd5",
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        mx: "auto",
                        mb: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <InsertDriveFileIcon
                        sx={{ color: "#39364f", fontSize: 36 }}
                      />
                    </Box>
                    <Typography
                      className="feature-title"
                      variant="h6"
                      sx={{ fontWeight: 700, color: "#39364f", mb: 1 }}
                    >
                      {translations[language].supportedFormatsTitle}
                    </Typography>
                    <Typography
                      className="feature-desc"
                      sx={{ color: "#5a5a7a" }}
                    >
                      {translations[language].supportedFormatsDesc}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: {
                      xs: "100%",
                      sm: "calc(50% - 12px)",
                      md: "calc(33.33% - 16px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "#fff",
                      border: "1px solid #f0e9f5",
                      borderRadius: 2,
                      p: 3,
                      textAlign: "center",
                      boxShadow: 0,
                      transition: "background 0.2s, color 0.2s",
                      "&:hover": {
                        bgcolor: "#39364f",
                        color: "#fff",
                        "& .MuiSvgIcon-root": { color: "#fff" },
                        "& .feature-title": { color: "#f8cfd5" },
                        "& .feature-desc": { color: "#fff" },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: "#f8cfd5",
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        mx: "auto",
                        mb: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <SettingsIcon sx={{ color: "#39364f", fontSize: 36 }} />
                    </Box>
                    <Typography
                      className="feature-title"
                      variant="h6"
                      sx={{ fontWeight: 700, color: "#39364f", mb: 1 }}
                    >
                      {translations[language].accuracyTitle}
                    </Typography>
                    <Typography
                      className="feature-desc"
                      sx={{ color: "#5a5a7a" }}
                    >
                      {translations[language].accuracyDesc}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: {
                      xs: "100%",
                      sm: "calc(50% - 12px)",
                      md: "calc(33.33% - 16px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "#fff",
                      border: "1px solid #f0e9f5",
                      borderRadius: 2,
                      p: 3,
                      textAlign: "center",
                      boxShadow: 0,
                      transition: "background 0.2s, color 0.2s",
                      "&:hover": {
                        bgcolor: "#39364f",
                        color: "#fff",
                        "& .MuiSvgIcon-root": { color: "#fff" },
                        "& .feature-title": { color: "#f8cfd5" },
                        "& .feature-desc": { color: "#fff" },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: "#f8cfd5",
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        mx: "auto",
                        mb: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <EmojiEmotionsIcon
                        sx={{ color: "#39364f", fontSize: 36 }}
                      />
                    </Box>
                    <Typography
                      className="feature-title"
                      variant="h6"
                      sx={{ fontWeight: 700, color: "#39364f", mb: 1 }}
                    >
                      {translations[language].freeTitle}
                    </Typography>
                    <Typography
                      className="feature-desc"
                      sx={{ color: "#5a5a7a" }}
                    >
                      {translations[language].freeDesc}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: {
                      xs: "100%",
                      sm: "calc(50% - 12px)",
                      md: "calc(33.33% - 16px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "#fff",
                      border: "1px solid #f0e9f5",
                      borderRadius: 2,
                      p: 3,
                      textAlign: "center",
                      boxShadow: 0,
                      transition: "background 0.2s, color 0.2s",
                      "&:hover": {
                        bgcolor: "#39364f",
                        color: "#fff",
                        "& .MuiSvgIcon-root": { color: "#fff" },
                        "& .feature-title": { color: "#f8cfd5" },
                        "& .feature-desc": { color: "#fff" },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: "#f8cfd5",
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        mx: "auto",
                        mb: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CheckCircleIcon
                        sx={{ color: "#39364f", fontSize: 36 }}
                      />
                    </Box>
                    <Typography
                      className="feature-title"
                      variant="h6"
                      sx={{ fontWeight: 700, color: "#39364f", mb: 1 }}
                    >
                      {translations[language].noLimitTitle}
                    </Typography>
                    <Typography
                      className="feature-desc"
                      sx={{ color: "#5a5a7a" }}
                    >
                      {translations[language].noLimitDesc}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: {
                      xs: "100%",
                      sm: "calc(50% - 12px)",
                      md: "calc(33.33% - 16px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "#fff",
                      border: "1px solid #f0e9f5",
                      borderRadius: 2,
                      p: 3,
                      textAlign: "center",
                      boxShadow: 0,
                      transition: "background 0.2s, color 0.2s",
                      "&:hover": {
                        bgcolor: "#39364f",
                        color: "#fff",
                        "& .MuiSvgIcon-root": { color: "#fff" },
                        "& .feature-title": { color: "#f8cfd5" },
                        "& .feature-desc": { color: "#fff" },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: "#f8cfd5",
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        mx: "auto",
                        mb: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <SaveIcon sx={{ color: "#39364f", fontSize: 36 }} />
                    </Box>
                    <Typography
                      className="feature-title"
                      variant="h6"
                      sx={{ fontWeight: 700, color: "#39364f", mb: 1 }}
                    >
                      {translations[language].downloadTitle}
                    </Typography>
                    <Typography
                      className="feature-desc"
                      sx={{ color: "#5a5a7a" }}
                    >
                      {translations[language].downloadDesc}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ mt: 8, mb: 6 }}>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
                  <Box
                    sx={{
                      height: 4,
                      width: "100%",
                      bgcolor: "#f8cfd5",
                      borderRadius: 2,
                    }}
                  />
                </Box>
                <Typography
                  align="center"
                  sx={{
                    fontWeight: 700,
                    fontSize: 24,
                    color: "#39364f",
                    mb: 4,
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      padding: "0 16px",
                      position: "relative",
                      fontSize: 30,
                      zIndex: 1,
                    }}
                  >
                    {translations[language].contactMe}
                  </span>
                </Typography>
              </Box>
            </Box>
            <Stack
              direction="row"
              spacing={3}
              justifyContent="center"
              sx={{ mt: 2 }}
            >
              <IconButton
                component="a"
                href="https://www.facebook.com/trdatt27.6/"
                target="_blank"
                rel="noopener"
                aria-label="Facebook"
              >
                <FacebookIcon fontSize="large" sx={{ color: "#5a5a7a" }} />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.instagram.com/trdatt27.6/"
                target="_blank"
                rel="noopener"
                aria-label="Instagram"
              >
                <InstagramIcon fontSize="large" sx={{ color: "#5a5a7a" }} />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.youtube.com/@TruongDatOfficial"
                target="_blank"
                rel="noopener"
                aria-label="YouTube"
              >
                <YouTubeIcon fontSize="large" sx={{ color: "#5a5a7a" }} />
              </IconButton>
              <IconButton
                component="a"
                href="https://github.com/nguyenmanhtruongdat/"
                target="_blank"
                rel="noopener"
                aria-label="GitHub"
              >
                <GitHubIcon fontSize="large" sx={{ color: "#5a5a7a" }} />
              </IconButton>
            </Stack>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
