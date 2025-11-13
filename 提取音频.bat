@echo off
chcp 65001 >nul
echo ========================================
echo    🎵 视频音频提取工具
echo ========================================
echo.
echo 正在提取音频...
echo.
echo 请确保已安装 FFmpeg
echo 如果没有安装，请访问：https://ffmpeg.org/download.html
echo.
pause
echo.
ffmpeg -i "01e887579d82afe0010370019855730738_130.mp4" -vn -acodec libmp3lame -q:a 2 bgm.mp3
echo.
echo 提取完成！生成文件：bgm.mp3
echo.
pause
