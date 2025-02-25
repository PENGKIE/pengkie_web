FROM public.ecr.aws/lambda/nodejs:22

COPY app.mjs package*.json ./
COPY functions/ ./functions/
COPY values/ ./values/
COPY utils/ ./utils/
COPY my_env/ ./my_env/

RUN npm install
# If you are building your code for production, instead include a package-lock.json file on this directory and use:
# RUN npm ci --production

# Command can be overwritten by providing a different command in the template directly.
CMD ["app.lambdaHandler"]
