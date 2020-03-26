REM Please change moduleName and run the script in the main WebApp localization.
REM Example: moduleName=Factory

REM Script should build all the neccessary files structure to begin work with it.

SET moduleName=tournament
SET mainApplicationFolderName=""
SET mypath=%~dp0
SET currentPath=%mypath:~0,-1%
REM SET mainModulePath=\src\app\modules\%mainApplicationFolderName%\modules\
SET mainModulePath=\src\app\modules\

cd %currentPath%
echo %currentPath%

SET currentModulePath=%currentPath%%mainModulePath%%moduleName%

REM Resolver
call ng generate cl modules/%moduleName%/%moduleName%.resolver

REM Module/routing
call ng generate m modules/%moduleName% --routing

REM Main component
call ng generate c modules/%moduleName% --module

REM aby stworzyć serwis musimy wejśc do folderu
cd %currentModulePath%

REM Service
call ng generate s services/%moduleName% --module %moduleName%.module

cd %currentPath%

REM Components
call ng generate c modules/%moduleName%/components/%moduleName%-list --module
call ng generate c modules/%moduleName%/components/%moduleName%-form --module

REM Model
call ng generate cl modules/%moduleName%/models/%moduleName%






REM Resolver
REM call ng generate cl %mainApplicationFolderName%/modules/%moduleName%/%moduleName%.resolver

REM Module/routing
REM call ng generate m %mainApplicationFolderName%/modules/%moduleName% --routing

REM Main component
REM call ng generate c %mainApplicationFolderName%/modules/%moduleName% --module

REM aby stworzyć serwis musimy wejśc do folderu
REM cd %currentModulePath%

REM Service
REM call ng generate s services/%moduleName% --module %moduleName%.module

REM cd %currentPath%

REM Components
REM call ng generate c %mainApplicationFolderName%/modules/%moduleName%/components/%moduleName%-list --module
REM call ng generate c %mainApplicationFolderName%/modules/%moduleName%/components/%moduleName%-form --module

REM Model
REM call ng generate cl %mainApplicationFolderName%/modules/%moduleName%/models/%moduleName%
REM pause
