@echo off
if not exist gradle\wrapper\gradle-wrapper.jar (
  echo Downloading Gradle wrapper jar...
  powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (New-Object System.Net.WebClient).DownloadFile('https://github.com/gradle/gradle/raw/v8.5.0/gradle/wrapper/gradle-wrapper.jar', 'gradle\wrapper\gradle-wrapper.jar')"
)
java -jar gradle\wrapper\gradle-wrapper.jar %*
