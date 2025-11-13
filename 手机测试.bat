@echo off
chcp 65001 >nul
echo ========================================
echo    📱 手机端测试工具
echo ========================================
echo.
echo 正在获取本机IP地址...
echo.

for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do (
    set ip=%%a
    set ip=!ip:~1!
    echo 本机IP地址：!ip!
    echo.
    echo 📱 手机访问地址：
    echo    http://!ip!:8000
    echo.
    echo 请确保：
    echo 1. 手机和电脑连接同一个WiFi
    echo 2. 在手机浏览器输入上面的地址
    echo.
    goto :start
)

:start
echo 正在启动服务器...
echo 按 Ctrl+C 停止服务器
echo.
python -m http.server 8000
pause
