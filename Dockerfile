# Използвай официалния Node.js образ (като виртуална среда с всичко готово)
FROM node:18

# Създава папка `/app` в контейнера и я прави работна директория
WORKDIR /app

# Копира package.json и package-lock.json, за да се инсталират само нужните зависимости
COPY package*.json ./

# Инсталира npm зависимостите (ако ползваш Yarn, смени го на `yarn install`)
RUN npm install

# Копира всички останали файлове в контейнера
COPY . .

# Build на React приложението (ако е с create-react-app)
RUN npm run build

# Отваря порт 3000 за приложението
EXPOSE 3000

# Стартира приложението
CMD ["npm", "start"]
