@echo off
setlocal enabledelayedexpansion
set count=0
for /f %%i in ('dir /b *.jpg') do (
    set /a count+=1
    echo 改名：100000 %%i !count!
    rename 100000 %%i !count!.jpg
)