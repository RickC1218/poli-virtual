This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


# Backend configuration

## First steps
- Check if you have python version 3.10.6 installed, if not, install https://www.python.org/downloads/release/python-3106/.
- Install poetry.
```bash
pip install poetry
```
- Next, you need to enter the poetry virtual environment with the command:
```bash
poetry shell
```
- To deactivate the virtual environment you can use the command:
```bash
exit
```
- Install the requirements for the backend project.
```bash
poetry install
```

## MongoDB configuration
- Install MongoDB Community Server https://www.mongodb.com/try/download/community.
- Install MongoDB Compass https://www.mongodb.com/products/tools/compass.
- Create a database in Compass and add a collection.


<img width="513" alt="image1" src="assets\image-1.png">

## Project operation
- You need to execute the following commands:
```bash
# This command is used to create new migrations based on changes detected in your models (Users).
python manage.py makemigrations

# This command is used to apply pending migrations and update the database according to the changes defined in the migration files.
python manage.py migrate
```

## Run the server
- You must be located in the path where the manage.py is located and run this command.
```bash
python manage.py runserver
```