@echo off
openapi --input http://localhost:8080/v2/api-docs --output ./generated --client axios
pause
