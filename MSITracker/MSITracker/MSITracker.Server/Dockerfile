# Consulte https://aka.ms/customizecontainer para aprender a personalizar su contenedor de depuración y cómo Visual Studio usa este Dockerfile para compilar sus imágenes para una depuración más rápida.

# Dependiendo del sistema operativo de las máquinas host que vayan a compilar o ejecutar los contenedores, puede que sea necesario cambiar la imagen especificada en la instrucción FROM.
# Para más información, consulte https://aka.ms/containercompat

# Esta fase se usa cuando se ejecuta desde VS en modo rápido (valor predeterminado para la configuración de depuración)
FROM mcr.microsoft.com/dotnet/aspnet:8.0-nanoserver-1809 AS base
WORKDIR /app
EXPOSE 8080


# Esta fase se usa para compilar el proyecto de servicio
FROM mcr.microsoft.com/dotnet/sdk:8.0-nanoserver-1809 AS with-node
WORKDIR /src
RUN curl https://nodejs.org/dist/v18.18.0/node-v18.18.0-win-x64.zip --output node.zip
RUN tar -xf node.zip
USER ContainerAdministrator
RUN setx /M path "%path%;C:\src\node-v18.18.0-win-x64"
USER ContainerUser
RUN npm install -g @angular/cli

FROM with-node AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["MSITracker/MSITracker.Server/MSITracker.Server.csproj", "MSITracker/MSITracker.Server/"]
COPY ["msitracker.client/msitracker.client.esproj", "msitracker.client/"]
RUN dotnet restore "./MSITracker/MSITracker.Server/MSITracker.Server.csproj"
COPY . .
WORKDIR "/src/MSITracker/MSITracker.Server"
RUN dotnet build "./MSITracker.Server.csproj" -c %BUILD_CONFIGURATION% -o /app/build

# Esta fase se usa para publicar el proyecto de servicio que se copiará en la fase final.
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./MSITracker.Server.csproj" -c %BUILD_CONFIGURATION% -o /app/publish /p:UseAppHost=false

# Esta fase se usa en producción o cuando se ejecuta desde VS en modo normal (valor predeterminado cuando no se usa la configuración de depuración)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MSITracker.Server.dll"]
