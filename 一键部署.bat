@echo off
chcp 65001 >nul
echo ========================================
echo    🐾 宠物匹配屋 - 快速部署工具
echo ========================================
echo.
echo 请选择部署方式：
echo.
echo [1] 使用 Python 本地服务器（临时分享）
echo [2] 打开 GitHub Pages 教程
echo [3] 打开 Vercel 官网
echo [4] 打开 Netlify 官网
echo [5] 退出
echo.
set /p choice=请输入选项 (1-5): 

if "%choice%"=="1" goto local
if "%choice%"=="2" goto github
if "%choice%"=="3" goto vercel
if "%choice%"=="4" goto netlify
if "%choice%"=="5" goto end

:local
echo.
echo 正在启动本地服务器...
echo 访问地址：http://localhost:8000
echo 按 Ctrl+C 停止服务器
echo.
python -m http.server 8000
goto end

:github
start https://pages.github.com/
echo 已打开 GitHub Pages 官网
goto end

:vercel
start https://vercel.com
echo 已打开 Vercel 官网
goto end

:netlify
start https://www.netlify.com
echo 已打开 Netlify 官网
goto end

:end
pause
