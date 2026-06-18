# Локальное окружение для разработки и предпросмотра сайта ReBit Studio.
# Версия Node совпадает с бандлом проекта (.tools/node — Node 22).
FROM node:22-alpine

WORKDIR /app

# Сначала ставим зависимости — слой кешируется, пока не изменился lock-файл.
COPY package.json package-lock.json ./
RUN npm ci

# Остальной код монтируется томом в docker-compose, копия нужна для запуска без compose.
COPY . .

# 5173 — vite dev (HMR), 4173 — vite preview (собранный билд).
EXPOSE 5173 4173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
