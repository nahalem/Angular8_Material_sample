REM Please change moduleName and run the script in the main WebApp localization.
REM Example: moduleName=Factory

REM Script should build all the neccessary files structure to begin work with it.

SET serviceRoot=\services\
SET serviceName=recipe

REM Service
call ng generate s %serviceRoot%\%serviceName% --spec false
