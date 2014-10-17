@echo off
echo *************°²×°ÒÀÀµ*************
call npm install
if exist "npm-debug.log" for /f %%a in ('type npm-debug.log ^| find /c /i "err"') do set err=%%a
if "%err%" GTR "0" goto quit
echo ************* Ñ¹Ëõjs *************
call grunt
:quit
pause